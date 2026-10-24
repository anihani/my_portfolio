import { Component } from '@angular/core';
import { Background } from './background';
import { Contact } from './contact';
import { Experience } from './experience';
import { Footer } from './footer';
import { Hero } from './hero';
import { Nav } from './nav';
import { ScrollUi } from './scroll-ui';
import { Skills } from './skills';
import { Toast } from './toast';
import { Work } from './work';

@Component({
  selector: 'app-root',
  imports: [Nav, Hero, Work, Experience, Skills, Background, Contact, Footer, ScrollUi, Toast],
  template: `
    <a class="skip" href="#top">Skip to content</a>
    <app-scroll-ui />
    <div class="bg-blobs" aria-hidden="true"><div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div></div>
    <app-nav />
    <main id="top">
      <app-hero />
      <app-work />
      <app-experience />
      <app-skills />
      <app-background />
      <app-contact />
    </main>
    <app-footer />
    <app-toast />
  `,
})
export class App {}
