import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  posts: Post[] = [];
  enabled = true;

  constructor(private postsService: PostsService){}

  ngOnInit(){
    this.next();
    this.postsService.newPost
      .subscribe(post => {
        this.posts.unshift(post);
      });
  }

  doRefresh(event){
    this.next(event, true);
  }

  next(event?, pull: boolean = false){

    if (pull) {
      this.enabled = true;
      this.posts = [];
    }
    this.postsService.getPosts(pull)
    .subscribe(resp => {
      this.posts.push(...resp.posts);

      if (event) {
        event.target.complete();

        if (resp.posts.length === 0) {
          this.enabled = false;
        }

      }

    });
  }
}
