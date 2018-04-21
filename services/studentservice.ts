import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Student } from "../models/student.model";

@Injectable()
export class StudentService {
    // url = "../assets/staticjsons/members.json";
    url = "http://10.19.203.12:8521/members.json";
    constructor(private http:HttpClient) {
    }
    getStudents(): Observable<any> {
        return this.http.get<Student>(this.url);
    }
}
