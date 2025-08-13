namespace DataAccess.DTOs;

public sealed record DayDto : BaseEntityWithPriorityDto
{
    public required string Description { get; set; }
    public string? Notes { get; set; }
    public List<Guid> Exercises { get; set; } = [];
}