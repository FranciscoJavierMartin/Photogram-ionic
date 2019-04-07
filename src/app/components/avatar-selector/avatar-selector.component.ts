import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {

  @Output() avatarSelected = new EventEmitter<string>();
  @Input() currentAvatar = 'av-1.png';

  avatarSlide = {
    slidesPerView: 3.5
  };

  avatars = [
    {
      img: 'av-1.png',
      selected: true
    },
    {
      img: 'av-2.png',
      selected: false
    },
    {
      img: 'av-3.png',
      selected: false
    },
    {
      img: 'av-4.png',
      selected: false
    },
    {
      img: 'av-5.png',
      selected: false
    },
    {
      img: 'av-6.png',
      selected: false
    },
    {
      img: 'av-7.png',
      selected: false
    },
    {
      img: 'av-8.png',
      selected: false
    }
  ];


  constructor() { }

  ngOnInit() {
    this.avatars.forEach( avatar => avatar.selected = false);
    this.avatars.forEach( avatar => {
      if(avatar.img === this.currentAvatar){
        avatar.selected = true;
      }
    });

  }

  chooseAvatar(avatar) {
    this.avatars.forEach(av => (av.selected = false));
    avatar.selected = true;
    this.avatarSelected.emit(avatar.img);
  }
}
