import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {RootObject, Content, Member} from 'namespace';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    domainPath = environment.backend;
    path = environment.domain;

    constructor(private http: HttpClient) {}


    private getRequestNoToken<T>(path: string, params: {}): Observable<T> {
        return this.http.get<T>(this.domainPath + path, params)
            .pipe(tap(_ => console.log(`Request at ${path}`)));
    }

    private getRequestToken<T>(path: string, token: string, params: {headers?: HttpHeaders, params?: HttpParams}): Observable<T> {
        if (params.headers) {
            params.headers = params.headers.set('Authorization', 'Bearer ' + token);
        } else {
            params.headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        }
        return this.http.get<T>(this.domainPath + path, params)
            .pipe(tap(_ => console.log(`Request at ${path} with token ${token}`)));
    }

    private postRequestToken(path: string, token: string, formData: FormData, params: {headers?: HttpHeaders, params?: HttpParams}) {
        if (params.headers) {
            params.headers = params.headers.set('Authorization', 'Bearer ' + token);
        } else {
            params.headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        }
        return this.http.post(this.domainPath + path, formData, params)
            .pipe(tap(_ => console.log(`Posting to ${path} with token ${token}`)));
    }

    private delete(path: string, token: string, params: {headers?: HttpHeaders, params?: HttpParams}) {
        if (params.headers) {
            params.headers = params.headers.set('Authorization', 'Bearer ' + token);
        } else {
            params.headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        }
        return this.http.delete(this.domainPath + path, params)
            .pipe(tap(_ => console.log(`Deleting at ${path} with token ${token}`)));
    }

    public newPost(text: string, token: string, files?: File[], parentId?: number) {
        let formData = new FormData();
        for (let file of files) {
            formData.append('files', file, file.name);
        }
        formData.set('text', text);
        if (parentId) {
            //TODO real param name
            formData.set('parentId', String(parentId));
        }
        return this.postRequestToken('/posts/new', token, formData, {});
    }

    public getPostsByUser(page: number, size: number, username: string): Observable<RootObject> {
        return this.getPostsBasic(page, size, "/posts/user/" + username);
    }
    public getPosts(page: number, size: number): Observable<RootObject> {
        return this.getPostsBasic(page, size, "/posts");
    }

    private getPostsBasic(page: number, size: number, path: string): Observable<RootObject> {
        const options = {
            params: new HttpParams()

        };
        let params = new HttpParams()
            .append('page', String(page))
            .append('size', String(        size));
//        params = params.append('page',String(        page));
//        params = params.append('size',String(size));

        options.params = params;
        return this.getRequestNoToken<RootObject>(path, options);

    }
    
    public getPostsBySearch(page: number, size: number, search: string) {
        return this.getPostsBasic(page, size, "/posts/search?search=" + search);
    }

    public getMember(token: string): Observable<Member> {
        return this.getRequestToken<Member>('/posts/me', token, {});
    }

    public deletePost(token: string, id: number) {
        return this.delete('/posts/' + String(id), token, {});
    }

    public validToken(token: string): Observable<Response> {
        return this.getRequestToken<Response>('/posts/me', token, {});
    }

    public logout(token: string) {
        window.open(this.domainPath + "/users/logout?redirect_url="+this.path, '_self', 'location=no,height=300,width=520,scrollbars=no,status=no');
    }
}
