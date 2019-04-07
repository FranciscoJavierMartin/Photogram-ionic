import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: string = null;
  private user: User = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController
  ) {}

  login(email: string, password: string) {
    const data = { email, password };

    return new Promise(resolve => {
      this.http.post(`${URL}/user/login`, data).subscribe(async resp => {
        if (resp['ok']) {
          await this.saveToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  logout() {
    this.token = null;
    this.user = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', {animated: true});
  }

  register(user: User) {
    return new Promise(resolve => {
      this.http.post(`${URL}/user/create`, user).subscribe(async resp => {
        if (resp['ok']) {
          await this.saveToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
    await this.validToken();
  }

  async loadToken() {
    this.token = (await this.storage.get('token')) || null;
  }

  async validToken(): Promise<boolean> {
    let res: Promise<boolean>;
    await this.loadToken();

    if (this.token) {
      res = new Promise<boolean>(resolve => {
        const headers = new HttpHeaders({
          'x-token': this.token
        });
        this.http.get(`${URL}/user/`, { headers }).subscribe(resp => {
          if (resp['ok']) {
            this.user = resp['user'];
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }
        });
      });
    } else {
      this.navCtrl.navigateRoot('/login');
      res = Promise.resolve(false);
    }

    return res;
  }

  // If user has not id, go to login
  getUser() {
    if (!this.user._id) {
      this.validToken();
    }

    return { ...this.user };
  }

  updateUser(user: User) {
    const headers = new HttpHeaders({ 'x-token': this.token});

    return new Promise(resolve => {
      this.http.post(`${URL}/user/update`, user, {headers})
      .subscribe(resp => {
        if(resp['ok']){
          this.saveToken(resp['ok']);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });

  }
  
}
