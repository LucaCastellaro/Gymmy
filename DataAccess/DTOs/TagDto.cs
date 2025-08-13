namespace DataAccess.DTOs;
public sealed record TagDto : BaseEntityDto
{
    public required string Name { get; set; }
}