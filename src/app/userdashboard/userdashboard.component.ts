import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  Name:string;
  key=1;
  value=localStorage.getItem('admin');
  constructor(private router:Router) { }

  ngOnInit(): void {
    //get username from localstorage
   this.Name= localStorage.getItem("userName")
   this.value= localStorage.getItem('admin')
   if(this.value == "false"){
     this.key=1;
   }
   else{
     this.key=0;
   }
  }

  logOut(){
    localStorage.clear();
    //navigate to home
    this.router.navigateByUrl("/home")
  }
}
