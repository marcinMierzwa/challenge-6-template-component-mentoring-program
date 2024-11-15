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

        <div class="w-100 d-flex justify-content-center bg-white border-top">
        <img
        [src]="imageUrl" 
        [hidden]="!showImage"
        class="w-50 img-fluid object-fit-cover py-3 " alt="article image"
        > 
        </div>

        <div class="border-bottom bg-white">
        <p class="card-text overflow-y-auto px-4 py-2 text-start" style="word-spacing: 0.5em; height: 300px">{{ content }}</p>
        </div>

        <ng-content></ng-content>

    </div>
</div>
  `,
})
export class CardComponent {
    @Input() title = "";
    @Input() imageUrl = "";
    @Input() content = "";
    @Input() showImage = false;

}

