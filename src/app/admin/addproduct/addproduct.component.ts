import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit {
  @ViewChild('photo') photoRef: ElementRef;

  constructor(
    private us: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  file: File;
  incomingfile(event) {
    this.file = event.target.files[0];
    //console.log('file', this.file);
  }

  submitUserData(userObj) {
    let formData = new FormData();
    //adding image and other data to FormData object
    formData.append('photo', this.file, this.file.name);
    formData.append('userObj', JSON.stringify(userObj.value));

    this.us.addProduct(formData).subscribe(
      (res) => {
        // console.log(res['message'])
        if (res['message'] == 'Product added') {
          this.toastr.success('Product added Successfully');
          userObj.reset();
          this.photoRef.nativeElement.value = '';

          //navigate to add product
          // this.router.navigateByUrl("/admin/home")
        } else if (res['message'] == 'Unauthorised access') {
          this.toastr.warning('Unauthorised access', 'Please login to access');
          this.router.navigateByUrl('/login');
        } else if (res['message'] == 'Session Expired') {
          this.toastr.warning('Session Expired', 'Please relogin to continue');
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
  }
}
