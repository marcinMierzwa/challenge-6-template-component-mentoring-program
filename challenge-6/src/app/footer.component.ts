import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <div class="container-fluid bg-body-tertiary p-3 text-center">
      <a
        class="link-dark text-decoration-none"
        href="https://www.lowgular.io"
        target="blank"
        >Lowgular</a
      >
    </div>
    <div
      class="container-fluid bg-body-tertiary p-3 text-center border border-0 border-top"
    >
      <p class="m-0">&#64; 2024 Company, Inc</p>
    </div>
  `,
})
export class FooterComponent {}
