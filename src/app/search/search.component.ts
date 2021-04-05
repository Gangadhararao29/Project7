import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'services/product.service';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  productsArray=[];

  constructor(private ps:ProductService, private router:Router,private us:UserService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.ps.getProducts().subscribe((res) => {
      // console.log("mes1",res['message'])
      this.productsArray = res['message'];
    })
  }

  link(id){
    if(localStorage.getItem('userName'))
    this.router.navigateByUrl(`/user/productdetails/${id}`)
    else{
      this.router.navigateByUrl(`/productdetails/${id}`)
    }
  }

  addToCart(product) {
    
    let productObj = {
      userName: ' ',
      productId: Number,
      quantity:1
    };
    productObj.userName = localStorage.getItem('userName');
    productObj.productId = product.productId;


    if (productObj.userName) {
      this.us.addToCart(productObj).subscribe((res) => {
        if (res['message'] == 'Product added to the cart Successful') {
          this.toastr.success('Product added to the cart Successful');
        } 
        else if(res['message'] == 'Product quantity updated'){
          this.toastr.success('Product quantity updated');
        } 
        else{
          this.toastr.warning('Something went wrong');
          console.log(res['err']);
        }
      });
    }
    else{
      this.toastr.warning('Please login to Add to your cart')
      this.router.navigateByUrl('/login')
    }
  }

}
