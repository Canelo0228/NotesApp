using NotesApp.Core.Application.DTOs.Note;

namespace NotesApp.Core.Application.Interfaces.Services
{
    public interface INoteService
    {
        Task<NoteDTO> Add(NoteDTO sv);

        Task Update(NoteDTO sn, int id);

        Task Delete(int id);

        Task<List<NoteDTO>> GetAll();

        Task<List<NoteDTO>> GetByStatus(bool isArhived);

        Task<bool> SetArchiveStatus(int id, bool isArchived);
    }
}
