import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Note, CreateNoteRequest, UpdateNoteRequest } from '../models/note.model';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private readonly baseUrl = `${environment.apiUrl}/note`;

  constructor(private http: HttpClient) {}

  getActiveNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.baseUrl);
  }

  getArchivedNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.baseUrl}/archived`);
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.baseUrl}/${id}`);
  }

  createNote(payload: CreateNoteRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl, payload);
  }

  updateNote(id: number, payload: UpdateNoteRequest): Observable<Note> {
    return this.http.put<Note>(`${this.baseUrl}/${id}`, {
      ...payload,
      isArchived: false
    });
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  archiveNote(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/status`, { isArchived: true });
  }

  unarchiveNote(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/status`, { isArchived: false });
  }
}