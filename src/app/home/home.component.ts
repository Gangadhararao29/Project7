import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  Name = localStorage.getItem('userName');
  constructor(private router: Router, private us: UserService) {}

  ngOnInit() {
    if (this.Name) {
      let nameObj = {
        userName: '',
      };

      nameObj.userName = this.Name;

      this.us.checkAdminUser(nameObj).subscribe((res) => {
        // console.log("test1",res['message'])
        if (res['message'] == 'User is Admin') {
          this.router.navigateByUrl('admin/home');
        } else {
          this.router.navigateByUrl('user/home');
        }
      });
      document.getElementById('mainNav').style.display = 'none';
    }
  }
}
