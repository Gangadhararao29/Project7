import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'services/product.service'


@Component({
  selector: 'app-editdetails',
  templateUrl: './editdetails.component.html',
  styleUrls: ['./editdetails.component.css']
})
export class EditdetailsComponent implements OnInit {

  product:any;

  constructor(private ar:ActivatedRoute, private ps:ProductService, private router: Router) { }

  ngOnInit(): void {
    this.ar.params.subscribe((data)=>{
      this.ps.getProductById(data.id).subscribe((obj)=>{
        this.product = obj.product;
        console.log(this.product);
      })
    })
  }

  submitData(ref){
    // console.log("from edit component",ref)
    this.ps.updateProduct(ref).subscribe(res=>{
      if(res['message'] == 'Update Successful') {
        alert("Updated Successfully")
        this.router.navigateByUrl('/admin/editproduct')
      }
    })

    
  }

}