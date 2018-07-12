import {Component, OnInit} from '@angular/core';
import {RequestService} from '../request.service';
import {AuthenticationService} from '../authentication.service';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
    selector: 'app-new-post',
    templateUrl: './new-post.component.html',
    styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

    private parentId: number;
    text: string;
    files: File[] = [];


    constructor(
        private requestService: RequestService,
        private authenticationService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute

    ) {}

    ngOnInit() {
        if (!this.authenticationService.authenticated) {
            this.router.navigateByUrl('/');
        }
        this.getParentId();

    }

    private getParentId() {
        if (+this.route.snapshot.paramMap.has('id')) {
            this.parentId = +this.route.snapshot.paramMap.get('id');
        }
    }

    setFiles(files: FileList) {
        this.files = [];
        for (let i = 0; i < files.length; i++) {
            this.files.push(files.item(i));
        }
    }

    onSubmit() {
        if (this.parentId) {
            this.requestService
                .newPost(this.text,
                    this.authenticationService.getToken(), this.files, this.parentId)
                .subscribe(data => this.goHome());
        } else {
            this.requestService
                .newPost(this.text,
                    this.authenticationService.getToken(), this.files)
                    .subscribe(data => this.goHome());
        }

        
    }
    
    private goHome() {
        this.router.navigateByUrl('/');
    }

}
