import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostsComponent} from '../posts/posts.component';
import {NewPostComponent} from '../new-post/new-post.component';
import {LoginComponent} from '../login/login.component';

const routes: Routes = [
    { path: 'posts', component: PostsComponent },
    { path: 'posts/:username', component: PostsComponent },
    { path: 'new', component: NewPostComponent },
    { path: 'new/:id', component: NewPostComponent },
    { path: "", redirectTo:"/posts", pathMatch: 'full'},
    { path: "login", component: LoginComponent },
];


@NgModule({
  exports: [RouterModule],
    imports: [
        RouterModule.forRoot(routes)
    ]
})
export class AppRoutingModule { }
