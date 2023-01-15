import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'services/cart.service';
import { ProductService } from 'services/product.service';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent implements OnInit {
  product: any;
  overallRating = 0;
  ratingArray = [1, 2, 3, 4, 5];

  constructor(
    private ar: ActivatedRoute,
    private ps: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private us: UserService,
    private cs: CartService
  ) {}

  ngOnInit(): void {
    this.ar.params.subscribe((data) => {
      this.ps.getProductById(data.id).subscribe((obj) => {
        this.product = obj.product;
        this.overallRating =
          this.product?.productReview.reduce(
            (prev, curr) => prev + curr.productRating,
            0
          ) / this.product.productReview.length;
      });
    });
  }

  rateProduct(rating, formRef) {
    formRef.controls.productRating.setValue(rating);
  }

  onSubmit(formRef, id) {
    if (formRef.valid) {
      const ratingObj = {
        userName: localStorage.getItem('userName'),
        productId: id,
        productRating: formRef.value.productRating,
        productComments: formRef.value.productComments,
      };

      this.ps.addProductReview(ratingObj).subscribe((res) => {
        if (res['message'] == 'Product review submitted') {
          this.toastr.success('Product review submitted');
        } else if (res['message'] == 'Product review updated') {
          this.toastr.success('Product review updated');
        } else if (res['message'] == 'Unauthorised access') {
          this.toastr.warning('Unauthorised access', 'Please login to access');
          this.router.navigateByUrl('/login');
        } else if (res['message'] == 'Session Expired') {
          this.toastr.warning('Session Expired', 'Please relogin to continue');
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.warning('Something went wrong');
        }
      });
    } else {
      this.toastr.warning(
        'Rating or comments should not be empty',
        'Insufficient fields'
      );
    }
  }

  addToCart(product) {
    const CartObj = {
      userName: localStorage.getItem('userName'),
      productId: product.productId,
      quantity: 1,
    };

    if (CartObj.userName) {
      this.us.addToCart(CartObj).subscribe((res) => {
        if (res['message'] == 'Product added to the cart Successful') {
          this.toastr.success('  ', 'Product added to the cart Successful');
        } else if (res['message'] == 'Product quantity updated') {
          this.toastr.success(
            'Product quantity updated',
            'Product already exists'
          );
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
      });
    } else {
      this.toastr.warning('Please login to Add to your cart');
      this.router.navigateByUrl('/login');
    }

    this.us.getCount(CartObj.userName).subscribe((res) => {
      this.cs.setNum(res['message'] + 1);
    });
  }

  generateRandomDate() {
    const date = 1 + Math.round(Math.random() * 29);
    const month = 1 + Math.round(Math.random() * 11);
    const year = Math.round(2022 - Math.random() * 2);
    return date + '/' + month + '/' + year;
  }
}
