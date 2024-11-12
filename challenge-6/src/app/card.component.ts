import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
  <div class="card">
    <div class="card-body d-flex flex-column align-items-center gap-3 bg-light">
        <div style="height: 26px">
        <h2 class="card-title fs-4 text-center">{{ title }}</h2>
        </div>

        <div style="height: 300px; background: lightblue;">
        <img
        [src]="imageUrl"class="h-75 img-fluid object-fit-cover"alt="article image">
        </div>

        <p class="card-text">{{ content }}</p>
        <div class="d-flex justify-content-center gap-3">
          <button class="btn btn-outline-dark btn-sm">{{ btnLabel }}</button>
          <button class="btn btn-outline-dark btn-sm">Edit</button>
        </div>
    </div>
</div>
  `,
})
export class CardComponent {
    @Input() title = '';
    @Input() imageUrl = '';
    @Input() content = '';
    @Input() btnLabel = '';
}


