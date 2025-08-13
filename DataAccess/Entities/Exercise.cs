namespace DataAccess.Entities;

public sealed record Exercise : BaseEntityWithPriority
{
    public required string Description { get; set; }
    public required int Rest { get; set; }
    public List<Tag> Tags { get; set; } = [];
    public DateTime? LastDone { get; set; }
    public string? Notes { get; set; }
    public List<Guid> Sets { get; set; } = [];
}