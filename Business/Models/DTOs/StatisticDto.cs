using System.Globalization;
using System.Numerics;

namespace Business.Models.DTOs;
public sealed record StatisticDto
{
    public int TotalWorkouts { get; set; }
    public CompareDto<int> TotalWorkoutsPerYear { get; set; } = new(0, 0);
    public CompareDto<int> TotalWorkoutsPerMonth { get; set; } = new(0, 0);
    public CompareDto<int> TotalWorkoutsPerWeek { get; set; } = new(0, 0);
    public DurationDto AvgDuration { get; set; } = new(0, 0, 0);
    public DurationDto MaxDuration { get; set; } = new(0, 0, 0);
    public int TotalExercises { get; set; }
    public int ActiveExercises { get; set; }
}

public sealed record CompareDto<TData>(TData Current, TData Other)
    where TData : INumber<TData>;

public sealed record DurationDto(int Hours, int Minutes, int Seconds);