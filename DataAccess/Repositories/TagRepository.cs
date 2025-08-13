namespace DataAccess.Repositories;

public interface ITagRepository : IBaseRepository<Entities.Tag, DTOs.TagDto>
{
}

public sealed class TagRepository : BaseRepository<Entities.Tag, DTOs.TagDto>, ITagRepository
{
    public TagRepository(GymmyDatabase context) : base(context)
    {
    }
}