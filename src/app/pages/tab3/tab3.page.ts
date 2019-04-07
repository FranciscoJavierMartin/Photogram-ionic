import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  user: User = {};

  constructor(private userService: UserService,
              private uiService: UIService,
              private postService: PostsService) {}

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  logout() {
    this.postService.resetPaginate();
    this.userService.logout();
  }

  update(fUpdate: NgForm) {
    if (fUpdate.valid) {
      const updated = this.userService.updateUser(this.user);

      if (updated) {
        this.uiService.presentToast('Update register');
      } else {
        this.uiService.presentToast('Update cannot be realized');
      }
    }
  }
}
