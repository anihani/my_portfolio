import { Component } from '@angular/core';
import { CURRENT_ROLE_SKILLS, PROFILE, SKILLS } from './data/profile';
import { Icon } from './icon';
import { Reveal } from './reveal';

@Component({
  selector: 'app-skills',
  imports: [Icon, Reveal],
  template: `
    <section class="block" id="skills">
      <div class="container">
        <div class="section-head" appReveal><span class="section-num">03</span><h2 class="section-title">Skills</h2></div>
        <p class="section-intro" appReveal>{{ profile.principles }}</p>
        <p class="skill-legend" appReveal><span class="skill-dot" aria-hidden="true"></span> Used in my current role</p>
        <div class="skills-grid">
          @for (group of skills; track group.title) {
            <div class="card skill-card" appReveal>
              <h3>
                <span class="skill-icon"><app-icon [name]="group.icon" /></span>{{ group.title }}
              </h3>
              <ul class="chips">
                @for (item of group.items; track item) {
                  <li class="chip" [class.chip-now]="current.has(item)">
                    @if (current.has(item)) {
                      <span class="skill-dot" aria-hidden="true"></span>
                    }
                    {{ item }}
                    @if (current.has(item)) {
                      <span class="sr-only">(used in my current role)</span>
                    }
                  </li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Skills {
  protected readonly profile = PROFILE;
  protected readonly skills = SKILLS;
  protected readonly current = CURRENT_ROLE_SKILLS;
}
