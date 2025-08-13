using Business.Models.DTOs;
using DataAccess;
using DataAccess.Repositories;

namespace Business.Services;

public interface IDataService
{
    Task Export();

    Task Import(FileInfo fileInfo);

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
    private readonly GymmyDatabase _dbContext;

    public DataService(IDayRepository dayService, IExerciseRepository exerciseService, ISetRepository setService, IWorkoutRepository workoutService, ILastSelectedService lastSelectedService, ITagRepository tagRepository, GymmyDatabase dbContext)
    {
        _dayService = dayService;
        _exerciseService = exerciseService;
        _setService = setService;
        _workoutService = workoutService;
        _lastSelectedService = lastSelectedService;
        _tagRepository = tagRepository;
        _dbContext = dbContext;
    }

    public Task InitDb() => Task.Run(_dbContext.Init);

    public async Task DeleteAllData()
    {
        await _dayService.Drop();
        await _exerciseService.Drop();
        await _setService.Drop();
        await _workoutService.Drop();
        await _lastSelectedService.Drop();
        await _lastSelectedService.Drop();
        await _tagRepository.Drop();
    }

    public async Task<List<FileInfo>> DeleteExportFile(FileInfo fileInfo)
    {
        if (File.Exists(fileInfo.FullName)) fileInfo.Delete();
        return await GetExportedFiles();
    }

    public async Task Export()
    {
        var days = await _dayService.Get();
        var exercises = await _exerciseService.Get();
        var sets = await _setService.Get();
        var workouts = await _workoutService.Get();
        var lastSelected = await _lastSelectedService.Get();

        var export = new ExportDto(days, exercises, sets, workouts, lastSelected);

        var json = System.Text.Json.JsonSerializer.Serialize(export);

        var fileName = DateTime.Now.ToString("dd-MM-yyyy_HH:mm:ss");

        if (!Directory.Exists(Constants.AppDirectory)) Directory.CreateDirectory(Constants.AppDirectory);

        var filePath = Path.Combine(Constants.AppDirectory, $"Export_{fileName}.json");
        if (File.Exists(filePath)) File.Delete(filePath);

        await using (var fw = new StreamWriter(filePath))
        {
            await fw.WriteAsync(json);
            await fw.DisposeAsync();
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
        var filePath = Path.Combine(Constants.AppDirectory, fileInfo.Name);
        if (!File.Exists(filePath)) return;

        var json = await File.ReadAllTextAsync(filePath);
        var data = System.Text.Json.JsonSerializer.Deserialize<ExportDto>(json);
        if (data is null) return;

        foreach (var day in data.Days) await _dayService.Upsert(day);

        foreach (var exercise in data.Exercises) await _exerciseService.Upsert(exercise);

        foreach (var set in data.Sets) await _setService.Upsert(set);

        foreach (var workout in data.Workouts) await _workoutService.Upsert(workout);

        foreach (var lastSelected in data.LastSelected) await _lastSelectedService.Upsert(lastSelected);
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