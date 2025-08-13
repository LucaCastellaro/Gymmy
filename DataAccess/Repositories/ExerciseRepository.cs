namespace DataAccess.Repositories;

public interface IExerciseRepository : IBaseRepository<Entities.Exercise, DTOs.ExerciseDto>
{
    Task Add(DTOs.NewExerciseDto source);
}

public sealed class ExerciseRepository : BaseRepository<Entities.Exercise, DTOs.ExerciseDto>, IExerciseRepository
{
    public ExerciseRepository(GymmyDatabase dbContext) : base(dbContext)
    {
    }

    public async Task Add(DTOs.NewExerciseDto source)
    {
        if (await Exists(source.Id)) return;

        var priority = source.Priority ?? -1;
        if (priority < 0)
        {
            var exercises = await Get();
            var maxPriority = exercises
                .Select(xx => xx.Priority)
                .Max();
            priority = (maxPriority ?? -1) + 1;
        }

        await base.Upsert(new()
        {
            Description = source.Description,
            Id = source.Id,
            Rest = source.Rest,
            Priority = priority,
            IsActive = true,
            Sets = [.. source.Sets.Keys],
        });
    }
}