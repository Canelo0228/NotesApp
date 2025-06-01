using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NotesApp.Core.Application.Interfaces.Repositories;
using NotesApp.Infrastructure.Persistence.Contexts;
using NotesApp.Infrastructure.Persistence.Repositories;

namespace NotesApp.Infrastructure.Persistence
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("ConnectionString"),
                m => m.MigrationsAssembly(typeof(ApplicationContext).Assembly.FullName)));

            #region Repositories
            services.AddTransient<INoteRepository, NoteRepository>();
            #endregion
            
        }

    }
}
