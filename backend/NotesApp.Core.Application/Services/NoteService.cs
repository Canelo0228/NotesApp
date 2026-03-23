using AutoMapper;
using NotesApp.Core.Application.DTOs.Note;
using NotesApp.Core.Application.Interfaces.Repositories;
using NotesApp.Core.Application.Interfaces.Services;
using NotesApp.Core.Domain.Entities;
using System.Linq.Expressions;

namespace NotesApp.Core.Application.Services
{
    public class NoteService : INoteService
    {
        private readonly INoteRepository _repository;
        private readonly IMapper _mapper;

        public NoteService(INoteRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<NoteDTO> AddAsync(SaveNoteDTO sv)
        {
            Note note = _mapper.Map<Note>(sv);
            note = await _repository.AddAsync(note);
            return _mapper.Map<NoteDTO>(sv);
        }

        public async Task UpdateAsync(SaveNoteDTO sn, int id)
        {
            var note = await _repository.GetByIdAsync(id);

            if (note == null) return;

            _mapper.Map(sn, note);

            await _repository.UpdateAsync(note, id);
        }

        public async Task DeleteAsync(int id)
        {
            var note = await _repository.GetByIdAsync(id);

            await _repository.DeleteAsync(note);
        }

        public async Task<List<NoteDTO>> GetAllAsync()
        {
            var notes = await _repository.GetAllAsync();

            return _mapper.Map<List<NoteDTO>>(notes);
        }

        public async Task<List<NoteDTO>> GetByStatusAsync(bool isArhived)
        {
            Expression<Func<Note, bool>> filter = n => n.IsArchived == isArhived;

            var notes = await _repository.GetByStatusAsync(filter);

            return _mapper.Map<List<NoteDTO>>(notes);
        }

        public async Task<bool> SetArchiveStatusAsync(int id, bool isArchived)
        {
            var note = await _repository.GetByIdAsync(id);
            if (note == null) return false;
            note.IsArchived = isArchived;

            await _repository.UpdateAsync(note, id);

            return true;
        }

        public async Task<NoteDTO> GetByIdAsync(int id)
        {
            var note = await _repository.GetByIdAsync(id);
            if (note == null) return null;

            return _mapper.Map<NoteDTO>(note);
        }
    }
}
