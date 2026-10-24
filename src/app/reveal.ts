import { Directive, ElementRef, Injectable, afterNextRender, inject, signal } from '@angular/core';

/** One shared IntersectionObserver for every element that fades in as it scrolls into view. */
@Injectable({ providedIn: 'root' })
export class RevealService {
  private observer?: IntersectionObserver;
  private readonly callbacks = new Map<Element, () => void>();
  private registered = 0;

  /** Cards in a row appear one after another: 0, 70, 140, 210 ms, then the pattern repeats. */
  nextDelay(): number {
    return (this.registered++ % 4) * 70;
  }

  /** Browser only. Calls `onVisible` once, the first time the element is at least 12% on screen. */
  observe(element: Element, onVisible: () => void, threshold = 0.12): void {
    this.observer ??= new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          this.callbacks.get(entry.target)?.();
          this.callbacks.delete(entry.target);
          this.observer?.unobserve(entry.target);
        }
      },
      { threshold },
    );
    this.callbacks.set(element, onVisible);
    this.observer.observe(element);
  }
}

/** Put `appReveal` on any element to have it fade and slide up when it first scrolls into view. */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal', '[class.in]': 'shown()' },
})
export class Reveal {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly shown = signal(false);

  constructor() {
    const service = inject(RevealService);
    const delay = service.nextDelay();
    afterNextRender(() => {
      this.element.nativeElement.style.transitionDelay = `${delay}ms`;
      service.observe(this.element.nativeElement, () => this.shown.set(true));
    });
  }
}
