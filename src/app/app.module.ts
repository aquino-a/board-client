import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import {AppRoutingModule} from './app-routing/app-routing.module';
import {AppComponent} from './app.component';
import { PostsComponent } from './posts/posts.component';
import { NewPostComponent } from './new-post/new-post.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { UserPostsComponent } from './user-posts/user-posts.component';




@NgModule({
    declarations: [
        AppComponent,
        PostsComponent,
        NewPostComponent,
        LoginComponent,
        NavComponent,
        UserPostsComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}



