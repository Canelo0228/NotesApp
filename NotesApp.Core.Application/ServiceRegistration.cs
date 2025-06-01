using NotesApp.Core.Application.Interfaces.Services;
using NotesApp.Core.Application.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace NotesApp.Core.Application
{
    public static class ServiceRegistration
    {
        public static void AddApplicationLayer(this IServiceCollection services, IConfiguration configuration)
        {


            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            #region Services
            services.AddTransient<INoteService, NoteService>();
            #endregion
        }

    }
}
