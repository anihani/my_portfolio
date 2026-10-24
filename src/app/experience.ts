import { Component } from '@angular/core';
import { JOBS } from './data/profile';
import { Reveal } from './reveal';

/** Where I have worked, newest first. The detail of each role is in Selected work. */
@Component({
  selector: 'app-experience',
  imports: [Reveal],
  template: `
    <section class="block" id="experience">
      <div class="container">
        <div class="section-head" appReveal><span class="section-num">02</span><h2 class="section-title">Experience</h2></div>
        <ol class="timeline timeline-compact">
          @for (job of jobs; track job.company) {
            <li class="job" [class.current]="job.current" appReveal>
              <div class="card">
                <div class="job-top">
                  <h3>
                    {{ job.company }}
                    @if (job.current) {
                      <span class="badge">CURRENT</span>
                    }
                  </h3>
                  <span class="date">{{ job.dates }}</span>
                </div>
                <p class="job-role">{{ job.role }}</p>
                <p class="job-summary">{{ job.summary }}</p>
                <a class="job-more" [href]="'#work-' + job.projectId">See what I built<span class="sr-only"> at {{ job.company }}</span> →</a>
              </div>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class Experience {
  protected readonly jobs = JOBS;
}
