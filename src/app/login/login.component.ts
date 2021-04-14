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
  constructor(
    private us: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  Name: string;

  ngOnInit(): void {
    this.Name = localStorage.getItem('userName');
    localStorage.clear();
  }

  onSubmit(formRef) {
    if (formRef.valid) {
      let loginObj = formRef.value;
      console.log(loginObj);
      this.us.loginUser(loginObj).subscribe((res) => {
        if (res['message'] == 'Please enter Username') {
          this.toastr.success('Please enter Username');
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
    }
  }
}
