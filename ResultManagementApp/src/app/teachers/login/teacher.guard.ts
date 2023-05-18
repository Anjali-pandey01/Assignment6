import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TeacherGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // check if user is set to localStorage & it is of teacher type
        if (localStorage.getItem('user') && (JSON.parse(localStorage.getItem('user') || "").user_type == 'teacher')) {
            return true;
        }

        this.router.navigate(['/teachers/login']);
        return false;
    }

}
