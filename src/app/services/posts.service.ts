import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponsePosts } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  pagePost = 0;

  constructor(private http: HttpClient) { }

  getPosts(pull: boolean = false) {
    if ( pull ) {
      this.pagePost = 0;
    }
    this.pagePost++;
    return this.http.get<ResponsePosts>(`${URL}/posts/?page=${this.pagePost}`);
  }
}
