import { Component } from "@angular/core";

@Component({
  selector: 'app-form',
  standalone: true,
  template: `
  <form class="bg-body-tertiary">

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text">We'll never share your email with anyone else.</small>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
    <small id="emailHelp" class="form-text">We'll never share your email with anyone else.</small>
  </div>
  <div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="12"></textarea>
  <small id="emailHelp" class="form-text">We'll never share your email with anyone else.</small>
</div>
  <button type="submit" class="btn btn-primary">Submit</button>

</form>

  `,
})

export class FormComponent {}