using AutoMapper;
using NotesApp.Core.Application.DTOs.Note;
using NotesApp.Core.Domain.Entities;

namespace NotesApp.Core.Application.Mappings
{
    public class GeneralProfile : Profile
    {
        public GeneralProfile()
        {

            CreateMap<Note, NoteDTO>();
            CreateMap<NoteDTO, Note>();
        }
    }
}
