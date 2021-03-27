import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminuserdashboard',
  templateUrl: './adminuserdashboard.component.html',
  styleUrls: ['./adminuserdashboard.component.css']
})
export class AdminuserdashboardComponent implements OnInit {

  value=localStorage.getItem('admin');
  Name:string;
  key=0;

  constructor(private router:Router) { }

  ngOnInit(): void {
    //get username from localstorage
    this.Name= localStorage.getItem("userName")
    if(this.value == "true"){
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
