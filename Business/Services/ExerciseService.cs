using Business.Models.Enums;
using DataAccess.DTOs;
using DataAccess.Entities;
using DataAccess.Repositories;
using System.Linq.Expressions;

namespace Business.Services;

public interface IExerciseService
{
    Task<List<DataAccess.DTOs.ExerciseDto>> GetAllByTags(IEnumerable<DataAccess.DTOs.TagDto> tags, MatchStrategy matchStrategy = MatchStrategy.And);

    Task<List<DataAccess.DTOs.ExerciseDto>> GetAllByDay(DataAccess.DTOs.DayDto day);

    Task<List<DataAccess.DTOs.TagDto>> GetTags(Guid exerciseId);

    Task<List<DataAccess.DTOs.ExerciseDto>> MoveUp(Guid dayId, Guid exerciseId);

    Task<List<DataAccess.DTOs.ExerciseDto>> MoveDown(Guid dayId, Guid exerciseId);

    Task Upsert(ExerciseDto item);

    Task<List<ExerciseDto>> Get(Expression<Func<Exercise, bool>> func);
}

public sealed class ExerciseService : IExerciseService
{
    private readonly IExerciseRepository _exerciseRepo;
    private readonly IDayRepository _dayRepo;

    public ExerciseService(DataAccess.Repositories.IExerciseRepository exerciseRepo, IDayRepository dayRepo)
    {
        _exerciseRepo = exerciseRepo;
        _dayRepo = dayRepo;
    }

    public async Task<List<DataAccess.DTOs.ExerciseDto>> GetAllByDay(DataAccess.DTOs.DayDto day)
    {
        return await _exerciseRepo.GetAll(xx => day.Exercises.Contains(xx.Id));
    }

    public async Task<List<DataAccess.DTOs.ExerciseDto>> GetAllByTags(IEnumerable<DataAccess.DTOs.TagDto> tags, MatchStrategy matchStrategy = MatchStrategy.And)
    {
        var all = await _exerciseRepo.GetAll();

        return matchStrategy switch
        {
            MatchStrategy.And => all.Where(ex => tags.All(tag => ex.Tags.Select(exTag => exTag.Id).Contains(tag.Id))).ToList(),
            _ => all.Where(ex => tags.Any(tag => ex.Tags.Select(exTag => exTag.Id).Contains(tag.Id))).ToList(),
        };
    }

    public async Task<List<DataAccess.DTOs.TagDto>> GetTags(Guid exerciseId)
    {
        var exercise = await _exerciseRepo.FindById(exerciseId);

        return exercise?.Tags.ToList() ?? [];
    }

    public async Task<List<DataAccess.DTOs.ExerciseDto>> MoveUp(Guid dayId, Guid exerciseId)
    {
        var day = await _dayRepo.FindById(dayId);
        if (day is null) return [];

        var index = day.Exercises.IndexOf(exerciseId);

        // Moves the exercise up by one position in the list, if it is not already the first one.
        if (index > 0)
        {
            day.Exercises.RemoveAt(index);
            day.Exercises.Insert(index - 1, exerciseId);
            await _dayRepo.Upsert(day);
        }
        return await GetAllByDay(day);
    }

    public async Task<List<DataAccess.DTOs.ExerciseDto>> MoveDown(Guid dayId, Guid exerciseId)
    {
        var day = await _dayRepo.FindById(dayId);
        if (day is null) return [];

        var index = day.Exercises.IndexOf(exerciseId);

        // Moves the exercise down by one position in the list, if it is not already the last one.
        if (index < (day.Exercises.Count - 1))
        {
            day.Exercises.RemoveAt(index);
            day.Exercises.Insert(index + 1, exerciseId);
            await _dayRepo.Upsert(day);
        }
        return await GetAllByDay(day);
    }

    public async Task Upsert(ExerciseDto item)
    {
        await _exerciseRepo.Upsert(item);
    }

    public async Task<List<ExerciseDto>> Get(Expression<Func<Exercise, bool>> func)
    {
        return await _exerciseRepo.Get(func);
    }
}