import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path:"",
        redirectTo: 'students/login',
        pathMatch:'full'
    },
    {
        path: 'students',
        loadChildren: () => import('./students/students.module').then(m => m.StudentsModule)
    },
    {
        path: 'teachers',
        loadChildren: () => import('./teachers/teachers.module').then(m => m.TeachersModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
