import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, afterNextRender, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'ak-theme';

/**
 * Light and dark mode. A tiny script in index.html applies the saved or system theme before the page paints,
 * so there is no flash. This service only reads that choice and handles the toggle button.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Dark is the default. It starts the same on the server and in the browser, so the first render matches the prerendered page. */
  readonly theme = signal<Theme>('dark');

  constructor() {
    afterNextRender(() => {
      const applied = this.doc.documentElement.getAttribute('data-theme');
      if (applied === 'dark' || applied === 'light') this.theme.set(applied);
    });
  }

  toggle(): void {
    this.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  private set(theme: Theme): void {
    this.theme.set(theme);
    if (!this.isBrowser) return;
    this.doc.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be blocked (private windows); the theme still changes for this visit.
    }
  }
}
