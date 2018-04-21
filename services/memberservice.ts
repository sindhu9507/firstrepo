import {Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Teacher } from "../models/teacher.model";

@Injectable()
export class MemberService {
    // url = "../assets/staticjsons/members.json";
    url = "http://10.19.203.5:3000/members";
    constructor(private http:HttpClient) {
    }
    getTeachers(role) {
        return this.http.get<Teacher[]>(this.url+"?role="+role);
    }
    addTeacher(teacher) {
        return this.http.post<Teacher>(this.url, teacher);
    }
    updateTeacher(teacher) {
        return this.http.put<Teacher>(this.url+"/"+teacher.id, teacher);
    }
    deleteMember(id) {
        return this.http.delete(this.url+"/"+id);
    }
}
