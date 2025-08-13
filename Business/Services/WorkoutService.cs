namespace Business.Services;

public interface IWorkoutService
{
    Task AddSet(Guid id, Guid exerciseId, DataAccess.DTOs.SetDto set);

    Task CloseWorkout(Guid id);

    Task CloseWorkoutForInactivity(Guid id);

    Task<List<DataAccess.DTOs.WorkoutDto>> GetClosedWorkouts(DateTime? start = null, DateTime? end = null);

    Task<DataAccess.DTOs.WorkoutDto?> GetCurrentWorkout();

    Task RemoveSet(Guid id, Guid exerciseId, DataAccess.DTOs.SetDto set);

    Task<Guid> Start();

    Task Stop(Guid id);

    Task<bool> IsInactive(Guid id);
}

public class WorkoutService : IWorkoutService
{
    private readonly DataAccess.Repositories.IWorkoutRepository _repo;
    private readonly DataAccess.Repositories.IExerciseRepository _exerciseRepo;

    private const int InactivityThresholdHours = -2;
    private const int InactivityBonusMinutes = 10;

    public WorkoutService(DataAccess.Repositories.IWorkoutRepository repo, DataAccess.Repositories.IExerciseRepository exerciseRepo)
    {
        _repo = repo;
        _exerciseRepo = exerciseRepo;
    }

    public async Task<DataAccess.DTOs.WorkoutDto?> GetCurrentWorkout()
    {
        return await _repo.Find(xx => xx.End == null);
    }

    public async Task CloseWorkout(Guid id)
    {
        var workout = await GetCurrentWorkout();
        if (workout is null) return;

        workout.End = DateTime.Now;

        await _repo.Upsert(workout);
    }

    public async Task<bool> IsInactive(Guid id)
    {
        var workout = await GetCurrentWorkout();
        if (workout is null || workout.End is not null) return false;

        var sets = workout.Exercises
            .SelectMany(ex => ex.Sets);

        if (!sets.Any()) return false;

        var lastSetTimestamp = sets.Max(xx => xx.Timestamp);
        return lastSetTimestamp <= DateTime.Now.AddHours(InactivityThresholdHours);
    }

    public async Task CloseWorkoutForInactivity(Guid id)
    {
        var workout = await GetCurrentWorkout();
        if (workout is null) return;

        var sets = workout.Exercises
            .SelectMany(ex => ex.Sets);

        if (!sets.Any()) return;

        var lastSetTimestamp = sets.Max(xx => xx.Timestamp);
        workout.End = lastSetTimestamp.AddMinutes(InactivityBonusMinutes);

        await _repo.Upsert(workout);
    }

    public async Task<List<DataAccess.DTOs.WorkoutDto>> GetClosedWorkouts(DateTime? start = null, DateTime? end = null)
    {
        var workouts = (await _repo.Get())
            .Where(xx => xx.End is not null);

        if (start is not null)
            workouts = workouts.Where(xx => xx.Start >= start);

        if (end is not null)
            workouts = workouts.Where(xx => xx.End >= end);

        return workouts.ToList();
    }

    public async Task<Guid> Start()
    {
        var newWorkout = new DataAccess.DTOs.WorkoutDto
        {
            Id = Guid.NewGuid(),
            IsActive = true,
            Start = DateTime.Now,
            TotalVolume = 0,
            TotalReps = 0,
            TotalWeight = 0,
        };

        await _repo.Upsert(newWorkout);

        return newWorkout.Id;
    }

    public async Task Stop(Guid id)
    {
        var workout = await _repo.FindById(id);
        if (workout is null) return;

        workout.End = DateTime.Now;

        await _repo.Upsert(workout);
    }

    public async Task AddSet(Guid id, Guid exerciseId, DataAccess.DTOs.SetDto set)
    {
        var workout = await _repo.FindById(id);
        if (workout is null) return;

        var exercise = workout.Exercises.FirstOrDefault(e => e.Id == exerciseId);
        if (exercise is null)
        {
            var exe = await _exerciseRepo.FindById(exerciseId);
            if (exe is null) return;

            exercise = new DataAccess.DTOs.WorkoutExerciseDto(exe.Id, exe.Description, []);
        }

        if (exercise.Sets.Exists(item => item.Id == set.Id)) return;

        workout.Exercises.Remove(exercise);

        var workoutSet = new DataAccess.DTOs.WorkoutSetDto(set.Id, set.Reps, set.Weight, set.Rest, DateTime.Now);
        exercise.Sets.Add(workoutSet);

        workout.Exercises.Add(exercise);

        workout.TotalReps += set.Reps;
        workout.TotalWeight += set.Weight;
        workout.TotalVolume += set.Weight * set.Reps;

        await _repo.Upsert(workout);
    }

    public async Task RemoveSet(Guid id, Guid exerciseId, DataAccess.DTOs.SetDto set)
    {
        var workout = await _repo.FindById(id);
        if (workout is null) return;

        var exercise = workout.Exercises.FirstOrDefault(e => e.Id == exerciseId);
        if (exercise is null) return;

        var onDb = exercise.Sets.FirstOrDefault(s => s.Id == set.Id);
        if (onDb is null) return;

        exercise.Sets.Remove(onDb);

        workout.TotalReps -= onDb.Reps;
        workout.TotalWeight -= onDb.Weight;
        workout.TotalVolume -= onDb.Weight * onDb.Reps;

        if (exercise.Sets.Count == 0) workout.Exercises.Remove(exercise);

        await _repo.Upsert(workout);
    }
}