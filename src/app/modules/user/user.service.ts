import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUserLogin, IUserRegister } from 'src/app/models/user.module';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {
    this.setLoggedIn(localStorage.getItem('access_token') !== null);
  }
  private API = 'http://localhost:8000/api/users';
  bool$ = new BehaviorSubject<boolean>(true);
  image$ = new Subject<string>();
  username = new Subject<string>();
  usernameObservable$ = this.username.asObservable();
  getLogIn(user: IUserLogin) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.API + '/login', user, { headers });
  }
  getRegister(user: IUserRegister) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.API + '/register', user, { headers });
  }
  setToken(token: string) {
    localStorage.setItem('access_token', token);
  }
  LoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
  removeToken() {
    localStorage.removeItem('access_token');
  }
  setLoggedIn(bool: boolean) {
    this.bool$.next(bool);
  }
  getLoggedIn() {
    return this.bool$;
  }
  setImg(img: string) {
    localStorage.setItem('img', img);
    this.image$.next(img);
  }
  getImg() {
    return this.image$;
  }
  setUsername(username: string) {
    localStorage.setItem('username', username);
    this.username.next(username);
  }

  loginToken(token) {
    localStorage.setItem('access_token', token);
    this.router.navigate(['/product']);
    this.setLoggedIn(localStorage.getItem('access_token') !== null);
  }

  destroyToken() {
    this.removeToken();
    // localStorage.removeItem('access_token');
    localStorage.removeItem('image');

    this.router.navigate['/login'];
    this.setLoggedIn(localStorage.getItem('access_token') !== null);
  }
}
