using Microsoft.EntityFrameworkCore;
using NotesApp.Core.Domain.Entities;

namespace NotesApp.Infrastructure.Persistence.Contexts
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Note> Notes { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Note>()
                .Property(e => e.Title)
                .IsRequired();

            modelBuilder.Entity<Note>()
                .Property(e => e.IsArchived)
                .HasDefaultValue(false)
                .IsRequired();
        }
    }
}
