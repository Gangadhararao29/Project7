import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {

  Name="";
  constructor(private router:Router, private us:UserService) { }

  num=0;

  ngOnInit(): void {
    //get username from localstorage
   this.Name= localStorage.getItem("userName")
    let nameOrg = this.Name;
   this.Name = this.Name.charAt(0).toUpperCase() + this.Name.slice(1)

    this.us.getCount(nameOrg).subscribe(res=>{
      this.num =res['message']
    })
  }

  logOut(){
    localStorage.clear();
    //navigate to home
    document.getElementById('mainNav').style.display="block"
    this.router.navigateByUrl("/home")
  }

}
