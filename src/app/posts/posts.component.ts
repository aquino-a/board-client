import {Component, OnInit} from '@angular/core';
import {RequestService} from '../request.service';
import {RootObject, Content} from 'namespace';
import {catchError, map, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

    private username: string;

    postsInfo: RootObject;
    pages: Array<number>;
    size: number;
    currentPage: number;
    
    constructor(
        private requestService: RequestService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.setUsername();
        this.getPosts(0, 5);
    }

    private setUsername(): void {
        if (this.route.snapshot.paramMap.has('username')) {
            this.username = this.route.snapshot.paramMap.get('username');
        } else {
            this.username = null;
        }
        this.route.params.subscribe(params => {
            this.username = params['username'];
            this.getPosts(0,5);
        });
    }

    getPosts(page: number, size: number) {
        if (this.username) {
            this.requestService.getPostsByUser(page, size, this.username)
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










}
