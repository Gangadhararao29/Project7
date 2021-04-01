import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'services/product.service';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  productsArray = [];
  cartsArray = [];
  notFoundItems = [];
  cart = [];
  sum=0;
  userName = localStorage.getItem('userName');

  constructor(
    private ps: ProductService,
    private us: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ps.getProducts().subscribe((res) => {
      // console.log("mes1",res['message'])
      this.productsArray = res['message'];
     // console.log('in product dispaly', this.productsArray);
    });

    this.us.getCart(this.userName).subscribe((res) => {
      this.cart = res['message'];
     // console.log('in cart display ids', this.cart);
    });

    // setTimeout(() => {document.getElementById('spinner').style.display='none'}, 1000);

    setTimeout(() => {
      this.loadValues();
    }, 1000);
    // this.loadValues();
    setTimeout(() => {
      document.getElementById('spinner').style.display = 'none';
      console.log(this.cartsArray.length)
      if(this.cartsArray.length==0){
      document.getElementById('noitems').style.display = 'block';
      }
    }, 1000);
  }

  loadValues() {
    //actual code
    let found = false;
    for (let item of this.cart) {
      for (let product of this.productsArray) {
        if (item.productId == product.productId) {
          product.quantity = item.quantity;
          this.cartsArray.push(product);
          found = true;
          break;
        }
      }
      if (!found) {
        this.notFoundItems.push(item);
      }
    }
    this.totalsum();
    //console.log('CartArray', this.cartsArray);
  }

  deleteCartItem(id) {
    this.us.deleteCart(this.userName, id).subscribe((res) => {
      if (res['message'] == 'Reduced Quantity') {
        this.toastr.success('Reduced Quantity of Item successfully');
      } else if (res['message'] == 'Product deleted from the cart Successful') {
        this.toastr.success('Product deleted from the cart Successfully');
      } else {
        this.toastr.warning('Something went wrong');
        console.log(res['err']);
      }
      this.totalsum();
    });
  }

  totalsum() {
    this.sum =0;
    for(let x of this.cartsArray){
      this.sum += x.productPrice * x.quantity
    }
  }
}