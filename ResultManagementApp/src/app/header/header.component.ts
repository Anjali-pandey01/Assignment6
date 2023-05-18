import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    showLogout = 'hidden';

    constructor() {
    }

    ngOnInit(): void {
        if (localStorage.getItem('user')) {
            this.showLogout = 'visible';
        }
    }

    logoutUser() {
        localStorage.clear();
        this.showLogout = 'hidden';
        window.location.reload();
    }
}
