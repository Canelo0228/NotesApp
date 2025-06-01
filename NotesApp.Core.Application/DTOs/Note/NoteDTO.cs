using System.ComponentModel.DataAnnotations;

namespace NotesApp.Core.Application.DTOs.Note
{
    public class NoteDTO
    {
        public int Id { get; set; }

        [DataType(DataType.Text)]
        [Required(ErrorMessage = "The Title is Required")]
        [MaxLength(255)]
        public string Title { get; set; }

        [DataType(DataType.Text)]
        public string? Description { get; set; }
        public bool IsArchived { get; set; }
    }
}
