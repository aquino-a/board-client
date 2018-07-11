import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const PATH = 'http://192.168.1.62:8084';
const AUTHPATH = PATH + '/oauth/authorize';
const TOKENPATH = PATH + '/oauth/token';
const AUTHORIZE = AUTHPATH +'?redirect_uri=http://localhost:4200/login&response_type=token&client_id=pizza';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    authorized: boolean = false;
    token = '';
    

    
    constructor(private http: HttpClient) {}

    authorize() {
        let options = {
            params: new HttpParams().set('','')

        };
        options.params.set('response_type','code');
        options.params.set('client_id','pizza');
        options.params.set('redirect_uri','localhost:4200/login');
        let options1 = 'left=100,top=10,width=400,height=500';
        
        let newWindow = window.open(AUTHORIZE, '_self', 'location=no,height=300,width=520,scrollbars=no,status=no');
        console.log(newWindow.location.href);
//       this.http.get(
//          AUTHORIZE
//        ).subscribe(data => console.log(data));

    }
    
    setToken(token: string) {
        this.token = token;
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
    
    checkToken() : boolean {
        if (this.token.length < 20) {
            return false;
        }
        
        //TODO do this
        
        
    }
    
    getToken(): string {
        return this.token;
    }
    
    




}
