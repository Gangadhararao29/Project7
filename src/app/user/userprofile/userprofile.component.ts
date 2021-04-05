import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  constructor(private us: UserService, private router: Router) {}

  userObj: any;

  ngOnInit(): void {
    let userName = localStorage.getItem('userName');

    this.us.getUser(userName).subscribe(
      (res) => {
        if (res['message'] == 'failed') {
          alert(res['reason']);
          localStorage.clear();
          //navigate to loin
          this.router.navigateByUrl('/login');
        } else {
          this.userObj = res['message'];
        }
      },
      (err) => {
        alert('something went wrong');
        console.log(err);
      }
    );
  }
  onSubmit(formRef){
  
  }
}
