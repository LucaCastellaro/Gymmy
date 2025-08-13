namespace DataAccess.DTOs;

public sealed record WorkoutDto : BaseEntityDto
{
    public List<WorkoutExerciseDto> Exercises { get; init; } = [];
    public required DateTime Start { get; init; } = DateTime.Now;
    public DateTime? End { get; set; }
    public required decimal TotalVolume { get; set; }
    public required int TotalReps { get; set; }
    public required decimal TotalWeight { get; set; }
}

public sealed record WorkoutExerciseDto(Guid Id, string Name, List<WorkoutSetDto> Sets);
public sealed record WorkoutSetDto(Guid Id, int Reps, decimal Weight, int Rest, DateTime Timestamp);