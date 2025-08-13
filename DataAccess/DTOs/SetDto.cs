namespace DataAccess.DTOs;

public sealed record SetDto : BaseEntityWithPriorityDto
{
    public required int Reps { get; set; }
    public required int Rest { get; set; }
    public required decimal Weight { get; set; }
    public DateTime? LastDone { get; set; } = null;
    public string? Notes { get; set; }
}