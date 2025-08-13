namespace DataAccess.DTOs;

public record BaseEntityDto
{
    public required Guid Id { get; init; }
    public required bool IsActive { get; set; }
}

public record BaseEntityWithPriorityDto : BaseEntityDto
{
    public int? Priority { get; set; }
}