namespace Business.Extensions;

public static class ExerciseExtensions
{
    public static bool IsDone(this DataAccess.DTOs.ExerciseDto source)
    {
        return source.LastDone is not null && source.LastDone.Value.Date == DateTime.Today;
    }
}