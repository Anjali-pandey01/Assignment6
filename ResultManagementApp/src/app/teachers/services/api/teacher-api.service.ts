import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from 'src/app/shared/models/result';
import { User } from 'src/app/shared/models/user';

@Injectable({
    providedIn: 'root'
})
export class TeacherApiService {

    constructor(private httpClient: HttpClient) { }

    getTeacherByUsername(username: string) {
        return this.httpClient.get<User[]>('http://localhost:3000/users?username=' + username + '&user_type=teacher');
    }

    getAllResults(){
        return this.httpClient.get<Result[]>('http://localhost:3000/results');
    }

    getResultByRollNo(rollNo: number){
        return this.httpClient.get<Result[]>('http://localhost:3000/results?id=' + rollNo);
    }

    addResult(result: Result){
        return this.httpClient.post<Result>('http://localhost:3000/results', result);
    }

    updateResult(result: Result){
        console.log(result.id);
        return this.httpClient.put<Result>('http://localhost:3000/results/'+result.id, result);
    }

    deleteResult(id: number){
        return this.httpClient.delete('http://localhost:3000/results/' + id);
    }
}
