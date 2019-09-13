import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponse } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PlaceHolderDirective } from '../shared/place-holder.directive';
import { ErrorComponent } from '../shared/error/error.component';

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
  @ViewChild(PlaceHolderDirective, {static: false}) alertHost: PlaceHolderDirective;

  constructor(private authService: AuthService, private route: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

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
        const userId = responseData.localId;

        this.route.navigate(['user/' + userId + '/jobs']);
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
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ErrorComponent);

    // the place to be injected
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    // clear anything that was rendered 
    hostViewContainerRef.clear();

    let alertComponentRef = hostViewContainerRef.createComponent(alertComponentFactory);

    alertComponentRef.instance.message = message;
  }


}
