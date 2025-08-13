using Business.Models.DTOs;

namespace Business.Extensions;

public static class WorkoutExtensions
{
    public static DurationDto GetDuration(this DataAccess.DTOs.WorkoutDto source)
    {
        var timeSpan = source.End!.Value - source.Start;
        return new(
            ((int)timeSpan.TotalHours),
            timeSpan.Minutes,
            timeSpan.Seconds
        );
    }
}