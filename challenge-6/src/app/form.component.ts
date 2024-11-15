import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateEditArticle } from './app.component';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form
      class="bg-body-tertiary p-3 rounded"
      #form="ngForm"
      (ngSubmit)="create()"
    >
      <h2 class="fs-4 fw-medium text-center p-2">{{ articleMode }}</h2>

      <!-- image Url -->
      <div>
        <label for="imageUrl" class="form-label p-1">Image Url</label>
        <input
          type="text"
          name="imageUrl"
          class="form-control"
          id="imageUrl"
          aria-describedby="imageUrl"
          placeholder="Your Image"
          spellcheck="false"
          [(ngModel)]="createArticle.imageUrl"
          #imageUrl="ngModel"
          required
        />
        <div style="height: 2rem;">
          @if(imageUrl?.errors?.['required'] && imageUrl?.touched ) {
          <small id="imageUrl" class="form-text text-danger p-1 "
            >Image Url field is required.</small
          >
          }
        </div>
      </div>

      <!-- title -->
      <div>
        <label for="title" class="form-label p-1">Article Name</label>
        <input
          type="text"
          name="title"
          class="form-control"
          id="title"
          aria-describedby="title"
          placeholder="Your Title"
          spellcheck="false"
          [(ngModel)]="createArticle.title"
          #title="ngModel"
          required
        />
        <div style="height: 2rem;">
          @if(title?.errors?.['required'] && title?.touched ) {
          <small id="title" class="form-text text-danger p-1"
            >Article Name field is required.</small
          >
          }
        </div>
      </div>

      <!-- content -->
      <div class="mb-2">
        <label for="content" class="form-label p-1">Article Content</label>
        <textarea
          class="form-control"
          id="content"
          name="content"
          rows="10"
          placeholder="Your Content"
          spellcheck="false"
          [(ngModel)]="createArticle.content"
          #content="ngModel"
          required
        ></textarea>
        <div style="height: 2rem;">
          @if(content?.errors?.['required'] && content?.touched ) {
          <small id="content" class="form-text text-danger p-1"
            >Article Content field is required.</small
          >
          }
        </div>
      </div>

      <!-- submit -->
      <div class="d-flex justify-content-center gap-5 ">
        <button
          type="submit"
          class="btn btn-outline-dark"
          [disabled]="form.invalid"
        >
          Create
        </button>

        <ng-content></ng-content>
      </div>
    </form>
  `,
  styles: [
    `
      .ng-touched {
        border-color: rgb(255, 77, 77);
      }
      .ng-valid {
        border-color: rgb(0, 128, 0);
      }
    `,
  ],
})
export class FormComponent {
  @Input() articleMode = '';

  createArticle: CreateEditArticle = {
    imageUrl: '',
    title: '',
    content: '',
  };

  @Output() newArticle = new EventEmitter<CreateEditArticle>();

  create(): void {
    this.newArticle.emit(this.createArticle)
  }
}
