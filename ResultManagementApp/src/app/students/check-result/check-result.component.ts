import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StudentApiService } from '../services/api/student-api.service';
import { ResultDialogComponent } from './result-dialog/result-dialog.component';

@Component({
    selector: 'app-check-result',
    templateUrl: './check-result.component.html',
    styleUrls: ['./check-result.component.css']
})
export class CheckResultComponent implements OnInit {
    resultForm: FormGroup;
    resultError: any = { rollNoError: '', dobError: '' };

    constructor(private fb: FormBuilder, private studentAPI: StudentApiService, private datePipe: DatePipe, private dialog: MatDialog) {
        this.resultForm = this.fb.group({
            rollNo: ['', Validators.required],
            dob: ['', Validators.required]
        });
    }

    ngOnInit(): void {
    }

    onSubmit() {
        // check if form is valid
        if (this.resultForm.valid) {
            this.getStudentResult();
        }
    }

    getStudentResult() {
        // get roll no. from result form
        const rollNo = this.resultForm.get('rollNo')?.value;
        // get dob from result form & change it to local string
        const dob = new Date(this.resultForm.get('dob')?.value).toLocaleDateString();
        // call getResultByRollNo Method from student API
        this.studentAPI.getResultByRollNo(rollNo).subscribe({
            next: (resp) => {
                if (!resp[0]) {
                    // show error if entered roll no data is null
                    this.resultError['rollNoError'] = "Roll No. Not Found!";
                    this.resultForm.controls['rollNo'].setErrors({ invalid: true });
                } else if (!(resp[0].dob == dob)) {
                    // show error if roll no is not matched with dob
                    this.resultError['dobError'] = "Check Your D.O.B.!";
                    this.resultForm.controls['dob'].setErrors({ invalid: true });
                } else {
                    // open dialog after getting the result
                    this.dialog.open(ResultDialogComponent, {
                        width: '50%',
                        data:{
                            // set data for dialog
                            result: resp[0]
                        }
                    });
                }
            },
            error: (err) => {
                console.log(err);
            }
        })
    }
}
