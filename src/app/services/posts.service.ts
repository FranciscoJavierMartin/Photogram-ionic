import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  pagePost = 0;

  constructor(private http: HttpClient) { }

  getPosts() {
    this.pagePost++;
    return this.http.get(`${URL}/posts/?page=${this.pagePost}`);
  }
}
