import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Class } from "../models/class.model";

@Injectable()
export class ClassService {
    // url = "../assets/staticjsons/classes.json";
    url = "http://10.19.203.7:8521/classes.json";
    constructor(private http:HttpClient) {
    }
    getClasses(): Observable<any> {
        return this.http.get<Class>(this.url);
    }
}
