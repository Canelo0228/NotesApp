import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full'
  },
  {
    path: 'notes',
    loadComponent: () =>
      import('./features/notes/pages/active-notes/active-notes.component')
        .then(m => m.ActiveNotesComponent)
  },
  {
    path: 'archived',
    loadComponent: () =>
      import('./features/notes/pages/archived-notes/archived-notes.component')
        .then(m => m.ArchivedNotesComponent)
  },
  {
    path: '**',
    redirectTo: 'notes'
  }
];
