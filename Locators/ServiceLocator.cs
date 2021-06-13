// using coursesmanagement.Services;
using Microsoft.Extensions.DependencyInjection;
using coursesmanagement.Services;

namespace coursesmanagement.Locators
{
    public static class ServiceLocator
    {
        internal static void ConfigureCourseServices(this IServiceCollection services, bool registerOdbc = false)
        {
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ISchoolYearService, SchoolYearService>();
            services.AddScoped<ICourseService, CourseService>();
            services.AddScoped<IFileService, FileService>();
        }
    }

}