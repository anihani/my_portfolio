import { Component, ElementRef, afterNextRender, inject, signal, viewChild, Injector } from '@angular/core';
import { PROFILE, profileLinks } from './data/profile';
import { Icon } from './icon';
import { Reveal } from './reveal';
import { ToastService } from './toast';

@Component({
  selector: 'app-contact',
  imports: [Reveal, Icon],
  template: `
    <section class="block" id="contact">
      <div class="container">
        <div class="contact-wrap" appReveal>
          <h2>Let's build something great.</h2>
          <p>Open to conversations about front-end engineering, Angular applications and UI work.</p>
          <div class="contact-actions">
            <a class="btn btn-light" [href]="mailtoLink"><app-icon name="mail" />Email me</a>
            @for (link of profileLinks; track link.label) {
              <a class="btn btn-outline-light" [href]="link.url" [attr.target]="link.external ? '_blank' : null" [attr.rel]="link.external ? 'noopener' : null" [attr.download]="link.download ? '' : null">
                <app-icon [name]="link.icon" />{{ link.label }}<span class="sr-only"> (opens in a new tab)</span>
              </a>
            }
            <!-- A button, not a link: the WhatsApp address (which contains the number) is only built when it is clicked. -->
            <button class="btn btn-outline-light" type="button" (click)="openWhatsApp()">
              <app-icon name="message" />WhatsApp<span class="sr-only"> (opens WhatsApp in a new tab)</span>
            </button>
          </div>
          <div class="contact-grid">
            <div class="contact-item">
              <div class="label">EMAIL</div>
              <div class="row">
                <a [href]="'mailto:' + profile.email">{{ profile.email }}</a>
                <button class="copy-btn" type="button" (click)="copy('email', profile.email)">{{ copied() === 'email' ? 'Copied!' : 'Copy' }}<span class="sr-only"> email address</span></button>
              </div>
            </div>
            <div class="contact-item">
              <div class="label">PHONE</div>
              <div class="row">
                @if (phoneShown()) {
                  <a #phoneLink [href]="'tel:' + profile.phoneTel">{{ profile.phone }}</a>
                  <button class="copy-btn" type="button" (click)="copy('phone', profile.phone)">{{ copied() === 'phone' ? 'Copied!' : 'Copy' }}<span class="sr-only"> phone number</span></button>
                } @else {
                  <!-- The number is not in the page until this is clicked, so it is not sitting in the HTML for bots to collect. -->
                  <button class="copy-btn show-btn" type="button" (click)="showPhone()">Show number</button>
                }
              </div>
            </div>
            <div class="contact-item">
              <div class="label">BASED IN</div>
              <div class="row"><span class="val">{{ profile.basedIn }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Contact {
  private readonly toast = inject(ToastService);
  protected readonly profile = PROFILE;
  protected readonly mailtoLink = `mailto:${PROFILE.email}?subject=${encodeURIComponent('Hello Anilkumar')}`;
  /** Which button just copied, so its label reads "Copied!" for a moment. */
  protected readonly copied = signal<'email' | 'phone' | null>(null);

  protected readonly profileLinks = profileLinks();

  private readonly injector = inject(Injector);
  private readonly phoneLink = viewChild<ElementRef<HTMLAnchorElement>>('phoneLink');
  protected readonly phoneShown = signal(false);

  protected showPhone(): void {
    this.phoneShown.set(true);
    // The button disappears, so move focus to the number to keep keyboard and screen-reader users in place.
    afterNextRender(() => this.phoneLink()?.nativeElement.focus(), { injector: this.injector });
  }

  /** Builds the WhatsApp address at click time, so the number never appears in the page itself. */
  protected openWhatsApp(): void {
    const digits = PROFILE.phoneTel.replace(/\D/g, '');
    const url = `https://wa.me/${digits}?text=${encodeURIComponent(PROFILE.whatsappMessage)}`;
    window.open(url, '_blank', 'noopener');
  }

  protected async copy(which: 'email' | 'phone', text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Older browsers and non-secure pages: fall back to a temporary text box.
      const box = Object.assign(document.createElement('textarea'), { value: text });
      document.body.appendChild(box);
      box.select();
      document.execCommand('copy');
      box.remove();
    }
    this.copied.set(which);
    setTimeout(() => this.copied.set(null), 1500);
    this.toast.show('Copied: ' + text);
  }
}
