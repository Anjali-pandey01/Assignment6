import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/header/header.component';
import { User } from 'src/app/shared/models/user';
import { TeacherApiService } from '../services/api/teacher-api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    hidePassword = true;
    userForm: FormGroup;
    userError: any = { usernameError: '', passwordError: '' };

    navLinks = [
        { path: '../../students/login', label: 'Student Login' },
        { path: '', label: 'Teacher Login' },
    ];

    constructor(private fb: FormBuilder, private studentAPI: TeacherApiService, private router: Router) {
        this.userForm = this.fb.group({
            username: ['', [Validators.required, Validators.pattern(/^\w+$/)]],
            password: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        // if user already exists then navigate to teacher's dashboard
        if (localStorage.getItem('user') && (JSON.parse(localStorage.getItem('user') || "").user_type == 'teacher')) {
            window.location.replace('teachers/dashboard');
        }
    }

    onSubmit() {
        // verify user if form is valid
        if (this.userForm.valid) {
            this.verifyUser();
        }
    }
    // get username from form control
    get username() { return this.userForm.get('username'); }
    // get password from form control
    get password() { return this.userForm.get('password'); }

    verifyUser() {
        // get username from form control
        const username = this.userForm.controls['username'];
        // get password from form control
        const password = this.userForm.controls['password'];

        // call teacher API to get teacher login credentials
        this.studentAPI.getTeacherByUsername(username.value).subscribe({
            next: (resp) => {
                if (!resp[0]) {
                    // show error if response is null
                    this.userError['usernameError'] = "Username Does Not Exists!";
                    this.userForm.controls['username'].setErrors({ invalid: true });
                } else if (!(resp[0].password === password.value)) {
                    // show error if username & password not matched
                    this.userError['passwordError'] = "Incorrect Password!";
                    this.userForm.controls['password'].setErrors({ invalid: true });
                } else {
                    // On Authentication success
                    // set user to local storage
                    localStorage.setItem('user', JSON.stringify(resp[0]));
                    //navigate user to teacher's dashboard
                    window.location.replace('/teachers/dashboard');
                }
            },
            error: (err) => {
                //show if some error occurred
                alert("Some Error Occurred!");
            }
        });
    }
}
