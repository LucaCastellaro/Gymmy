using LiteDB;

namespace DataAccess.Entities;

public record BaseEntity
{
    [BsonId]
    public required Guid Id { get; init; }
    public required bool IsActive { get; set; }
}

public record BaseEntityWithPriority : BaseEntity
{
    public required int Priority { get; set; }
}