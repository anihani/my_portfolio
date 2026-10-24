import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { CountUp } from './count-up';
import { JOBS, LANGUAGES_SPOKEN, PROFILE, profileLinks } from './data/profile';
import { Icon } from './icon';
import { Reveal } from './reveal';

@Component({
  selector: 'app-hero',
  imports: [Icon, Reveal, CountUp],
  template: `
    <section class="hero" id="about">
      <div class="container">
        <div class="hero-grid">
          <div appReveal>
            <span class="eyebrow"><span class="dot"></span>{{ profile.availability }}<span class="eyebrow-place"> · {{ profile.location }}</span></span>
            <h1>Hi, I'm <span class="grad-text">{{ profile.name }}</span></h1>
            <!-- The typing animation is decoration: screen readers get the static list instead. -->
            <p class="role">
              {{ profile.titlePrefix }}<span class="typed" aria-hidden="true">{{ typed() }}</span><span class="caret" aria-hidden="true"></span>
              <span class="sr-only">{{ skillList }}</span>
            </p>
            <p class="lead">{{ profile.lead }}</p>
            <div class="cta">
              <a href="#contact" class="btn btn-primary">Get in touch <app-icon name="arrow-right" [stroke]="2.4" /></a>
              <a href="#work" class="btn btn-ghost">See my work</a>
            </div>
            <ul class="hero-links" aria-label="Profiles">
              @for (link of heroLinks; track link.label) {
                <li>
                  <a [href]="link.url" [attr.target]="link.external ? '_blank' : null" [attr.rel]="link.external ? 'noopener' : null" [attr.download]="link.download ? '' : null">
                    <app-icon [name]="link.icon" />{{ link.label }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <aside class="profile-card" appReveal aria-label="Profile card">
            <div class="pc-head">
              <img class="avatar" src="images/anil-img.jpg" width="104" height="104" [alt]="'Portrait of ' + profile.name" fetchpriority="high" decoding="async" />
              <div>
                <p class="pc-name">{{ profile.name }}</p>
                <p class="pc-role">{{ role }}</p>
                <p class="pc-company">{{ profile.company }}</p>
              </div>
            </div>
            <dl class="pc-details">
              <dt>Works with</dt>
              <dd>{{ workedWith }}</dd>
              <dt>Building since</dt>
              <dd>{{ since }}</dd>
              <dt>Based in</dt>
              <dd>{{ profile.basedIn }}</dd>
              <dt>Speaks</dt>
              <dd>{{ spoken }}</dd>
            </dl>
            <!-- The handwriting is decoration; the name is already in the card. -->
            <svg class="sig-svg" [class.draw]="drawn()" viewBox="0 0 420 110" aria-hidden="true" focusable="false">
              <text x="10" y="78">{{ profile.name }}</text>
            </svg>
          </aside>
        </div>

        <div class="stats">
          @for (stat of profile.stats; track stat.label) {
            <div class="stat" appReveal>
              <div class="stat-num grad-text"><app-count-up [value]="stat.value" />{{ stat.suffix }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Hero {
  protected readonly profile = PROFILE;
  protected readonly skillList = PROFILE.typedWords.join(', ');
  protected readonly workedWith = PROFILE.typedWords.slice(0, 3).join(' · ');
  protected readonly role = JOBS[0].role;
  protected readonly since = PROFILE.signature.since.slice(0, 4);
  protected readonly spoken = LANGUAGES_SPOKEN.join(', ');
  /** The word currently shown by the typing effect. The prerendered page starts on the first word. */
  protected readonly typed = signal(PROFILE.typedWords[0]);
  protected readonly drawn = signal(false);

  protected readonly heroLinks = profileLinks();

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const timers = new Set<ReturnType<typeof setTimeout>>();
      const later = (fn: () => void, ms: number) => timers.add(setTimeout(fn, ms));
      destroyRef.onDestroy(() => timers.forEach(clearTimeout));

      // The signature draws itself shortly after the page appears.
      later(() => this.drawn.set(true), 400);

      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Type out one word, wait, delete it, then move on to the next.
      const words = PROFILE.typedWords;
      let wordIndex = 0;
      let length = words[0].length;
      let deleting = true;
      const tick = () => {
        const word = words[wordIndex];
        length += deleting ? -1 : 1;
        this.typed.set(word.slice(0, length));
        let delay = deleting ? 55 : 95;
        if (!deleting && length === word.length) {
          deleting = true;
          delay = 1600;
        } else if (deleting && length === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          delay = 300;
        }
        later(tick, delay);
      };
      later(tick, 1800);
    });
  }
}
