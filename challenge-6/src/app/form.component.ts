import { Component, Input } from "@angular/core";
import { ArticleMode } from "./app.component";

@Component({
  selector: 'app-form',
  standalone: true,
  template: `
  <form class="bg-body-tertiary p-3 rounded">

  <h2 class="fs-4 fw-medium text-center p-2">{{ articleMode }}</h2>

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label p-1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text text-danger p-1">We'll never share your email with anyone else.</small>
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
<div class="d-flex justify-content-center gap-5 ">
          <button 
        type="submit"
        class="btn btn-outline-dark"
          >Create</button>
          <button type="button" data-bs-dismiss="modal" class="btn btn-danger">Cancel</button>
          </div>
</form>

  `,
})

export class FormComponent {
    @Input() articleMode = ArticleMode.INIT;
}