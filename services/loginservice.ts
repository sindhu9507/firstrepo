import {Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Login } from "../models/login.model";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
    url = "http://10.19.203.5:3000/members";
    // url = '../assets/staticjsons/members.json';
    constructor(private http:HttpClient) {
    }
    getMemberLogin(userlogin) {
        /* var options = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "username": userlogin.username,
                "password": userlogin.password
            })
        } */
        return this.http.get<Login>(this.url+"?username="+Number(userlogin.username)+"&password="+userlogin.password);
    }
}
