
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeacherApiService } from '../../services/api/teacher-api.service';

@Component({
    selector: 'app-result-form-dialog',
    templateUrl: './result-form-dialog.component.html',
    styleUrls: ['./result-form-dialog.component.css']
})
export class ResultFormDialogComponent implements OnInit {
    resultForm: FormGroup;
    resultFormError: any = { idError: '', nameError: '', dobError: '', scoreError: '' };
    date: Date = new Date();

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private teacherAPIService: TeacherApiService) {

        if (data.result) {
            const dateString = data.result.dob.split('/');
            this.date = new Date(dateString[2], dateString[1] - 1, dateString[0]);
        }
        this.resultForm = this.fb.group({
            id: [(data.result ? data.result.id : ''), [Validators.required, Validators.pattern(/^\d+$/)]],
            name: [(data.result ? data.result.name : ''), [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
            dob: [this.date, Validators.required],
            score: [(data.result ? data.result.score : ''), [Validators.required, Validators.pattern(/^\d+$/)]],
        });

        if (data.result)
            this.resultForm.controls['id'].disable();
    }

    ngOnInit(): void {
    }

    onSubmit() {
        if (this.resultForm.valid) {
            // Get the result of the student
            this.teacherAPIService.getResultByRollNo(this.resultForm.controls['id'].value).subscribe({
                next: (resp) => {
                    // check if the request is a POST or PUT request
                    if (this.data.request == 'post') {
                        // check if the response is not null
                        if (!resp[0]) {
                            // get all the form data
                            const formData = this.resultForm.value;
                            // change the Date to LocalString
                            formData.dob = new Date(this.resultForm.get('dob')?.value).toLocaleDateString();
                            // add result to json-server
                            this.teacherAPIService.addResult(formData).subscribe({
                                next: (respRes) => {
                                    // reload the page after success
                                    window.location.reload();
                                },
                                error: (errRes) => {
                                    // show error if some error occurred
                                    alert("Some Error Occurred!");
                                }
                            });
                        } else {
                            // if roll no. already exists in the database show error
                            this.resultFormError['idError'] = "Roll No. Already Exists in Database!";
                            this.resultForm.controls['id'].setErrors({ invalid: true });
                        }

                    } else if (this.data.request == 'put') {
                        // check if response is not null
                        if (resp[0]) {
                            // get all the form data
                            const formData = this.resultForm.value;
                            // change date to localString
                            formData.dob = new Date(this.resultForm.get('dob')?.value).toLocaleDateString();
                            // set the id attribute for form
                            formData.id = this.resultForm.controls['id'].value;
                            // call updateResult API
                            this.teacherAPIService.updateResult(formData).subscribe({
                                next: (respRes) => {
                                    // reload page on success
                                    window.location.reload();
                                },
                                error: (errRes) => {
                                    // show error on error occurance
                                    alert("Some Error Occurred!");
                                }
                            });
                        } else {
                            // show error if id does not exists in database
                            this.resultFormError['idError'] = "Roll No. Does Not Exists in Database!";
                            this.resultForm.controls['id'].setErrors({ invalid: true });
                        }
                    }
                },
                error: (err) => {
                    alert("Some Error Occurred!");
                }
            });
        }
    }
}
