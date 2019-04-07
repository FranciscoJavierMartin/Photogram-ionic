import { Component } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { NavController } from '@ionic/angular';
import { Geolocation} from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window:any;

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
              private geolocation: Geolocation,
              private camera: Camera){}

  async createPost(){
    const created = await this.postService.createPost(this.post);
    this.post = {
      message: '',
      coords: null,
      position: false
    };

    this.tempImages = [];

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

  takePhoto(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.processImage(options);
  }

  takeFromGallery(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.processImage(options);
  }

  processImage(options: CameraOptions){
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      this.postService.uploadImage(imageData);
      this.tempImages.push(img);
     }, (err) => {
      // Handle error
     });
  }
}
