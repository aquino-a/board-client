import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Member } from 'namespace';
import { RequestService } from './request.service';
import { environment } from '../environments/environment';

const PATH = environment.backend;
const AUTHPATH = PATH + '/oauth/authorize';
const TOKENPATH = PATH + '/oauth/token';
const AUTHORIZE = AUTHPATH + '?redirect_uri=' + environment.domain 
    +'/login&response_type=token&client_id=pizza';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    authenticated: boolean = false;
    member:Member;
    private token = '';
    admin: boolean = false;
    

    
    constructor(
        private http: HttpClient,
        private requestService: RequestService 
        ) {}

    authorize() {
//        let options = {
//            params: new HttpParams().set('','')
//
//        };
//        options.params.set('response_type','code');
//        options.params.set('client_id','pizza');
//        options.params.set('redirect_uri','localhost:4200/login');
//        let options1 = 'left=100,top=10,width=400,height=500';
        
        let newWindow = window.open(AUTHORIZE, '_self', 'location=no,height=300,width=520,scrollbars=no,status=no');
        console.log(newWindow.location.href);
//       this.http.get(
//          AUTHORIZE
//        ).subscribe(data => console.log(data));

    }
    
    setToken(token: string) {
        this.token = token;
        this.checkToken();
    }
    
    fetchToken(code: string) {
        let options = {
             params: new HttpParams(),
        };
        options.params = options.params
            .set('grant_type','authorization_code')
            .set('client_id','pizza')
            .set('code',code);
    }
    
//    fetchMember() : boolean {
//        this.requestService.getMember(this.token)
//            .subscribe(member => this.member = member);
//        return this.member != null;
//    }
    
    private checkToken(): void {
        this.requestService.getMember(this.token)
            .pipe(tap(data => console.log(data)))
            .subscribe(member => {
                if(member && member.username) {
                    this.authenticated = true;
                    this.member = member;
                    this.admin = this.checkAdmin();
                } else {
                    this.authenticated = false;
                    this.token = '';
                }
        });
    }
    
    getToken(): string {
        return this.token;
    }
    
    logOut() {
        this.token = '';
        this.authenticated = false;
        this.admin = false;
        this.member = null;
    }
    
    private checkAdmin() {
        if(!this.member) {
            return false;
        }
        return this.member.authorities
            .filter(role => role.role === 'ADMIN').length == 1;
    }
    
//    isAuthenticated() : boolean {
//        return this.authenticated;
//    }
    
    




}
