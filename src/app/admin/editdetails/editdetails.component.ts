import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'services/product.service'


@Component({
  selector: 'app-editdetails',
  templateUrl: './editdetails.component.html',
  styleUrls: ['./editdetails.component.css']
})
export class EditdetailsComponent implements OnInit {

  product:any;

  constructor(private ar:ActivatedRoute, private ps:ProductService, private router: Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.ar.params.subscribe((data)=>{
      this.ps.getProductById(data.id).subscribe((obj)=>{
        this.product = obj.product;
        //  console.log("product ngonint",this.product);
      })
    })
  }

  submitData(ref){
    if(ref.valid){
    let newData = ref.value;
    // console.log("from component",newData)
    this.ps.updateProduct(newData).subscribe(res=>{
      if(res['message'] == 'Update Successful') {
        this.toastr.success("Updated Successfully")
        this.router.navigateByUrl('/admin/editproduct')
      }
      else if(res['message'] == "Unauthorised access"){
        this.toastr.warning("Unauthorised access","Please login to access")
        this.router.navigateByUrl("/login")
      }
      else if(res['message'] == "Session Expired"){
        this.toastr.warning("Session Expired","Please relogin to continue")
        this.router.navigateByUrl("/login")
      }
      else{
        this.toastr.warning(res["message"])
      }
    })

  }
  else{
    this.toastr.warning("Please fill all the details in their respective fields")
  }
  }

}