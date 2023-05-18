import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { StudentsRoutingModule } from './students-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckResultComponent } from './check-result/check-result.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ResultDialogComponent } from './check-result/result-dialog/result-dialog.component';
import { HeaderComponent } from '../header/header.component';


@NgModule({
    declarations: [
        LoginComponent,
        CheckResultComponent,
        ResultDialogComponent,
    ],
    imports: [
        CommonModule,
        StudentsRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule
    ]
})

export class StudentsModule {
    constructor() {

    }
}

