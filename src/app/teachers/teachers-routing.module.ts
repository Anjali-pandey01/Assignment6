import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { TeacherGuard } from './login/teacher.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', canActivate: [TeacherGuard], component: DashboardComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeachersRoutingModule { }
