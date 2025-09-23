using CommunityToolkit.Maui.Core;
using CommunityToolkit.Maui.Storage;
using Microsoft.Extensions.Logging;
using Microsoft.FluentUI.AspNetCore.Components;

namespace Gymmy;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder
            .UseMauiApp<App>()
            .UseMauiCommunityToolkitCore()
            .ConfigureFonts(fonts =>
            {
                fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                fonts.AddFont("Questrial-Regular.ttf", "Questrial");
                fonts.AddFont("Rubik-VariableFont_wght.tff", "Rubik");
            });

        builder.Services.AddMauiBlazorWebView();

        builder.Services
            .AddFluentUIComponents()
            .AddSingleton<DataAccess.GymmyDatabase>()
            .AddSingleton<DataAccess.Repositories.IDayRepository, DataAccess.Repositories.DayRepository>()
            .AddSingleton<DataAccess.Repositories.IExerciseRepository, DataAccess.Repositories.ExerciseRepository>()
            .AddSingleton<DataAccess.Repositories.ISetRepository, DataAccess.Repositories.SetRepository>()
            .AddSingleton<DataAccess.Repositories.ILastSelectedService, DataAccess.Repositories.LastSelectedService>()
            .AddSingleton<DataAccess.Repositories.IWorkoutRepository, DataAccess.Repositories.WorkoutRepository>()
            .AddSingleton<DataAccess.Repositories.ITagRepository, DataAccess.Repositories.TagRepository>()
            .AddSingleton<Business.Services.IStatisticService, Business.Services.StatisticService>()
            .AddSingleton<Business.Services.IDataService, Business.Services.DataService>()
            .AddSingleton<Business.Services.IExerciseService, Business.Services.ExerciseService>()
            .AddSingleton<Business.Services.IWorkoutService, Business.Services.WorkoutService>()
            .AddSingleton<Business.Services.ITagService, Business.Services.TagService>()
            .AddSingleton<IFileSaver>(FileSaver.Default)
            .AddSingleton<IFilePicker>(FilePicker.Default)
            ;

#if DEBUG
        builder.Services.AddBlazorWebViewDeveloperTools();
        builder.Logging.AddDebug();
#endif

        return builder.Build();
    }
}