using DataAccess.Enums;

namespace DataAccess.DTOs;

public sealed record LastSelectedDto : BaseEntityDto
{
    public required EntityType EntityType { get; set; }
    public required Guid EntityId { get; set; }
}
