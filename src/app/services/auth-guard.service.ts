import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from '../pages/user/user.service';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let url: string = state.url;
        let result = this.checkLogin(url);
        if (result) {
            if(localStorage.getItem('loginTimeMills')){
                return this.userService.getOwn().toPromise().then((response: any) => {
                    if (response === undefined || response === null || response.status === undefined) {
                        return false;
                    }
                    return response.status.name === 'active';
                })
            }
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }

    checkLogin(url: string): boolean {
        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;
        if (this.authService.isLoggedIn) {
            return true;
        } else {
            // Navigate to the login page with extras
            this.router.navigate(['/login']);
        }
        return false;
    }
}
