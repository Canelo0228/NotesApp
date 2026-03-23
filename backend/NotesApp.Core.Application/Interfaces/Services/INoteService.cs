using NotesApp.Core.Application.DTOs.Note;

namespace NotesApp.Core.Application.Interfaces.Services
{
    public interface INoteService
    {
        Task<NoteDTO> AddAsync(SaveNoteDTO sv);

        Task UpdateAsync(SaveNoteDTO sn, int id);

        Task DeleteAsync(int id);

        Task<List<NoteDTO>> GetAllAsync();

        Task<List<NoteDTO>> GetByStatusAsync(bool isArhived);

        Task<bool> SetArchiveStatusAsync(int id, bool isArchived);

        Task<NoteDTO> GetByIdAsync(int id);
    }
}
