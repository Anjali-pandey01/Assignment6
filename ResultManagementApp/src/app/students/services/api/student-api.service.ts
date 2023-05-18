import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from 'src/app/shared/models/result';
import { User } from '../../../shared/models/user';

@Injectable({
    providedIn: 'root'
})
export class StudentApiService {

    constructor(private httpClient: HttpClient) { }

    getStudentByUsername(username: string) {
        return this.httpClient.get<User[]>('http://localhost:3000/users?username=' + username + '&user_type=student');
    }

    getResultByRollNo(rollNo: number){
        return this.httpClient.get<Result[]>('http://localhost:3000/results?id=' + rollNo);
    }
}
