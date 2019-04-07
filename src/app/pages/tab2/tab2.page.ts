import { Component } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];

  post: Post = {
    message: '',
    coords: null,
    position: false,
  };

  constructor(private postService: PostsService,
              private navCtrl: NavController){}

  async createPost(){
    const created = await this.postService.createPost(this.post);
    this.post = {
      message: '',
      coords: null,
      position: false
    };

    this.navCtrl.navigateRoot('/main/tabs/tab1');
  }
}
