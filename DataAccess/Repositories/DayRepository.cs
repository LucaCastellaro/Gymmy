namespace DataAccess.Repositories;

public interface IDayRepository : IBaseRepository<Entities.Day, DTOs.DayDto>
{
    Task Add(DTOs.DayDto source);
}

public sealed class DayRepository : BaseRepository<Entities.Day, DTOs.DayDto>, IDayRepository
{
    public DayRepository(GymmyDatabase dbContext) : base(dbContext)
    {
    }

    public async Task Add(DTOs.DayDto source)
    {
        var priority = source.Priority ?? -1;
        if (priority < 0)
        {
            var days = await Get();
            var maxPriority = days
                .Select(x => x.Priority)
                .Max();
            priority = (maxPriority ?? -1) + 1;
        }

        await base.Upsert(new()
        {
            Description = source.Description,
            Id = source.Id,
            Priority = priority,
            IsActive = true,
            Exercises = source.Exercises,
        });
    }

    public override async Task DecrementPriority(Guid itemId)
    {
        var item = await FindById(itemId);
        if (item is null) return;

        var days = await Get();

        if (days.Count < 2) return;

        var nextItem = days
            .Where(xx => xx.Priority > item.Priority && item.IsActive)
            .OrderBy(xx => xx.Priority)
            .FirstOrDefault();

        if (nextItem is null) return;

        (item.Priority, nextItem.Priority) = (nextItem.Priority, item.Priority);

        await Upsert(item);
        await Upsert(nextItem);
    }

    public override async Task IncrementPriority(Guid itemId)
    {
        var item = await FindById(itemId);
        if (item is null) return;

        var days = await Get();

        if (days.Count < 2) return;

        var previousItem = days
            .Where(xx => xx.Priority < item.Priority && item.IsActive)
            .OrderByDescending(xx => xx.Priority)
            .FirstOrDefault();

        if (previousItem is null) return;

        (item.Priority, previousItem.Priority) = (previousItem.Priority, item.Priority);

        await Upsert(item);
        await Upsert(previousItem);
    }
}