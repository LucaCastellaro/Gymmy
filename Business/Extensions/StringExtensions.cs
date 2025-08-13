namespace Business.Extensions;

public static class StringExtensions
{
    public static string Truncate(this string value, int maxLength = 7)
    {
        if (string.IsNullOrEmpty(value) || maxLength <= 0)
        {
            return string.Empty;
        }
        return value.Length <= maxLength ? value : $"{value[..maxLength]}...";
    }
}