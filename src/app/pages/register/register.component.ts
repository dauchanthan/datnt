import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  emailPattern = '^[a-z][a-z0-9_.]+@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$';
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  error: any;
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  onRegister() {
    this.userService.getRegister(this.registerForm.value).subscribe(
      (data: any) => {
        localStorage.setItem('newEmail', data.email);
        this.router.navigate(['/login']);
        console.log(data);
      },
      (error) => {
        console.log(error);
        this.error = 'Email or Username have been already existed';
      }
    );
  }
}
