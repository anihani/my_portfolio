import { Component, HostListener, signal } from '@angular/core';
import { Icon } from './icon';

/** The thin progress bar along the top of the page and the round "back to top" button. */
@Component({
  selector: 'app-scroll-ui',
  imports: [Icon],
  template: `
    <div class="progress" [style.width.%]="progress()"></div>
    <button class="icon-btn to-top" type="button" aria-label="Back to top" [class.show]="showTop()" (click)="toTop()">
      <app-icon name="arrow-up" [stroke]="2.4" />
    </button>
  `,
})
export class ScrollUi {
  protected readonly progress = signal(0);
  protected readonly showTop = signal(false);

  @HostListener('window:scroll')
  protected onScroll(): void {
    const scrollable = document.documentElement.scrollHeight - innerHeight;
    this.progress.set(scrollable > 0 ? (scrollY / scrollable) * 100 : 0);
    this.showTop.set(scrollY > 600);
  }

  protected toTop(): void {
    scrollTo({ top: 0, behavior: 'smooth' });
  }
}
