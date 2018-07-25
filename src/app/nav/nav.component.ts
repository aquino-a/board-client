import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {RequestService} from '../request.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
    
    public query:string = '';
    
    constructor(
        public authenticationService: AuthenticationService,
        private requestService: RequestService
        ) {}

    ngOnInit() {
    }

    login() {
        this.authenticationService.authorize();
    }
    
    logOut() {
        this.requestService.logout(this.authenticationService.getToken());
            
        this.authenticationService.logOut();
    }
    
    onKey(query: string) {
        console.log(query);
        this.query = query;
    }
    
}
