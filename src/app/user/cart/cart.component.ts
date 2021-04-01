import { Component, OnInit } from '@angular/core';
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
  constructor(private ps: ProductService, private us: UserService) {}

  ngOnInit(): void {
    this.ps.getProducts().subscribe((res) => {
      // console.log("mes1",res['message'])
     this.productsArray = res['message'];
      console.log("in product dispaly",this.productsArray)
    });

    let userName = localStorage.getItem('userName');

    this.us.getCart(userName).subscribe((res) => {
      this.cart = res['message'];
       console.log("in cart display ids",this.cart)
    });

    setTimeout(() => {this.loadValues();}, 1000);
    
  }

  loadValues(){
      //actual code
      let found = false;
      for (let item of this.cart) {
        for (let product of this.productsArray) {
          console.log('item', item);
          console.log('product', product);
          if (item == product.productId) {
            this.cartsArray.push(product);
            found = true;
            break;
          }
        }
        if (!found) {
          this.notFoundItems.push(item);
        }
      }
  
      console.log('CartArray', this.cartsArray);
  }

}
