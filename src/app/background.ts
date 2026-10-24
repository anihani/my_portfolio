import { Component } from '@angular/core';
import { AWARDS, CERTIFICATIONS, EDUCATION, LANGUAGES_SPOKEN } from './data/profile';
import { Icon } from './icon';
import { Reveal } from './reveal';

/** Recognition and education in one place, so the menu stays short and the page has fewer stops. */
@Component({
  selector: 'app-background',
  imports: [Icon, Reveal],
  template: `
    <section class="block" id="background">
      <div class="container">
        <div class="section-head" appReveal><span class="section-num">04</span><h2 class="section-title">Background</h2></div>

        <h3 class="sub-head" appReveal>Recognition</h3>
        <div class="two-col">
          @for (award of awards; track award.title) {
            <div class="card award" appReveal>
              <div class="award-icon"><app-icon [name]="award.icon" /></div>
              <span class="kicker">{{ award.kicker }}</span>
              <h4>{{ award.title }}</h4>
              <p>{{ award.text }}</p>
            </div>
          }
        </div>

        <h3 class="sub-head" appReveal>Certifications</h3>
        <div class="cert-grid">
          @for (cert of certifications; track cert.title) {
            <div class="card cert" appReveal>
              <span class="skill-icon"><app-icon name="file-check" /></span>
              <div>
                <h4>{{ cert.title }}</h4>
                <span>{{ cert.issuer }}</span>
                @if (cert.url) {
                  <a class="cert-link" [href]="cert.url" target="_blank" rel="noopener">View certificate <app-icon name="external" /><span class="sr-only"> for {{ cert.title }} (opens in a new tab)</span></a>
                }
              </div>
            </div>
          }
        </div>

        <h3 class="sub-head" appReveal>Education</h3>
        <div class="card" appReveal>
          <div class="edu-list">
            @for (item of education; track item.title; let last = $last) {
              <div class="edu">
                <div>
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.place }}</p>
                </div>
                <span class="score">{{ item.score }}</span>
              </div>
              @if (!last) {
                <div class="sig-line" style="margin: 0"></div>
              }
            }
          </div>
          <div class="spoken">
            <h4>Languages spoken</h4>
            <ul class="chips">
              @for (language of languages; track language) {
                <li class="chip">{{ language }}</li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Background {
  protected readonly awards = AWARDS;
  protected readonly certifications = CERTIFICATIONS;
  protected readonly education = EDUCATION;
  protected readonly languages = LANGUAGES_SPOKEN;
}
