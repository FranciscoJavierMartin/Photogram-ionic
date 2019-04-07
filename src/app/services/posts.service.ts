import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponsePosts, Post } from '../interfaces/interfaces';
import { UserService } from './user.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  pagePost = 0;

  newPost = new EventEmitter<Post>();

  constructor(private http: HttpClient,
              private userService: UserService ) { }

  getPosts(pull: boolean = false) {
    if ( pull ) {
      this.pagePost = 0;
    }
    this.pagePost++;
    return this.http.get<ResponsePosts>(`${URL}/posts/?page=${this.pagePost}`);
  }

  createPost(post){
    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });

    return new Promise(resolve => {
      this.http.post(`${URL}/posts`, post, {headers})
        .subscribe(resp => {
          this.newPost.emit(resp['post']);
          resolve(true);
        });
    });
  }
}
