
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  file:File;
  incomingfile(event){
   this.file = event.target.files[0]
   console.log("file",this.file);
   
  }

  formData =new FormData()
  submitUserData(userObj)
 {
 //adding image and other data to FormData object
 this.formData.append('photo',this.file,this.file.name);
 this.formData.append("userObj",JSON.stringify(userObj))
 
 this.us.addProduct(this.formData).subscribe(res=>{
   // console.log(res['message'])
      if(res['message'] == "Product added"){
        alert(res['message'])
        //navigate to add product
        this.router.navigateByUrl("/admin/home")
      }
      else if(res['message'] == "Unauthorised access"){
        alert("Please login to access")
        this.router.navigateByUrl("/login")
      }
      else if(res['message'] == "Session Expired"){
        alert("Please relogin to continue")
        this.router.navigateByUrl("/login")
      }
      else{
        alert(res['message'])
      }
    
    },
    err=>{
      alert("Something went wrong")
      console.log(err)
    }
  )
}

}