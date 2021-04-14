import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'services/product.service';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit {
  constructor(
    private ps:ProductService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  file: File;
  incomingfile(event) {
    this.file = event.target.files[0];
    //console.log('file', this.file);
  }

  submitProductData(productObj) {
    if (productObj.valid) {
      let formData = new FormData();
      //console.log(productObj)
      //adding image and other data to FormData object
      formData.append('photo', this.file, this.file.name);
      formData.append('productObj', JSON.stringify(productObj.value));

      this.ps.addProduct(formData).subscribe(
        (res) => {
          // console.log(res['message'])
          if (res['message'] == 'Product added') {
            this.toastr.success('Product added Successfully');
            productObj.reset();
          } else if (res['message'] == 'Unauthorised access') {
            this.toastr.warning(
              'Unauthorised access',
              'Please login to access'
            );
            this.router.navigateByUrl('/login');
          } else if (res['message'] == 'Session Expired') {
            this.toastr.warning(
              'Session Expired',
              'Please relogin to continue'
            );
            this.router.navigateByUrl('/login');
          } else {
            this.toastr.warning(res['message']);
          }
        },
        (err) => {
          this.toastr.warning('Something went wrong');
          console.log(err);
        }
      );
    } else {
      this.toastr.warning(
        'Please fill all the details in their respective fields'
      );
    }
  }
}
