namespace DataAccess.Repositories;

public interface ISetRepository : IBaseRepository<Entities.Set, DTOs.SetDto>
{
    Task Add(DTOs.NewSetDto source);
}

public sealed class SetRepository : BaseRepository<Entities.Set, DTOs.SetDto>, ISetRepository
{
    private readonly IExerciseRepository _exerciseRepo;

    public SetRepository(GymmyDatabase dbContext, IExerciseRepository exerciseRepo) : base(dbContext)
    {
        _exerciseRepo = exerciseRepo;
    }

    public async Task Add(DTOs.NewSetDto source)
    {
        if (!await _exerciseRepo.Exists(source.ExerciseId)) return;

        if (await Exists(source.Id)) return;

        var priority = source.Priority ?? -1;
        if (priority < 0)
        {
            var sets = await Get();
            var maxPriority = sets
                .Select(x => x.Priority)
                .Max();
            priority = (maxPriority ?? -1) + 1;
        }

        var exercise = await _exerciseRepo.FindById(source.ExerciseId);
        if (exercise is null) return;

        exercise.Sets.Add(source.Id);
        await _exerciseRepo.Upsert(exercise);

        await base.Upsert(new()
        {
            Id = source.Id,
            Reps = source.Reps,
            Rest = source.Rest,
            Weight = source.Weight,
            Priority = priority,
            LastDone = null,
            IsActive = true,
        });
    }
}