using DataAccess.Enums;

namespace DataAccess.Entities;
public sealed record LastSelected : BaseEntity
{
    public EntityType EntityType { get; init; }
    public Guid EntityId { get; set; }
}