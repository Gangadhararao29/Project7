import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'services/cart.service';
import { OrderService } from 'services/order.service';
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
  sum = 0;
  quantity = 0;
  userName = localStorage.getItem('userName');

  constructor(
    private ps: ProductService,
    private us: UserService,
    private toastr: ToastrService,
    private router: Router,
    private cs: CartService,
    private os: OrderService
  ) {}

  ngOnInit(): void {
    this.ps.getProducts().subscribe((res) => {
      this.productsArray = res['message'];
    });

    this.us.getCart(this.userName).subscribe((res) => {
      if (res['message'] == 'Unauthorised access') {
        this.toastr.warning('Unauthorised access', 'Please login to access');
        this.router.navigateByUrl('/login');
      } else if (res['message'] == 'Session Expired') {
        this.toastr.warning('Session Expired', 'Please relogin to continue');
        this.router.navigateByUrl('/login');
      } else {
        this.cart = res['message'];
      }
      // console.log('in cart display ids', this.cart);
    });
    // setTimeout(() => {document.getElementById('spinner').style.display='none'}, 1000);

    setTimeout(() => {
      this.loadValues();
    }, 1500);

    setTimeout(() => {
      document.getElementById('spinner').style.display = 'none';
      if (this.cartsArray.length == 0) {
        document.getElementById('noitems').style.display = 'block';
      }
    }, 1500);
  }

  loadValues() {
    //actual code
    let found = false;
    for (let item of this.cart) {
      found = false;
      for (let product of this.productsArray) {
        if (item.productId == product.productId) {
          product.quantity = item.quantity;
          this.cartsArray.push(product);
          found = true;
        } 
      }
      if (!found) {
        console.log("from not found",item)
        this.notFoundItems.push(item);
      }
    }
    this.totalsum();
    //console.log('CartArray', this.cartsArray);
  }

  removeQuantity(product) {
    this.us
      .removeQuantity(this.userName, product.productId)
      .subscribe((res) => {
        if (res['message'] == 'Reduced Quantity') {
          this.toastr.success('  ','Reduced Quantity of Item successfully');
          product.quantity -= 1;
        } else if (
          res['message'] == 'Product deleted from the cart Successful'
        ) {
          this.toastr.success('Product deleted from the cart Successfully');
          //DOM
          let index = this.cartsArray.findIndex((x) => x == product);
          this.cartsArray.splice(index, 1);
        } else if (res['message'] == 'Unauthorised access') {
          this.toastr.warning('Unauthorised access', 'Please login to access');
          this.router.navigateByUrl('/login');
        } else if (res['message'] == 'Session Expired') {
          this.toastr.warning('Session Expired', 'Please relogin to continue');
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.warning('Something went wrong');
          console.log(res['message']);
        }
        this.totalsum();
      });
    this.us.getCount(this.userName).subscribe((res) => {
      this.cs.setNum(res['message'] - 1);
    });
  }

  addQuantity(product) {
    let CartObj = {
      userName: ' ',
      productId: Number,
    };
    CartObj.userName = localStorage.getItem('userName');
    CartObj.productId = product.productId;

    if (CartObj.userName) {
      this.us.addToCart(CartObj).subscribe((res) => {
        if (res['message'] == 'Product quantity updated') {
          this.toastr.success(' ','Added product quantity successfully');
          product.quantity += 1;
        } else if (res['message'] == 'Unauthorised access') {
          this.toastr.warning('Unauthorised access', 'Please login to access');
          this.router.navigateByUrl('/login');
        } else if (res['message'] == 'Session Expired') {
          this.toastr.warning('Session Expired', 'Please relogin to continue');
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.warning('Something went wrong');
          console.log(res['message']);
        }
        this.totalsum();
      });
    } else {
      this.toastr.warning('Please login to Add to your cart');
      this.router.navigateByUrl('/login');
    }

    this.us.getCount(CartObj.userName).subscribe((res) => {
      // this.num =res['message']
      // this.cs.setNum(this.num)
      this.cs.setNum(res['message'] + 1);
    });
  }

  deleteCartItem(product) {
    let quantity = 1;
    this.us
      .removeCartItem(this.userName, product.productId)
      .subscribe((res) => {
        if (res['message'] == 'Product deleted from the cart Successful') {
          this.toastr.success('  ','Product deleted from the cart Successfully');
          //DOM
          let index = this.cartsArray.findIndex((x) => x == product);
          console.log(index);
          
          if (index>=0) {
            //quantity = this.cartsArray[index].quantity;
            // console.log(quantity);
            this.cartsArray.splice(index, 1);
          } else {
            index = this.notFoundItems.findIndex(
              (x) => x.productId == product.productId
            );
            this.notFoundItems.splice(index, 1);
          }
        } else if (res['message'] == 'Unauthorised access') {
          this.toastr.warning('Unauthorised access', 'Please login to access');
          this.router.navigateByUrl('/login');
        } else if (res['message'] == 'Session Expired') {
          this.toastr.warning('Session Expired', 'Please relogin to continue');
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.warning('Something went wrong');
          console.log(res['message']);
        }
        this.totalsum();
      });
    this.us.getCount(this.userName).subscribe((res) => {
      this.cs.setNum(res['message']);
    });
  }

  totalsum() {
    this.sum = 0;
    this.quantity = 0;
    for (let x of this.cartsArray) {
      this.sum += x.productPrice * x.quantity;
      this.quantity += x.quantity;
    }
  }

  checkOut(cartArray) {
    let cartObj = {};
    cartObj['userName'] = this.userName;
    cartObj['dateNow'] = Date.now();
    cartObj['products'] = cartArray;
    cartObj['orderStatus'] = false;
    cartObj['total'] = this.sum;
    //console.log(cartObj)
    this.os.storeCart(cartObj);
    this.router.navigateByUrl('/user/checkout');
  }
}
