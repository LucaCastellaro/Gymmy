using LiteDB;

namespace DataAccess;

public class GymmyDatabase
{
    private LiteDatabase? database;

    internal LiteDatabase GetDatabase()
    {
        if (database is null) Init();
        return database!;
    }

    public void Init()
    {
        if (database is not null)
            return;

        try
        {
            database = new LiteDatabase(Constants.DatabasePath);
        }
        catch (Exception)
        {
            throw;
        }
    }
}