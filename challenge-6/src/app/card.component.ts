import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
  <div class="card p-0">
    <div class="card-body d-flex flex-column justify-content-between align-items-center gap-3 p-0">

        <div style="height: 70px" class="d-flex align-items-center justify-content-center w-100 border border-0 border-bottom bg-body-tertiary rounded">
        <h2 class="card-title fs-4 m-0 fw-medium text-center">{{ title }}</h2>
        </div>

        <div style="height: 250px;" class="w-75 d-flex justify-content-center bg-white">
        <img
        [src]="imageUrl"class="h-100 img-fluid object-fit-cover"alt="article image">
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


