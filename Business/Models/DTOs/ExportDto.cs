using DataAccess.DTOs;

namespace Business.Models.DTOs;

public sealed record ExportDto(
    List<DayDto> Days,
    List<ExerciseDto> Exercises,
    List<SetDto> Sets,
    List<WorkoutDto> Workouts,
    List<LastSelectedDto> LastSelected
);