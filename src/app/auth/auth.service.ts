import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  API_KEY = 'AIzaSyCWmq4zRp-g4exsqaXnHFmabQcf45vKhKc';
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) { }


  logIn(email: string, password: string) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      },
      {
        responseType: 'json'
      }
    ).pipe(
      catchError(
        this.handleError
      ), tap(
        responseData => {
          this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        }
      )
    )
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(
        this.handleError
      ),
      tap(
        responseData => {
          this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        }
      )
    );
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {

    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const currentUser = new User(email, userId, token, expirationDate);
    this.user.next(currentUser);

    localStorage.setItem('job-tracker-userData', JSON.stringify(currentUser));
  }

  autoLogin() {

    const userData: {
      email: string;
      id: string;
      token: string;
      tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('job-tracker-userData'));
    if (!userData) {
      return;
    } else {
      const loadedUser = new User(userData.email, userData.id, userData.token, new Date(userData.tokenExpirationDate));
      if (loadedUser.getToken) {
        this.user.next(loadedUser);
        const expirationDuration = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogOut(expirationDuration);
      } else {
        return;
      }
    }
  }

  logOut(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('job-tracker-userData');

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogOut(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(
      () => {
        this.logOut();
      }, expirationDuration
    )
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured';
    console.log(errorRes);

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'The email does not exists';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The email/password does not match'
    }
    return throwError(errorMessage);
  }
}
