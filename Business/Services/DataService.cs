using Business.Models.DTOs;
using CommunityToolkit.Maui.Storage;
using DataAccess;
using DataAccess.Repositories;

namespace Business.Services;

public interface IDataService
{
    Task Export(string? path = null);

    Task Import(FileInfo fileInfo);

    Task Import(string filePath);

    Task<List<FileInfo>> DeleteExportFile(FileInfo fileInfo);

    Task<List<FileInfo>> GetExportedFiles();

    Task DeleteAllData();

    Task InitDb();

    Task CleanDb();
}

public sealed class DataService : IDataService
{
    private readonly IDayRepository _dayService;
    private readonly IExerciseRepository _exerciseService;
    private readonly ISetRepository _setService;
    private readonly IWorkoutRepository _workoutService;
    private readonly ILastSelectedService _lastSelectedService;
    private readonly ITagRepository _tagRepository;
    private readonly IFileSaver _fileSaver;
    private readonly GymmyDatabase _dbContext;

    public DataService(IDayRepository dayService, IExerciseRepository exerciseService, ISetRepository setService, IWorkoutRepository workoutService, ILastSelectedService lastSelectedService, ITagRepository tagRepository, GymmyDatabase dbContext, IFileSaver fileSaver)
    {
        _dayService = dayService;
        _exerciseService = exerciseService;
        _setService = setService;
        _workoutService = workoutService;
        _lastSelectedService = lastSelectedService;
        _tagRepository = tagRepository;
        _dbContext = dbContext;
        _fileSaver = fileSaver;
    }

    public Task InitDb() => Task.Run(_dbContext.Init);

    public async Task DeleteAllData()
    {
        await _dayService.Drop();
        await _exerciseService.Drop();
        await _setService.Drop();
        await _workoutService.Drop();
        await _lastSelectedService.Drop();
        await _tagRepository.Drop();
    }

    public async Task<List<FileInfo>> DeleteExportFile(FileInfo fileInfo)
    {
        var metadataFilePath = Path.Combine(Constants.AppDirectory, fileInfo.Name);
        if (File.Exists(metadataFilePath))
        {
            var backupFilePath = await File.ReadAllTextAsync(metadataFilePath);
            if (File.Exists(backupFilePath))
            {
                File.Delete(backupFilePath);
                File.Delete(metadataFilePath);
            }
        }

        return await GetExportedFiles();
    }

    public async Task Export(string? path = null)
    {
        var days = await _dayService.Get();
        var exercises = await _exerciseService.Get();
        var sets = await _setService.Get();
        var workouts = await _workoutService.Get();
        var lastSelected = await _lastSelectedService.Get();
        var tags = await _tagRepository.Get();

        var export = new ExportDto(days, exercises, sets, workouts, lastSelected, tags);

        var json = System.Text.Json.JsonSerializer.Serialize(export);

        var fileName = DateTime.Now.ToString("dd-MM-yyyy_HH:mm:ss");

        using var stream = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(json));

        try
        {
            var fileSaverResult = await _fileSaver.SaveAsync($"Gimmy_Export_{fileName}.gym", stream);
            if (!fileSaverResult.IsSuccessful)
            {
                throw new Exception($"The file was not saved successfully with error: {fileSaverResult.Exception.Message}");
            }
            //if (string.IsNullOrWhiteSpace(path)) path = Constants.AppDirectory;

            if (!Directory.Exists(Constants.AppDirectory)) Directory.CreateDirectory(Constants.AppDirectory);

            var filePath = Path.Combine(Constants.AppDirectory, $"Gimmy_Export_{fileName}.gym");
            if (File.Exists(filePath)) File.Delete(filePath);

            await using (var fw = new StreamWriter(filePath))
            {
                await fw.WriteAsync(fileSaverResult.FilePath);
                await fw.DisposeAsync();
            }
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public Task<List<FileInfo>> GetExportedFiles()
    {
        return Task.Run(() =>
        {
            if (!Directory.Exists(Constants.AppDirectory)) Directory.CreateDirectory(Constants.AppDirectory);

            return Directory.GetFiles(Constants.AppDirectory, "*.json")
                .Select(xx => new FileInfo(xx))
                .OrderByDescending(xx => xx.CreationTime)
                .ToList();
        });
    }

    public async Task Import(FileInfo fileInfo)
    {
        var metadataFilePath = Path.Combine(Constants.AppDirectory, fileInfo.Name);
        if (!File.Exists(metadataFilePath)) return;

        var backupFilePath = await File.ReadAllTextAsync(metadataFilePath);
        if (!File.Exists(backupFilePath)) return;

        await RunImport(backupFilePath);
    }

    public async Task Import(string filePath)
    {
        if (!File.Exists(filePath)) return;

        await RunImport(filePath);
    }

    private async Task RunImport(string filePath)
    {
        if (!File.Exists(filePath)) return;

        var json = await File.ReadAllTextAsync(filePath);
        var data = System.Text.Json.JsonSerializer.Deserialize<ExportDto>(json);
        if (data is null) return;

        foreach (var day in data.Days) await _dayService.Upsert(day);

        foreach (var exercise in data.Exercises) await _exerciseService.Upsert(exercise);

        foreach (var set in data.Sets) await _setService.Upsert(set);

        foreach (var workout in data.Workouts) await _workoutService.Upsert(workout);

        foreach (var lastSelected in data.LastSelected) await _lastSelectedService.Upsert(lastSelected);

        foreach (var tag in data.Tags) await _tagRepository.Upsert(tag);
    }

    public async Task CleanDb()
    {
        {
            var deleted = await _dayService.GetDeleted();
            foreach (var item in deleted) await _dayService.Delete(item.Id);
        }
        {
            var deleted = await _exerciseService.GetDeleted();
            foreach (var item in deleted) await _exerciseService.Delete(item.Id);
        }
        {
            var deleted = await _lastSelectedService.GetDeleted();
            foreach (var item in deleted) await _lastSelectedService.Delete(item.Id);
        }
        {
            var deleted = await _setService.GetDeleted();
            foreach (var item in deleted) await _setService.Delete(item.Id);
        }
        {
            var deleted = await _tagRepository.GetDeleted();
            foreach (var item in deleted) await _tagRepository.Delete(item.Id);
        }
        {
            var deleted = await _workoutService.GetDeleted();
            foreach (var item in deleted) await _workoutService.Delete(item.Id);
        }
    }
}