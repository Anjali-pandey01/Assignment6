import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StudentGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // check if user is set to localStorage & it is of student type
        if (localStorage.getItem('user') && (JSON.parse(localStorage.getItem('user') || "").user_type == 'student')) {
            return true;
        }

        this.router.navigate(['/students/login']);
        return false;
    }
}
