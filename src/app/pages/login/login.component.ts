import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserLogin, User } from 'src/app/models/user.module';
import { UserService } from 'src/app/modules/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  emailPattern = '^[a-z][a-z0-9_.]+@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$';
  error: any;
  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    if (localStorage.getItem('')) {
      this.registerForm = this.fb.group({
        email: [
          localStorage.getItem('newEmail'),
          [Validators.required, Validators.pattern(this.emailPattern)],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
      });
    } else {
      this.registerForm = this.fb.group({
        email: [
          '',
          [Validators.required, Validators.pattern(this.emailPattern)],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
      });
    }
  }
  onLogin() {
    this.userService.getLogIn(this.registerForm.value).subscribe(
      (data: User) => {
        const token = data.token;
        if (!!this.registerForm.value && !!token) {
          this.userService.loginToken(data.token);
          this.userService.setImg(data.image);
          this.userService.setUsername(data.username);
        }
        console.log(data);
      },
      (error) => {
        this.error = error.error.errors['email or password'][0];
      }
    );
  }
}
