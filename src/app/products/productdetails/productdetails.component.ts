import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'services/product.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent implements OnInit {
  product: any;
  overallRating = 0;
  Rating: any;

  constructor(
    private ar: ActivatedRoute,
    private ps: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ar.params.subscribe((data) => {
      this.ps.getProductById(data.id).subscribe((obj) => {
        this.product = obj.product;
        // console.log(this.product);
      });
    });

    setTimeout(() => {
      let total = 0,
        count = 0;
      // console.log(this.product.productReview)
      for (let review of this.product?.productReview) {
        total += review.productRating;
        count++;
      }
      this.overallRating = total / count;
      this.Rating = this.overallRating.toFixed(2);
      //console.log(this.overallRating)
    }, 1000);
  }

  onSubmit(formRef, id) {
    let userRatingObj = {
      userName: '',
      productId: Number,
      productRating: Number,
      productComments: String,
    };

    userRatingObj.userName = localStorage.getItem('userName');
    userRatingObj.productId = id;
    userRatingObj.productRating = formRef.value.productRating;
    userRatingObj.productComments = formRef.value.productComments;
    // console.log(formRef.value,userRatingObj)

    this.ps.addProductReview(userRatingObj).subscribe((res) => {
      // console.log(res['message'])
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
  }
}
