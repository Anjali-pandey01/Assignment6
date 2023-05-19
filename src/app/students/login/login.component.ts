import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/header/header.component';
import { User } from 'src/app/shared/models/user';
import { StudentApiService } from '../services/api/student-api.service';

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
        { path: '', label: 'Student Login' },
        { path: '../../teachers/login', label: 'Teacher Login' },
    ];

    constructor(private fb: FormBuilder, private studentAPI: StudentApiService, private router: Router) {
        this.userForm = this.fb.group({
            username: ['', [Validators.required, Validators.pattern(/^\w+$/)]],
            password: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        // if user already exists then navigate to student's dashboard
        if (localStorage.getItem('user') && (JSON.parse(localStorage.getItem('user') || "").user_type == 'student')) {
            window.location.replace('/students/check-result');
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
        this.studentAPI.getStudentByUsername(username.value).subscribe({
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
                    // On Authentication successF
                    // set user to local storage
                    localStorage.setItem('user', JSON.stringify(resp[0]));
                    //navigate user to teacher's dashboard
                    window.location.replace('/students/check-result');
                }
            },
            error: (err) => {
                alert("Some Error Occurred!");
            }
        });
    }
}
