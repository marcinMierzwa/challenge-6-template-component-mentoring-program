import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
  
  <div class="card p-0 overflow-y-auto bg-body-tertiary rounded">
    
    <div class="card-body d-flex flex-column align-items-center p-0 ">

        <div style="height: 70px" class="d-flex align-items-center justify-content-center w-100 border-0 p-2">
        <h2 class="card-title fs-4 m-0 fw-normal text-center">{{ title }}</h2>
        </div>

        <div class="w-100 d-flex justify-content-center bg-white">
        <img
        [src]="imageUrl" 
        [hidden]="!showImage"
        class="w-50 img-fluid object-fit-cover py-3" alt="article image"
        > 
        </div>

        <div class="border bg-white">
        <p class="card-text overflow-y-auto px-4 py-2 text-start" style="word-spacing: 0.5em; height: 300px">{{ content }}</p>
        </div>


        <div class="d-flex justify-content-center gap-3 my-3 ">
          <button 
          class="btn btn-outline-dark btn-sm"
          (click)="onShowImageButtonClick(id)"
          >{{ btnLabel }}
          </button>
          <button class="btn btn-outline-dark btn-sm">Edit</button>
        </div>

    </div>
</div>
  `,
})
export class CardComponent {
    @Input() title!: string;
    @Input() imageUrl = '';
    @Input() content = '';
    @Input() id!: number;
    @Input() btnLabel = '';
    @Input() showImage!: boolean;

    @Output() clickEvent = new EventEmitter();

    onShowImageButtonClick(id: number): void{
        this.clickEvent.emit(id);
    }
}


// [class.invisible]="!showImage"


