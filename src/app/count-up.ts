import { Component, DestroyRef, ElementRef, afterNextRender, inject, input, signal } from '@angular/core';
import { RevealService } from './reveal';

/**
 * A number that counts up from 0 when it scrolls into view.
 * The prerendered page shows the final value, so search engines and no-JavaScript visitors see the real number.
 */
@Component({
  selector: 'app-count-up',
  template: `{{ displayValue() }}`,
})
export class CountUp {
  readonly value = input.required<number>();

  protected readonly shown = signal<number | null>(null);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    const reveal = inject(RevealService);
    const destroyed = { done: false };
    inject(DestroyRef).onDestroy(() => (destroyed.done = true));

    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      this.shown.set(0);
      // The host element has no box of its own (display: contents), so watch its parent.
      const target = this.element.nativeElement.parentElement ?? this.element.nativeElement;
      reveal.observe(target, () => this.animate(destroyed));
    });
  }

  protected displayValue(): number {
    return this.shown() ?? this.value();
  }

  private animate(destroyed: { done: boolean }): void {
    const end = this.value();
    const duration = 1200;
    const start = performance.now();
    const step = (now: number) => {
      if (destroyed.done) return;
      const progress = Math.min((now - start) / duration, 1);
      this.shown.set(Math.round(end * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
