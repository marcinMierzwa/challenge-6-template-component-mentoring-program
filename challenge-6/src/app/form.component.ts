import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article } from './models/article-model';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <ng-content></ng-content>

    <form
      class="bg-body-tertiary px-3 rounded rounded-top-0 border border-top-0 d-flex flex-column justify-content-between"
      #form="ngForm"
      (ngSubmit)="submitForm()"
    >
      <!-- image Url -->
      <div>
        <label for="imageUrlInput" class="form-label p-1">Image Url</label>
        <input
          type="text"
          name="imageUrlInput"
          class="form-control"
          id="imageUrlInput"
          aria-describedby="imageUrlInput"
          placeholder="Your Image"
          spellcheck="false"
          [(ngModel)]="articleData.imageUrl"
          (ngModelChange)="emitArticle()"
          #imageUrlInput="ngModel"
          required
        />
        <div style="height: 2rem;">
          @if(imageUrlInput?.errors?.['required'] && imageUrlInput?.touched ) {
          <small id="imageUrlInput" class="form-text text-danger p-1 "
            >Image Url field is required.</small
          >
          }
        </div>
      </div>

      <!-- title -->
      <div>
        <label for="titleInput" class="form-label p-1">Article Name</label>
        <input
          type="text"
          name="titleInput"
          class="form-control"
          id="titleInput"
          aria-describedby="titleInput"
          placeholder="Your Title"
          spellcheck="false"
          [(ngModel)]="articleData.title"
          (ngModelChange)="emitArticle()"
          #titleInput="ngModel"
          required
        />
        <div style="height: 2rem;">
          @if(titleInput?.errors?.['required'] && titleInput?.touched ) {
          <small id="title" class="form-text text-danger p-1"
            >Article Name field is required.</small
          >
          }
        </div>
      </div>

      <!-- content -->
      <div>
        <label for="contentInput" class="form-label p-1">Article Content</label>
        <textarea
          class="form-control h-75"
          id="contentInput"
          name="contentInput"
          rows="10"
          placeholder="Your Content"
          spellcheck="false"
          [(ngModel)]="articleData.content"
          (ngModelChange)="emitArticle()"
          #contentInput="ngModel"
          required
        ></textarea>
        <div style="height: 2rem;">
          @if(contentInput?.errors?.['required'] && contentInput?.touched ) {
          <small id="contentInput" class="form-text text-danger p-1"
            >Article Content field is required.</small
          >
          }
        </div>
      </div>

      <!-- submit -->
      <div class="d-flex justify-content-center gap-5 mb-3">
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
  @Input() articleData!: Article;
  @Output() sendArticlePreview = new EventEmitter();
  @Output() submitArticle = new EventEmitter();

  submitForm(): void {
    this.submitArticle.emit(this.articleData);
  }

  emitArticle(): void {
    this.sendArticlePreview.emit(this.articleData);
  }
}
