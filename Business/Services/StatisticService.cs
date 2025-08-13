using Business.Models.DTOs;

namespace Business.Services;

public interface IStatisticService
{
    Task<StatisticDto> Get();
}

public sealed class StatisticService : IStatisticService
{
    private readonly DataAccess.Repositories.IWorkoutRepository _workoutService;
    private readonly DataAccess.Repositories.IExerciseRepository _exerciseService;

    public StatisticService(DataAccess.Repositories.IWorkoutRepository workoutService, DataAccess.Repositories.IExerciseRepository exerciseService)
    {
        _workoutService = workoutService;
        _exerciseService = exerciseService;
    }

    public async Task<StatisticDto> Get()
    {
        var workouts = await _workoutService.Get(xx => xx.End != null);

        return new()
        {
            TotalWorkouts = workouts.Count,
            TotalWorkoutsPerYear = await GetTotalWorkoutsPerYear(),
            TotalWorkoutsPerMonth = await GetTotalWorkoutsPerMonth(),
            TotalWorkoutsPerWeek = await GetTotalWorkoutsPerWeek(),
            AvgDuration = GetAvgDuration(workouts),
            MaxDuration = GetMaxDuration(workouts),
            TotalExercises = (await _exerciseService.GetAll()).Count,
            ActiveExercises = (await _exerciseService.Get()).Count
        };
    }

    private async Task<CompareDto<int>> GetTotalWorkoutsPerMonth()
    {
        var currentMonthStart = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
        var lastMonthStart = new DateTime(DateTime.Now.Year, DateTime.Now.Month - 1, 1);
        return new(
            (await _workoutService.Get(xx => xx.Start >= currentMonthStart)).Count,
            (await _workoutService.Get(xx => xx.Start < currentMonthStart && xx.Start >= lastMonthStart)).Count
        );
    }

    private async Task<CompareDto<int>> GetTotalWorkoutsPerYear()
    {
        return new(
            (await _workoutService.Get(xx => xx.Start.Year == DateTime.Now.Year)).Count,
            (await _workoutService.Get(xx => xx.Start.Year == DateTime.Now.Year - 1)).Count
        );
    }

    private async Task<CompareDto<int>> GetTotalWorkoutsPerWeek()
    {
        var daysSinceStartOfWeek = DateTime.Today.DayOfWeek is DayOfWeek.Sunday ? 6 : (int)DateTime.Today.DayOfWeek - 1;
        var currentWeekStart = DateTime.Today.AddDays(-1 * daysSinceStartOfWeek);
        var lastWeekStart = DateTime.Today.AddDays(-1 * (daysSinceStartOfWeek + 7));
        return new(
            (await _workoutService.Get(xx => xx.Start >= currentWeekStart)).Count,
            (await _workoutService.Get(xx => xx.Start < currentWeekStart && xx.Start >= lastWeekStart)).Count
        );
    }

    private DurationDto GetAvgDuration(List<DataAccess.DTOs.WorkoutDto> workouts)
    {
        var totalSeconds = workouts.Count < 1
            ? 0
            : workouts.Average(xx => (xx.End!.Value - xx.Start).TotalSeconds);
        var timeSpan = TimeSpan.FromSeconds(totalSeconds);
        return new(
            ((int)timeSpan.TotalHours),
            timeSpan.Minutes,
            timeSpan.Seconds
        );
    }

    private DurationDto GetMaxDuration(List<DataAccess.DTOs.WorkoutDto> workouts)
    {
        var totalSeconds = workouts.Count < 1
            ? 0
            : workouts.Max(xx => (xx.End!.Value - xx.Start).TotalSeconds);
        var timeSpan = TimeSpan.FromSeconds(totalSeconds);
        return new(
            ((int)timeSpan.TotalHours),
            timeSpan.Minutes,
            timeSpan.Seconds
        );
    }
}