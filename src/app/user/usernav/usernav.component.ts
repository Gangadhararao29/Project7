import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'services/cart.service';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css'],
})
export class UsernavComponent implements OnInit {
  Name = '';
  constructor(
    private router: Router,
    private us: UserService,
    private cs: CartService
  ) {}

  num = 0;

  ngOnInit(): void {
    //get username from localstorage
    this.Name = localStorage.getItem('userName');
    let nameOrg = this.Name;
    this.Name = this.Name.charAt(0).toUpperCase() + this.Name.slice(1);

    this.us.getCount(nameOrg).subscribe((res) => {
      this.num = res['message'];
      // this.cs.setNum(res['message'])
    });
    this.cs.getNum().subscribe((numValue) => (this.num = numValue));

  }

  logOut() {
    localStorage.clear();
    //navigate to home
    document.getElementById('mainNav').style.display = 'block';
    this.router.navigateByUrl('/home');
  }
}
