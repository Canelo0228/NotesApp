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
        private readonly INoteRepository _noteRepository;
        private readonly IMapper _mapper;

        public NoteService(INoteRepository noteRepository, IMapper mapper)
        {
            _noteRepository = noteRepository;
            _mapper = mapper;
        }

        public async Task<NoteDTO> Add(NoteDTO sv)
        {
            Note note = _mapper.Map<Note>(sv);
            note = await _noteRepository.Add(note);
            NoteDTO SaveNote = _mapper.Map<NoteDTO>(note);

            return SaveNote;
        }

        public async Task Update(NoteDTO sn, int id)
        {
            Note note = _mapper.Map<Note>(sn);

            await _noteRepository.Update(note, id);
        }

        public async Task Delete(int id)
        {
            var note = await _noteRepository.GetById(id);

            await _noteRepository.Delete(note);
        }

        public async Task<List<NoteDTO>> GetAll()
        {
            var notes = await _noteRepository.GetAll();

            return _mapper.Map<List<NoteDTO>>(notes);
        }

        public async Task<List<NoteDTO>> GetByStatus(bool isArhived)
        {
            Expression<Func<Note, bool>> filter = n => n.IsArchived == isArhived;

            var notes = await _noteRepository.GetByStatus(filter);

            return _mapper.Map<List<NoteDTO>>(notes);
        }

        public async Task<bool> SetArchiveStatus(int id, bool isArchived)
        {
            var note = await _noteRepository.GetById(id);
            if (note == null) return false;
            note.IsArchived = isArchived;

            await _noteRepository.Update(note, id);

            return true;
        }

    }
}
