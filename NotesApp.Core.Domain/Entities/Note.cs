namespace NotesApp.Core.Domain.Entities
{
    public class Note
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public bool IsArchived { get; set; } = false;
    }
}
