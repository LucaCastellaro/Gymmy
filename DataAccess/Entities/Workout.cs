namespace DataAccess.Entities;

public sealed record Workout : BaseEntity
{
    public List<WorkoutExercise> Exercises { get; init; } = [];
    public required DateTime Start { get; init; } = DateTime.Now;
    public DateTime? End { get; init; }
    public required decimal TotalVolume { get; init; }
}

public sealed record WorkoutExercise(Guid Id, string Name, List<WorkoutSet> Sets);
public sealed record WorkoutSet(Guid Id, int Reps, decimal Weight, int Rest, DateTime Timestamp);