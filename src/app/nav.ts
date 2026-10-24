import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { NAV_LINKS, PROFILE } from './data/profile';
import { Icon } from './icon';
import { ThemeService } from './theme';

@Component({
  selector: 'app-nav',
  imports: [Icon],
  template: `
    <header class="nav">
      <div class="container nav-inner">
        <a href="#top" class="brand"><span class="brand-mark">{{ profile.initials }}</span> {{ profile.name }}</a>
        <nav aria-label="Main" class="nav-main">
          <ul class="nav-links" [class.open]="menuOpen()" id="navLinks">
            @for (link of links; track link.id) {
              <li>
                <a [href]="'#' + link.id" [class.active]="active() === link.id" [attr.aria-current]="active() === link.id ? 'true' : null" (click)="menuOpen.set(false)">{{ link.label }}</a>
              </li>
            }
            <!-- On a phone the Contact button lives in the menu; on a desktop it sits beside the theme toggle. -->
            <li class="nav-contact-item">
              <a href="#contact" [class.active]="active() === 'contact'" (click)="menuOpen.set(false)">Contact</a>
            </li>
          </ul>
        </nav>
        <div class="nav-actions">
          <a href="#contact" class="btn btn-primary btn-small nav-cta">Contact</a>
          <button class="icon-btn" type="button" [attr.aria-label]="theme.theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'" (click)="theme.toggle()">
            <app-icon [name]="theme.theme() === 'dark' ? 'sun' : 'moon'" />
          </button>
          <button class="icon-btn menu-btn" type="button" aria-label="Menu" aria-controls="navLinks" [attr.aria-expanded]="menuOpen()" (click)="menuOpen.set(!menuOpen())">
            <app-icon [name]="menuOpen() ? 'close' : 'menu'" />
          </button>
        </div>
      </div>
    </header>
  `,
})
export class Nav {
  protected readonly theme = inject(ThemeService);
  protected readonly profile = PROFILE;
  protected readonly links = NAV_LINKS;
  protected readonly menuOpen = signal(false);
  /** The section currently in the middle of the screen, highlighted in the menu. */
  protected readonly active = signal('');

  constructor() {
    // inject() only works while the component is being created, so grab what the callback needs first.
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const spy = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) if (entry.isIntersecting) this.active.set(entry.target.id);
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      document.querySelectorAll('main section[id]').forEach((section) => spy.observe(section));
      destroyRef.onDestroy(() => spy.disconnect());
    });
  }
}
