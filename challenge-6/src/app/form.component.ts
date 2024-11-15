import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

// https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg
export interface CreateEditArticle {
    title: string;
    imageUrl: string;
    content: string;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form
      class="bg-body-tertiary p-3 rounded"
      #form="ngForm"
      (ngSubmit)="submitForm(form)"
    >
      <h2 class="fs-4 fw-medium text-center p-2">{{ articleMode }}</h2>

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
          [(ngModel)]="imageUrl"
          (ngModelChange)="previewUpdate()"
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
          [(ngModel)]="title"
          (ngModelChange)="previewUpdate()"
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
      <div class="mb-2">
        <label for="contentInput" class="form-label p-1">Article Content</label>
        <textarea
          class="form-control"
          id="contentInput"
          name="contentInput"
          rows="10"
          placeholder="Your Content"
          spellcheck="false"
          [(ngModel)]="content"
          (ngModelChange)="previewUpdate()"
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
    @Input() imageUrl: string = '';
    @Input() title: string = '';
    @Input() content: string = '';
  
    @Output() newArticle = new EventEmitter();
  
    submitForm(form: NgForm): void {
      form.reset();
    }
  
    previewUpdate(): void {
      const article: CreateEditArticle = {
        title: this.title,
        imageUrl: this.imageUrl,
        content: this.content,
      };
      this.newArticle.emit(article);  // Emitowanie pełnego obiektu
    }
  }


// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';

// // https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg
// export interface CreateArticle {
//     title: '',
//     imageUrl: '',
//     content: '',
// }

// @Component({
//   selector: 'app-form',
//   standalone: true,
//   imports: [FormsModule],
//   template: `
//     <form
//       class="bg-body-tertiary p-3 rounded"
//       #form="ngForm"
//       (ngSubmit)="submitForm(form)"
//     >
//       <h2 class="fs-4 fw-medium text-center p-2">{{ articleMode }}</h2>

//       <!-- image Url -->
//       <div>
//         <label for="imageUrl" class="form-label p-1">Image Url</label>
//         <input
//           type="text"
//           name="imageUrl"
//           class="form-control"
//           id="imageUrl"
//           aria-describedby="imageUrl"
//           placeholder="Your Image"
//           spellcheck="false"
//           [(ngModel)]="createArticle.imageUrl"
//           (ngModelChange)="previewUpdate()"
//           #imageUrl="ngModel"
//           required
//         />
//         <div style="height: 2rem;">
//           @if(imageUrl?.errors?.['required'] && imageUrl?.touched ) {
//           <small id="imageUrl" class="form-text text-danger p-1 "
//             >Image Url field is required.</small
//           >
//           }
//         </div>
//       </div>

//       <!-- title -->
//       <div>
//         <label for="title" class="form-label p-1">Article Name</label>
//         <input
//           type="text"
//           name="title"
//           class="form-control"
//           id="title"
//           aria-describedby="title"
//           [value]="title"
//           spellcheck="false"
//           [(ngModel)]="createArticle.title"
//           (ngModelChange)="previewUpdate()"
//           #title="ngModel"
//           required
//         />
//         <div style="height: 2rem;">
//           @if(title?.errors?.['required'] && title?.touched ) {
//           <small id="title" class="form-text text-danger p-1"
//             >Article Name field is required.</small
//           >
//           }
//         </div>
//       </div>

//       <!-- content -->
//       <div class="mb-2">
//         <label for="content" class="form-label p-1">Article Content</label>
//         <textarea
//           class="form-control"
//           id="content"
//           name="content"
//           rows="10"
//           placeholder="Your Content"
//           spellcheck="false"
//           [(ngModel)]="createArticle.content"
//           (ngModelChange)="previewUpdate()"
//           #content="ngModel"
//           required
//         ></textarea>
//         <div style="height: 2rem;">
//           @if(content?.errors?.['required'] && content?.touched ) {
//           <small id="content" class="form-text text-danger p-1"
//             >Article Content field is required.</small
//           >
//           }
//         </div>
//       </div>

//       <!-- submit -->
//       <div class="d-flex justify-content-center gap-5 ">
//         <button
//           type="submit"
//           class="btn btn-outline-dark"
//           [disabled]="form.invalid"
//         >
//           Create
//         </button>

//         <ng-content></ng-content>
//       </div>
//     </form>
//   `,
//   styles: [
//     `
//       .ng-touched {
//         border-color: rgb(255, 77, 77);
//       }
//       .ng-valid {
//         border-color: rgb(0, 128, 0);
//       }
//     `,
//   ],
// })
// export class FormComponent {
//   @Input() articleMode = '';
//   @Input() title = 'my title'

//   createArticle: CreateArticle = {
//     imageUrl: '',
//     title: '',
//     content: '',
//   };

//   @Output() newArticle = new EventEmitter<CreateArticle>();

//   submitForm(form: NgForm): void {
//     form.reset();
//   }

//   previewUpdate(): void {
//     this.newArticle.emit(this.createArticle);
//   }
// }
