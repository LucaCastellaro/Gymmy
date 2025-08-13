namespace DataAccess.Repositories;

public interface ILastSelectedService : IBaseRepository<Entities.LastSelected, DTOs.LastSelectedDto>
{
}

public sealed class LastSelectedService : BaseRepository<Entities.LastSelected, DTOs.LastSelectedDto>, ILastSelectedService
{
    public LastSelectedService(GymmyDatabase dbContext) : base(dbContext)
    {
    }

    public override async Task Upsert(DTOs.LastSelectedDto source)
    {
        var item = await FindById(source.Id);

        if (item is not null)
        {
            item.EntityId = source.EntityId;
        }
        else
        {
            item = new()
            {
                Id = Guid.NewGuid(),
                EntityType = source.EntityType,
                EntityId = source.EntityId,
                IsActive = true,
            };
        }

        await base.Upsert(item);
    }
}