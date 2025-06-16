using System.ComponentModel.DataAnnotations;

namespace NotesApp.Core.Application.DTOs.Note
{
    public class NoteStatusDTO
    {
        [DataType(DataType.Text)]
        [Required(ErrorMessage = "The status of the note is Required")]
        public bool IsArchived { get; set; }
    }
}
