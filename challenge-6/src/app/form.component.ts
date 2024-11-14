import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";

export interface CreateArticle {
    imageUrl: string;
    title: string;
    content: string;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  template: `
  <form class="bg-body-tertiary p-3 rounded" Form="ngForm" (ngSubmit)="create()">

  <h2 class="fs-4 fw-medium text-center p-2">{{ articleMode }}</h2>

  <div class="mb-3">
    <label for="imageUrl" class="form-label p-1">Image Url</label>
    <input type="text" class="form-control" id="imageUrl" aria-describedby="imageUrl">
    <small id="imageUrl" class="form-text text-danger p-1">Image Url field is required.</small>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label p-1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
    <small id="emailHelp" class="form-text text-danger p-1">We'll never share your email with anyone else.</small>
  </div>
  <div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label p-1">Example textarea</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="10"></textarea>
  <small id="emailHelp" class="form-text text-danger p-1">We'll never share your email with anyone else.</small>
</div>
    <ng-content></ng-content>

</form>

  `,
})

export class FormComponent {
    @Input() articleMode = '';

    createArticle: CreateArticle = {
        imageUrl: '',
        title: '',
        content: ''
    }

    create(): void {

    }
}