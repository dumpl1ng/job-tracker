import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponse } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  private isLogInMode = false;
  private email: string;
  private password: string;
  private isLoading = false;
  private authObs: Observable<AuthResponse>;

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  // submit form data to login or sign up
  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    this.email = form.value.email;
    this.password = form.value.password;

    this.isLoading = true;
    if(this.isLogInMode){
      this.authObs =  this.authService.logIn(this.email, this.password);
    } else {
      this.authObs = this.authService.signUp(this.email, this.password);
    }


    this.authObs.subscribe(
      responseData => {
        this.isLoading = false;
        alert('authentication success');
      },
      error => {
        this.isLoading = false;
        this.showError(error);
      }
    )

    form.reset();

  }

  changeToLogInMode(){
    this.isLogInMode = true;
  }

  changeToSignUpMode(){
    this.isLogInMode = false;
  }

  showError(message: string){
    alert(message);
  }


}
