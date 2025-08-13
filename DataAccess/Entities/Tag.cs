namespace DataAccess.Entities;
public sealed record Tag : BaseEntity
{
    public required string Name { get; set; }
}