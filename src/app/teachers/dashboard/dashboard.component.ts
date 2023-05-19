import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Result } from 'src/app/shared/models/result';
import { TeacherApiService } from '../services/api/teacher-api.service';
import { ResultFormDialogComponent } from './result-form-dialog/result-form-dialog.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    // Table columns
    displayedColumns: string[] = ['id', 'name', 'dob', 'score', 'action'];
    results: Result[] = [];
    // DataSource for MatTable
    dataSource = new MatTableDataSource<Result>(this.results);

    constructor(private teacherAPIService: TeacherApiService, private dialog: MatDialog) {

    }

    ngOnInit(): void {
        // call getAllResult API to get all results in database
        this.teacherAPIService.getAllResults().subscribe({
            next: (resp) => {
                // set results
                this.results = resp;
                // update table datasource
                this.updateTable();
            },
            error: (err) => {
                // Show if an error occurred
                alert("Some Error Occurred!");
            }
        });
    }

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    updateTable() {
        // set the datasource to results
        this.dataSource.data = this.results;
        // set paginator for the table
        this.dataSource.paginator = this.paginator;
    }

    addResult() {
        // open dialog with POST request
        this.dialog.open(ResultFormDialogComponent, {
            width: '80%',
            data: {
                title: 'Add Result',
                request: 'post'
            }
        });
    }

    updateResult(data: Result) {
        // open dialog with PUT request & result data
        this.dialog.open(ResultFormDialogComponent, {
            width: '80%',
            data: {
                title: 'Update Result',
                request: 'put',
                result: data
            }
        });
    }

    deleteResult(data: Result) {
        // call delete result API to delete data with id
        this.teacherAPIService.deleteResult(data.id).subscribe({
            next: (resp) => {
                // after success reload the page
                window.location.reload();
            },
            error: (err) => {
                // show if error occurred
                alert("Some Error Occurred!");
            }
        })
    }
}
