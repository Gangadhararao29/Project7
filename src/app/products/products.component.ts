import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'services/product.service';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productsArray = [];
  productsOrgainc = [];
  productsOrgaincFruits = [];
  productsOrgaincVegetables = [];
  productsInorgainc = [];
  productsInorgaincFruits = [];
  productsInorgaincVegetables = [];

  constructor(
    private ps: ProductService,
    private us: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.ps.getProducts().subscribe((res) => {
      // console.log("mes1",res['message'])
      this.productsArray = res['message'];
      // console.log("mes2",this.productsArray)

      // Organic and Inorganic
      this.productsOrgainc = this.productsArray.filter((item) => {
        return item.productBrand == 'Organic';
      });
      this.productsInorgainc = this.productsArray.filter((item) => {
        return item.productBrand == 'Inorganic';
      });

      this.productsOrgaincFruits = this.productsOrgainc.filter((item) => {
        return item.productCategory == 'Fruits';
      });

      this.productsOrgaincVegetables = this.productsOrgainc.filter((item) => {
        return item.productCategory == 'Vegetables';
      });
      this.productsInorgaincFruits = this.productsInorgainc.filter((item) => {
        return item.productCategory == 'Fruits';
      });

      this.productsInorgaincVegetables = this.productsInorgainc.filter(
        (item) => {
          return item.productCategory == 'Vegetables';
        }
      );
      // console.log("mes3",this.productsOrgainc)
      // console.log("mes4",this.productsInorgainc)
      // console.log("mes5",this.productsOrgaincFruits)
      // console.log("mes6",this.productsOrgaincVegetables)
    });
  }

  details(id) {
    let user = localStorage.getItem('userName');
    if (user) {
      let userObject = {
        userName: '',
      };
      userObject.userName = user;

      this.us.checkAdminUser(userObject).subscribe((res) => {
        // console.log("test1",res['message'])

        if (res['message'] == 'User is Admin') {
          this.router.navigateByUrl(`admin/productdetails/${id}`);
        } else {
          this.router.navigateByUrl(`user/productdetails/${id}`);
        }
      });
    } else {
      this.router.navigateByUrl(`/productdetails/${id}`);
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
