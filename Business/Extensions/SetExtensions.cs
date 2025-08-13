namespace Business.Extensions;

public static class SetExtensions
{
    public static bool IsDone(this DataAccess.DTOs.SetDto source)
    {
        return source.LastDone is not null && source.LastDone.Value.Date == DateTime.Today;
    }
}