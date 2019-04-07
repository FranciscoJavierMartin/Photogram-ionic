import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { UIService } from 'src/app/services/ui.service';
import { User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal') slides: IonSlides;

  loginUser = {
    email: 'test@test.com',
    password: '123456'
  };

  registerUser: User = {
    email: 'test',
    password: '123456',
    name: 'test',
    avatar: 'av-1.png'
  };

  constructor(
    private userService: UserService,
    private navCtrl: NavController,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    if (fLogin.valid) {
      const valid = await this.userService.login(
        this.loginUser.email,
        this.loginUser.password
      );

      if (valid) {
        this.navCtrl.navigateRoot('/main/tabs/tab1', {
          animated: true
        });
      } else {
        this.uiService.alertInfo('User or password are wrong');
      }
    }
  }

  async register(fRegister: NgForm) {

    if(fRegister.valid){
      const valid = await this.userService.register(this.registerUser);

      if(valid){
        this.navCtrl.navigateRoot('/main/tabs/tab1',{
          animated: true
        });
      }else{
        this.uiService.alertInfo('Email had been register previously');
      }
    }
  }

  showRegisterSlide() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }

  showLoginSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }
}
