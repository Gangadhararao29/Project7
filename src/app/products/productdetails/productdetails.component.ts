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
  ratingArray = [1, 2, 3, 4, 5];

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
}
