namespace DataAccess.DTOs;

public sealed record NewExerciseDto(Guid Id, string Description, int Rest, List<Guid> Days, Dictionary<Guid, NewSetDto> Sets, int? Priority = null);

public sealed record NewSetDto(Guid Id, Guid ExerciseId, int Reps, int Rest, decimal Weight, int? Priority = null);

public sealed record NewDayDto(Guid Id, string Description, Dictionary<Guid, NewExerciseDto> Exercises, int? Priority = null);