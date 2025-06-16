using NotesApp.Core.Domain.Entities;
using System.Linq.Expressions;

namespace NotesApp.Core.Application.Interfaces.Repositories
{
    public interface INoteRepository
    {
        Task<Note> Add(Note note);

        Task Update(Note note, int id);

        Task Delete(Note note);

        Task<List<Note>> GetAll();

        Task<List<Note>> GetByStatus(Expression<Func<Note, bool>> filter);

        Task<Note> GetById(int id);
    }
}
