namespace DataAccess.Repositories;

public interface IWorkoutRepository : IBaseRepository<Entities.Workout, DTOs.WorkoutDto>
{
}

public sealed class WorkoutRepository : BaseRepository<Entities.Workout, DTOs.WorkoutDto>, IWorkoutRepository
{
    public WorkoutRepository(GymmyDatabase dbContext) : base(dbContext)
    {
    }
}