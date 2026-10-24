import { Component, Injectable, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly message = signal('');
  readonly visible = signal(false);
  private timer?: ReturnType<typeof setTimeout>;

  show(message: string): void {
    this.message.set(message);
    this.visible.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.visible.set(false), 1800);
  }
}

@Component({
  selector: 'app-toast',
  template: `<div class="toast" [class.show]="toast.visible()" role="status" aria-live="polite">{{ toast.message() }}</div>`,
})
export class Toast {
  protected readonly toast = inject(ToastService);
}
