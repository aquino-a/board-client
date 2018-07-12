import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { RequestService } from '../request.service';
import {RootObject} from 'namespace';
@Component({
    selector: 'app-user-posts',
    templateUrl: './user-posts.component.html',
    styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

    username: string;
    postsInfo: RootObject;
    pages: Array<number>;
    size: number;
    currentPage:number;
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private requestService: RequestService
    ) {}

    ngOnInit() {
        this.setUsername();
        this.getPosts(0,5);
    }
    
    private setUsername(): void {
        if (this.route.snapshot.paramMap.has('username')) {
            this.username = this.route.snapshot.paramMap.get('username');
        } else {
            this.router.navigateByUrl('/');
        }
    }
    
    getPosts(page: number, size: number) {
        this.requestService.getPostsByUser(page, size, this.username)
            .pipe()
            .subscribe(info => {this.setupPage(info)});
    }
    
    private setupPage(info: RootObject) {
        this.postsInfo = info;
        this.pages = Array(info.totalPages);
        this.size = info.size;
        this.currentPage = info.pageable.pageNumber;
    }
}
