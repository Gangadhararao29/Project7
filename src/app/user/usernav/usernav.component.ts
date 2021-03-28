import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {

  Name="";
  constructor(private router:Router) { }

  num=0;

  ngOnInit(): void {
    //get username from localstorage
   this.Name= localStorage.getItem("userName")
  }

  logOut(){
    localStorage.clear();
    //navigate to home
    document.getElementById('mainNav').style.display="block"
    this.router.navigateByUrl("/home")
  }

}
