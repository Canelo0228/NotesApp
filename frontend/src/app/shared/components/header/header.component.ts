import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="header__inner">
        <div class="header__brand">
          <span class="header__logo-icon">✦</span>
          <span class="header__logo-text">NotesApp</span>
        </div>

        <nav class="header__nav">
          <a
            routerLink="/notes"
            routerLinkActive="header__nav-link--active"
            class="header__nav-link"
          >
            Active
          </a>
          <a
            routerLink="/archived"
            routerLinkActive="header__nav-link--active"
            class="header__nav-link"
          >
            Archived
          </a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(14, 14, 14, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
    }

    .header__inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .header__brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .header__logo-icon {
      color: var(--accent-gold);
      font-size: 1.1rem;
    }

    .header__logo-text {
      font-family: 'Playfair Display', serif;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      letter-spacing: 0.01em;
    }

    .header__nav {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .header__nav-link {
      padding: 6px 16px;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary);
      transition: all var(--transition);
      letter-spacing: 0.02em;

      &:hover {
        color: var(--text-primary);
        background: var(--bg-elevated);
      }

    }

    .header__nav-link--active {
      color: var(--accent-gold) !important;
      background: rgba(201, 168, 76, 0.1) !important;
    }

    .header__nav-link {
    }
  `]
})
export class HeaderComponent {}
