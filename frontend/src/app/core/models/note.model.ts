export interface Note {
  id: number;
  title: string;
  description: string;
  isArchived: boolean;
}

export interface CreateNoteRequest {
  title: string;
  description: string;
}

export interface UpdateNoteRequest {
  title: string;
  description: string;
}

export interface NoteStatusRequest {
  isArchived: boolean;
}