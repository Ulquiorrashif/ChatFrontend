import { Component } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {HttpService} from "../../services/http-service.service";
import {HttpClientModule} from "@angular/common/http";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ],
  providers:[HttpService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string | undefined;
  password: string | undefined;
  name:string | undefined;
  state:boolean =true;
  constructor(private service: HttpService) {
  }

  login(form :NgForm) {
    // console.log(form)
    this.service.login(form.value);
  }

  setState(state: boolean) {
    this.state=state
    console.log("change")
  }

  registration(registrationForm: NgForm) {
    this.service.registration(registrationForm.value);
  }
}
