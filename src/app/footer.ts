import { Component } from '@angular/core';
import { PROFILE } from './data/profile';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <span class="sig">{{ profile.name }}</span>
      {{ profile.footerLine }} · © {{ year }}
    </footer>
  `,
})
export class Footer {
  protected readonly profile = PROFILE;
  protected readonly year = new Date().getFullYear();
}
