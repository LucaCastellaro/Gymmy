namespace DataAccess.DTOs;

public sealed record ExerciseDto : BaseEntityWithPriorityDto
{
    public required string Description { get; set; }
    public required int Rest { get; set; }
    public IEnumerable<TagDto> Tags { get; set; } = [];
    public DateTime? LastDone { get; set; } = null;
    public string? Notes { get; set; }
    public List<Guid> Sets { get; set; } = [];
}