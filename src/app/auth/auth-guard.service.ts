import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class Authguard implements CanActivate{
    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // if keep subscribing, may yield strange redirecting issue
        return this.authService.user.pipe(
            take(1),
            map(user => {
                // same as user != null ? true : false
                const isAuth = !!user;
                if (isAuth){
                    return true;
                }
                // redirect to authentication if can't login
                return this.router.createUrlTree(['/auth']);
            })
        )
    }
}