import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckResultComponent } from './check-result/check-result.component';
import { StudentGuard } from './login/student.guard';

import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: 'login',  component: LoginComponent },
    { path: 'check-result', canActivate: [StudentGuard], component: CheckResultComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentsRoutingModule { }
