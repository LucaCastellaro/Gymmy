using DataAccess.DTOs;
using DataAccess.Repositories;

namespace Business.Services;

public interface ITagService
{
    Task<List<TagDto>> Get();

    Task Upsert(TagDto tag);

    Task Delete(Guid id);
}

public sealed class TagService : ITagService
{
    private readonly ITagRepository _tagRepository;
    private readonly IExerciseRepository _exerciseRepository;

    public TagService(ITagRepository tagRepository, IExerciseRepository exerciseRepository)
    {
        _tagRepository = tagRepository;
        _exerciseRepository = exerciseRepository;
    }

    public async Task Delete(Guid id)
    {
        var exercises = (await _exerciseRepository.Get())
            .Where(xx => xx.Tags.Any(tt => tt.Id == id))
            .ToArray();

        try
        {
            foreach (var item in exercises)
            {
                item.Tags = item.Tags.Where(tt => tt.Id != id);
                await _exerciseRepository.Upsert(item);
            }
        }
        catch (Exception ex)
        {
            throw new Exception("Error while removing tag from exercises", ex);
        }

        await _tagRepository.Delete(id);
    }

    public async Task<List<TagDto>> Get()
    {
        return (await _tagRepository.Get())
            .OrderBy(xx => xx.Name)
            .ToList();
    }

    public Task Upsert(TagDto tag)
    {
        return _tagRepository.Upsert(tag);
    }
}