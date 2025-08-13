namespace DataAccess;

public static class Constants
{
    public const string DatabaseFilename = "Gymmy.db";

    public static string DatabasePath =>
        Path.Combine(AppDirectory, DatabaseFilename);

    public static string AppDirectory =>
        Path.Combine(FileSystem.AppDataDirectory);
}