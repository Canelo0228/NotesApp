using Microsoft.EntityFrameworkCore;
using NotesApp.Core.Application.Interfaces.Repositories;
using NotesApp.Core.Domain.Entities;
using NotesApp.Infrastructure.Persistence.Contexts;
using System.Linq.Expressions;

namespace NotesApp.Infrastructure.Persistence.Repositories
{
    public class NoteRepository : INoteRepository
    {
        private readonly ApplicationContext _context;

        public NoteRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<Note> AddAsync(Note note)
        {
            await _context.Set<Note>().AddAsync(note);
            await _context.SaveChangesAsync();

            return note;
        }

        public async Task UpdateAsync(Note note, int id)
        {
            Note entry = await _context.Set<Note>().FindAsync(id);

            if (entry != null)
            {
                _context.Entry(entry).CurrentValues.SetValues(note);
                var primaryKey = _context.Model.FindEntityType(typeof(Note))
                                        .FindPrimaryKey().Properties
                                        .Select(p => p.Name).FirstOrDefault();
                if (primaryKey != null)
                {
                    _context.Entry(entry).Property(primaryKey).IsModified = false;
                }

                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(Note note)
        {
            _context.Set<Note>().Remove(note);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Note>> GetAllAsync()
        {
            return await _context.Set<Note>().AsNoTracking().ToListAsync();
        }

        public async Task<List<Note>> GetByStatusAsync(Expression<Func<Note, bool>> filter)
        {
            if (filter != null)
            {
                return await _context.Set<Note>().AsNoTracking().Where(filter).ToListAsync();
            }
            else
            {
                return await GetAllAsync();
            }
        }

        public async Task<Note> GetByIdAsync(int id)
        {
            return await _context.Set<Note>().FindAsync(id);
        }
    }
}
