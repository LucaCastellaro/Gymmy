namespace DataAccess.Entities;
public sealed record Set : BaseEntityWithPriority
{
    public required int Reps { get; set; }
    public required int Rest { get; set; }
    public required decimal Weight { get; set; }
    public DateTime? LastDone { get; set; } = null;
    public string? Notes { get; set; }
}