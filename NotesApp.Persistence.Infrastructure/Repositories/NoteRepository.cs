using Microsoft.EntityFrameworkCore;
using NotesApp.Core.Application.Interfaces.Repositories;
using NotesApp.Core.Domain.Entities;
using NotesApp.Infrastructure.Persistence.Contexts;
using System.Linq.Expressions;

namespace NotesApp.Infrastructure.Persistence.Repositories
{
    public class NoteRepository : INoteRepository
    {
        private readonly ApplicationContext _dbContext;

        public NoteRepository(ApplicationContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Note> Add(Note note)
        {
            await _dbContext.Set<Note>().AddAsync(note);
            await _dbContext.SaveChangesAsync();

            return note;
        }

        public async Task Update(Note note, int id)
        {
            Note entry = await _dbContext.Set<Note>().FindAsync(id);
            _dbContext.Entry(entry).CurrentValues.SetValues(note);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(Note note)
        {
            _dbContext.Set<Note>().Remove(note);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<Note>> GetAll()
        {
            return await _dbContext.Set<Note>().ToListAsync();
        }

        public async Task<List<Note>> GetByStatus(Expression<Func<Note, bool>> filter)
        {
            if (filter != null)
            {
                return await _dbContext.Set<Note>().Where(filter).ToListAsync();
            }
            else
            {
                return await GetAll();
            }
        }

        public async Task<Note> GetById(int id)
        {
            return await _dbContext.Set<Note>().FindAsync(id);
        }

        public async Task SaveChanges()
        {
            await _dbContext.SaveChangesAsync();        }
    }
}
