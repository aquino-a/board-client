import {Component, OnInit} from '@angular/core';
import {RequestService} from '../request.service';
import {RootObject, Content} from 'namespace';
import {catchError, map, tap} from 'rxjs/operators';
import {interval, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../authentication.service';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

    private username: string;
    private search: string;

    postsInfo: RootObject;
    pages: Array<number>;
    size: number;
    currentPage: number;
    sub: Subscription;

    constructor(
        private requestService: RequestService,
        private route: ActivatedRoute,
        public authenticationService: AuthenticationService
    ) {}

    ngOnInit() {
        this.setUsername();
        this.getPosts(0, 5);
        this.sub = interval(1000 * 10 * 2,)
            .subscribe(() => {
                this.refresh();
            });
    }
    
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    
    refresh(): void {
        this.getPosts(this.currentPage,5);
    }
    
    

    private setUsername(): void {
        if (this.route.snapshot.paramMap.has('username')) {
            this.username = this.route.snapshot.paramMap.get('username');
        } else if (this.route.snapshot.paramMap.has('search')) {
            this.username = null;
            this.search = this.route.snapshot.paramMap.get('search');
        }
        this.route.params.subscribe(params => {
            this.username = params['username'];
            this.getPosts(0, 5);
        });
        this.route.params.subscribe(params => {
            this.search = params['search'];
            this.getPosts(0,5);
        });
    }

    getPosts(page: number, size: number) {
        if (this.username) {
            this.requestService.getPostsByUser(page, size, this.username)
                .pipe()
                .subscribe(info => {this.setupPage(info)});
        } else if(this.search) {
            this.requestService.getPostsBySearch(page, size, this.search)
                .pipe()
                .subscribe(info => {this.setupPage(info)});
        } else {
            this.requestService.getPosts(page, size)
                .pipe()
                .subscribe(info => {this.setupPage(info)});
        }

    }

    setupPage(info: RootObject) {
        this.postsInfo = info;
        this.pages = Array(info.totalPages);
        this.size = info.size;
        this.currentPage = info.pageable.pageNumber;

    }

    showButton(index: number): boolean {
        if (index == 0 ||
            index == this.pages.length - 1
        ) {
            return false;
        }

        let minNum = this.currentPage - 2;
        let maxNum = this.currentPage + 2;

        if (this.currentPage == 0) {
            return index < maxNum + 2;
        }
        if (this.currentPage == 1) {
            return index < maxNum + 1;
        }
        if (this.currentPage == this.pages.length - 1) {
            return index > minNum - 2;
        }
        if (this.currentPage == this.pages.length - 2) {
            return index > minNum - 1;
        }

        return (index > minNum && index < maxNum
            && index != 0);
    }

//    isAdmin(): boolean {
//        return this.authenticationService.member.authorities
//            .filter(role => role.role === 'ADMIN').length == 1;
//    }

    delete(id: number) {
        this.requestService
            .deletePost(this.authenticationService.getToken(),
                id)
            .pipe()
            .subscribe(_ => {this.getPosts(0,5)});;
    }










}
