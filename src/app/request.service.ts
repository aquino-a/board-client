import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {RootObject,Content,Member} from 'namespace';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
    
    domainPath = 'http://192.168.1.62:8084';
    
    
    constructor(private http: HttpClient) { }
    
    
    private getRequestNoToken<T>(path: string, params: {}): Observable<T> {
        return this.http.get<T>(this.domainPath +path,params)
            .pipe(tap(_ => console.log(`Request at ${path}`)));
    }
    
    private getRequestToken<T>(path: string, token:string, params: {headers?: HttpHeaders, params?: HttpParams}): Observable<T> {
        if(params.headers) {
            params.headers = params.headers.set('Authorization','Bearer ' + token);
        } else {
            params.headers = new HttpHeaders().set('Authorization','Bearer ' + token);
        }
        return this.http.get<T>(this.domainPath+path, params)
            .pipe(tap(_ => console.log(`Request at ${path} with token ${token}`)));
    }
    
    private postRequestToken(path: string, token: string, formData: FormData, params: {headers?: HttpHeaders, params?: HttpParams}) {
        if(params.headers) {
            params.headers = params.headers.set('Authorization','Bearer ' + token);
        } else {
            params.headers = new HttpHeaders().set('Authorization','Bearer ' + token);
        }
        this.http.post(this.domainPath+path, formData, params)
            .pipe(tap(_ => console.log(`Posting to ${path} with token ${token}`)))
            .subscribe((data) => {console.log(data)});
    }
    
    public newPost(text: string, token: string, files?: File[]) {
        let formData = new FormData();
        for(let file of files) {
            formData.append('files', file, file.name);
        }
        formData.set('text',text);
        
        this.postRequestToken('/posts/new',token, formData, {});
    }
    
    public getPosts(page: number, size: number): Observable<RootObject> {
        const options = {
            params: new HttpParams()

        };
        let params = new HttpParams()
            .append('page',String(page))
            .append('size',String(size));
//        params = params.append('page',String(page));
//        params = params.append('size',String(size));
        
        options.params = params;
        return this.getRequestNoToken<RootObject>("/posts", options);
        
    }
    
    public getMember(token: string): Observable<Member> {
        return this.getRequestToken<Member>('/posts/me', token,{});
    }
    
    public validToken(token: string): Observable<Response> {
        return this.getRequestToken<Response>('/posts/me', token, {});
    }
}
