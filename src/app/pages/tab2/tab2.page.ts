import { Component } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { NavController } from '@ionic/angular';
import { Geolocation} from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  loadingGeolocation = false;

  tempImages: string[] = [];

  post: Post = {
    message: '',
    coords: null,
    position: false,
  };

  constructor(private postService: PostsService,
              private navCtrl: NavController,
              private geolocation: Geolocation){}

  async createPost(){
    const created = await this.postService.createPost(this.post);
    this.post = {
      message: '',
      coords: null,
      position: false
    };

    this.navCtrl.navigateRoot('/main/tabs/tab1');
  }

  getGeolocation(){
    if(this.post.position){
      this.loadingGeolocation = true;
      this.geolocation.getCurrentPosition().then(resp => {
        const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
        this.post.coords = coords;
      }).catch(error => {

      }).finally(() => {
        this.loadingGeolocation = false;
      });

    } else {
      this.post.coords = null;
    }
  }
}
