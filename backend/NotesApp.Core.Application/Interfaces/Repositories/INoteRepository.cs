using NotesApp.Core.Domain.Entities;
using System.Linq.Expressions;

namespace NotesApp.Core.Application.Interfaces.Repositories
{
    public interface INoteRepository
    {
        Task<Note> AddAsync(Note note);

        Task UpdateAsync(Note note, int id);

        Task DeleteAsync(Note note);

        Task<List<Note>> GetAllAsync();

        Task<List<Note>> GetByStatusAsync(Expression<Func<Note, bool>> filter);

        Task<Note> GetByIdAsync(int id);
    }
}
