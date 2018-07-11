import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import { Router }          from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    code: string;
    token: string;
    
    constructor(
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
    }

    ngOnInit() {
//        this.code = this.getCode();
//        this.fetchToken(this.code);
        this.token = this.getToken();
        this.authenticationService.setToken(this.token);
        console.log("wtf.... router is " + this.router.url);
        this.router.navigateByUrl('/').catch(reason => console.log(reason));
    }
    
    private getToken(): string{
        let result = '';
        this.route.data.subscribe( (event) => {
            result = this.extractToken(window.location.href);
//            this.authenticationService.setToken(result);
        });
        return result;
    }
    
//    private getToken(): string {
//        let result: string;
//        this.route.queryParams.subscribe(params =>
//            result = params['access_token']
//        );
//        return result;
//    }
    
//    private fetchToken(code: string): void {
//        this.authenticationService.fetchToken(code);
//        
//    }
    
    private extractToken(href: string): string {
        let result = href;
        if (result.indexOf("access_token") == -1)
            return '';
        result = result.split("#")[1];
        let queries = result.split("&");
        for(let param of queries) {
            if (param.indexOf("access_token") != -1) {
                return param.split("=")[1];
            }
        } 
    }
    
}
