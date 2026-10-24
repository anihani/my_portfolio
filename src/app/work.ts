import { Component } from '@angular/core';
import { PROJECTS } from './data/profile';
import { Icon } from './icon';
import { Reveal } from './reveal';

/** The work, told one product at a time: what it is, what I did, what it was built with. */
@Component({
  selector: 'app-work',
  imports: [Icon, Reveal],
  template: `
    <section class="block" id="work">
      <div class="container">
        <div class="section-head" appReveal><span class="section-num">01</span><h2 class="section-title">Selected work</h2></div>
        <div class="work-grid">
          @for (project of projects; track project.id) {
            <article class="card project" [class.project-wide]="!!project.shots" [id]="'work-' + project.id" appReveal>
              <div class="project-cover" aria-hidden="true"><app-icon [name]="project.icon" /></div>
              <p class="project-kicker">{{ project.kicker }}</p>
              <h3>{{ project.title }}</h3>
              <p class="project-summary">{{ project.summary }}</p>
              <p class="project-role"><strong>My role:</strong> {{ project.role }}</p>
              <ul>
                @for (point of project.points; track point) {
                  <li>{{ point }}</li>
                }
              </ul>
              <div class="chips">
                @for (tech of project.tech; track tech) {
                  <span class="chip">{{ tech }}</span>
                }
              </div>
              @if (project.shots; as shots) {
                <div class="shots" role="group" aria-label="Screenshots of live sites">
                  @for (shot of shots; track shot.url) {
                    <figure class="shot">
                      <a [href]="shot.url" target="_blank" rel="noopener">
                        <img [src]="shot.src" [alt]="shot.alt" width="800" height="500" loading="lazy" decoding="async" />
                        <span class="sr-only">Visit {{ shot.label }} (opens in a new tab)</span>
                      </a>
                      <figcaption>{{ shot.label }}</figcaption>
                    </figure>
                  }
                </div>
                <p class="shots-note">Live sites as they look today, so later changes by others may show.</p>
              }
              <div class="project-links">
                @for (link of project.links; track link.url) {
                  <a [href]="link.url" target="_blank" rel="noopener">{{ link.label }} <app-icon name="external" /><span class="sr-only">(opens in a new tab)</span></a>
                }
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class Work {
  protected readonly projects = PROJECTS;
}
