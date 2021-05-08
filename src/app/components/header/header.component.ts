import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private userService: UserService) {
    this.userService.getLoggedIn().subscribe((data) => (this.isLogged = data));
    this.userService.getImg().subscribe((data) => (this.image = data));
    this.userService.usernameObservable$.subscribe((username) => {
      this.username = username;
    });
  }
  isLogged: boolean;
  image: string;
  username: string;

  ngOnInit(): void {
    this.loggedImage();
    this.loggedIUser();
    this.logOut();
  }
  loggedIUser() {
    if (localStorage.getItem('username')) {
      this.userService.setUsername(localStorage.getItem('username'));
      this.userService.usernameObservable$.subscribe((username: string) => {
        this.username = username;
      });
    }
  }
  loggedImage() {
    if (localStorage.getItem('image') == 'null') {
      this.userService.setImg(
        'https://cdn1.vectorstock.com/i/thumb-large/22/05/male-profile-picture-vector-1862205.jpg'
      );
      this.userService.getImg().subscribe((image: string) => {
        this.image = image;
      });
    } else {
      this.userService.setImg(localStorage.getItem('image'));
      this.userService.getImg().subscribe((image: string) => {
        this.image = image;
      });
    }
  }
  logOut() {
    this.userService.destroyToken();
  }
}
