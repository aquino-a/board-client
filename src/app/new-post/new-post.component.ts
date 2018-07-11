import {Component, OnInit} from '@angular/core';
import { RequestService } from '../request.service';


@Component({
    selector: 'app-new-post',
    templateUrl: './new-post.component.html',
    styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

    text: string;
    files: File[] = [];


    constructor(private requestService: RequestService) {}

    ngOnInit() {
    }

    setFiles(files: FileList) {
        this.files = [];
        for (let i = 0; i < files.length; i++) {
            this.files.push(files.item(i));
        }
    }
    
    onSubmit() {
        this.requestService.newPost(this.text,this.files);
    }

}
