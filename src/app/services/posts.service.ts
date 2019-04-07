import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponsePosts, Post } from '../interfaces/interfaces';
import { UserService } from './user.service';
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  pagePost = 0;

  newPost = new EventEmitter<Post>();

  constructor(private http: HttpClient,
              private userService: UserService,
              private fileTransfer: FileTransfer ) { }

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

  uploadImage(img: string){
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.userService.token
      }
    };

    const fileTransfetObject: FileTransferObject = this.fileTransfer.create();
    fileTransfetObject.upload(img, `${URL}/posts/upload`, options)
      .then(data => {

      }).catch(err => {

      });
  }

  resetPaginate(){
    this.pagePost = 0;
  }
}
