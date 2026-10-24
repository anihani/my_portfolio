import { Component, computed, input } from '@angular/core';

/** One drawing instruction: a path, a circle (cx, cy, r) or a rounded rectangle (x, y, width, height, radius). */
type Shape = { d: string } | { c: [number, number, number] } | { r: [number, number, number, number, number] };

const ICONS = {
  moon: [{ d: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' }],
  sun: [
    { c: [12, 12, 5] },
    { d: 'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' },
  ],
  menu: [{ d: 'M4 7h16M4 12h16M4 17h16' }],
  close: [{ d: 'M6 6l12 12M18 6 6 18' }],
  pin: [{ d: 'M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z' }, { c: [12, 10, 3] }],
  briefcase: [{ r: [2, 7, 20, 14, 2] }, { d: 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' }],
  'arrow-right': [{ d: 'M5 12h14M13 5l7 7-7 7' }],
  'arrow-up': [{ d: 'M12 19V5M5 12l7-7 7 7' }],
  code: [{ d: 'm16 18 6-6-6-6M8 6l-6 6 6 6' }],
  grid: [{ r: [3, 3, 7, 7, 1] }, { r: [14, 3, 7, 7, 1] }, { r: [3, 14, 7, 7, 1] }, { r: [14, 14, 7, 7, 1] }],
  wrench: [
    {
      d: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
    },
  ],
  design: [{ d: 'M12 19l7-7 3 3-7 7-3-3z' }, { d: 'M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z' }, { c: [11, 11, 2] }],
  'check-circle': [{ d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14' }, { d: 'M22 4 12 14.01l-3-3' }],
  'file-check': [{ d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }, { d: 'M14 2v6h6M9 15l2 2 4-4' }],
  medal: [{ c: [12, 8, 6] }, { d: 'M15.48 12.89 17 22l-5-3-5 3 1.52-9.11' }],
  trophy: [
    {
      d: 'M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2z',
    },
  ],
  tick: [{ d: 'M20 6 9 17l-5-5' }],
  sparkles: [{ d: 'M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z' }, { d: 'M19 3v4M17 5h4' }],
  smartphone: [{ r: [5, 2, 14, 20, 2] }, { d: 'M12 18h.01' }],
  heart: [{ d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' }],
  external: [{ d: 'M7 17 17 7M8 7h9v9' }],
  download: [{ d: 'M12 3v12M7 10l5 5 5-5M5 21h14' }],
  mail: [{ r: [3, 5, 18, 14, 2] }, { d: 'm3 7 9 6 9-6' }],
  message: [{ d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' }],
} satisfies Record<string, Shape[]>;

export type IconName = keyof typeof ICONS;

/** Inline SVG icon. It draws in the surrounding text colour, so it follows the theme. */
@Component({
  selector: 'app-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.stroke-width]="stroke()" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      @for (shape of shapes(); track $index) {
        @if ('d' in shape) {
          <path [attr.d]="shape.d" />
        } @else if ('c' in shape) {
          <circle [attr.cx]="shape.c[0]" [attr.cy]="shape.c[1]" [attr.r]="shape.c[2]" />
        } @else {
          <rect [attr.x]="shape.r[0]" [attr.y]="shape.r[1]" [attr.width]="shape.r[2]" [attr.height]="shape.r[3]" [attr.rx]="shape.r[4]" />
        }
      }
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly stroke = input(2);

  protected readonly shapes = computed<Shape[]>(() => ICONS[this.name()]);
}
