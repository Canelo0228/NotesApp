using AutoMapper;
using NotesApp.Core.Application.DTOs.Note;
using NotesApp.Core.Domain.Entities;

namespace NotesApp.Core.Application.Mappings
{
    public class GeneralProfile : Profile
    {
        public GeneralProfile()
        {
            CreateMap<Note, NoteDTO>()
                .ReverseMap();
            CreateMap<Note, SaveNoteDTO>()
                .ReverseMap();
            CreateMap<NoteDTO, SaveNoteDTO>()
                .ReverseMap()
                .ForMember(dest => dest.Id, opt => opt.Ignore());
        }
    }
}
