namespace DataAccess.Entities;
public sealed record Day : BaseEntityWithPriority
{
    public required string Description { get; set; }
    public string? Notes { get; set; }
    public List<Guid> Exercises { get; set; } = [];
}