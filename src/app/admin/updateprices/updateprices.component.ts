import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'services/product.service';

@Component({
  selector: 'app-updateprices',
  templateUrl: './updateprices.component.html',
  styleUrls: ['./updateprices.component.css'],
})
export class UpdatepricesComponent implements OnInit{
  constructor(private ps: ProductService, private router: Router, private toastr:ToastrService) {}
  productsArray = [];
  arrItems = [];
  text1 = '';

  ngOnInit(): void {
    this.ps.getProducts().subscribe((res) => {
      // console.log("mes1",res['message'])
      this.productsArray = res['message'];
    });
  }

  updatePrices(formRef) {
    this.arrItems = formRef.value;
   
    for (let [i, product] of this.productsArray.entries()) {
      //Check for new Prices
      if (this.arrItems[`newPrice${i}`]) {
        let productValue = {
          productName: String,
          productPrice: Number,
        };

        productValue.productName = product.productName;
        productValue.productPrice = this.arrItems[`newPrice${i}`];

        this.ps.updateProductsPrice(productValue).subscribe((res) => {
          if (res['message'] == 'Update Successful') {
            this.text1 += `<p style="color:green"> ${res['productName']} price updated successfully </p> `;
          }
          else if(res['message'] == "Unauthorised access"){
            this.toastr.warning("Unauthorised access","Please login to access")
            this.router.navigateByUrl("/login")
          }
          else if(res['message'] == "Session Expired"){
            this.toastr.warning("Session Expired","Please relogin to continue")
            this.router.navigateByUrl("/login")
          }
          else {
            this.text1 += `<p style="color:red"> ${res['productName']} price update failed</p>`;
          }
          document.getElementById('status').innerHTML = this.text1;
        })
      }
    }
    
    // console.log(this.text1)
    document.getElementById('status').innerHTML = this.text1;
    this.toastr.success("Updated Successfully")
  }
}
