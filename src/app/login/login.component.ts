import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogin: boolean;
  userFlag: boolean;
  constructor(
    private us: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLogin = true;
    this.userFlag = false;
  }

  changeSignType(eventType) {
    this.isLogin = eventType === 'login' ? true : false;
  }

  checkForUser(userName) {
    if (!this.isLogin) {
      this.us.checkUser({ userName }).subscribe((res) => {
        if (res['message'] == 'Username already present') {
          this.userFlag = true;
        } else {
          this.userFlag = false;
        }
      });
    }
  }

  onSubmit(formRef) {
    if (formRef.valid) {
      if (this.isLogin) {
        this.us.loginUser(formRef.value).subscribe((res) => {
          if (res['message'] == 'Please enter Username') {
            this.toastr.warning(res.message);
          } else if (res['message'] == 'Username not found') {
            this.toastr.warning(
              'Please check username or sign up to continue',
              'Username not found'
            );
            formRef.reset();
          } else if (res['message'] == 'Invalid password') {
            this.toastr.warning('Please enter correct password');
            formRef.controls.password.reset();
          } else if (res['message'] == 'login successful') {
            this.toastr.success('Login Successful');
            localStorage.setItem('token', res['token']);
            localStorage.setItem('userName', res['userName']);
            if (res['userTypeAdmin']) {
              this.router.navigateByUrl('/admin/home');
            } else {
              this.router.navigateByUrl('/user/home');
            }
          }
        });
      } else {
        this.us.createUser(formRef.value).subscribe((res) => {
          if (res['message'] == 'New User Added') {
            this.toastr.success('New user Created Succesfully');
            this.isLogin = true;
          } else {
            this.toastr.warning('User name already present');
            formRef.reset();
          }
        });
      }
    }
  }
}
