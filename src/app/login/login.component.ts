import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private us: UserService, private router: Router) {}

  Name: string;

  ngOnInit(): void {
    this.Name = localStorage.getItem('userName');
  }

  onSubmit(formRef) {
    if(formRef.valid){
      let loginObj = formRef.value;
    // console.log(loginObj);
    this.us.loginUser(loginObj).subscribe((res) => {
      if (res['message'] == 'Please enter Username'){
        alert('Please enter Username');
      }
      else if (res['message'] == 'Username not found') {
        alert('Incorrect Username');
        formRef.reset();
      } else if (res['message'] == 'Invalid password') {
        alert('Please enter correct password');
        formRef.reset();
      } else if (res['message'] == 'login successful') {
        
        localStorage.setItem('token', res['token']);
        localStorage.setItem('userName', res['userName']);

        if (res['userTypeAdmin']) {
          this.router.navigateByUrl('/admin/home');
        }
        else {
          this.router.navigateByUrl('/user/home');
        }
      }
    });
    }
  }
}
