import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css'],
})
export class AdminprofileComponent implements OnInit {
  @ViewChild('phone') phoneRef: ElementRef;
  constructor(
    private us: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  userObj: any;
  keyPhone = false;
  keyPassword = false;
  ordersArray = [];
  userName = localStorage.getItem('userName');

  ngOnInit(): void {
    this.us.getUser(this.userName).subscribe(
      (res) => {
        if (res['message'] == 'No user found') {
          alert(res['reason']);
          // localStorage.clear();
          this.router.navigateByUrl('/login');
        } else if (res['message'] == 'Unauthorised access') {
          this.toastr.warning('Unauthorised access', 'Please login to access');
          this.router.navigateByUrl('/login');
        } else if (res['message'] == 'Session Expired') {
          this.toastr.warning('Session Expired', 'Please relogin to continue');
          this.router.navigateByUrl('/login');
        } else {
          this.userObj = res['message'];
        }
      },
      (err) => {
        alert('something went wrong');
        console.log(err);
      }
    );
  }

  onSubmitPhone(formRef) {
    // console.log(formRef.value);
    if (formRef.valid) {
      let userObj = {
        userName: '',
        phone: Number,
      };
      userObj.userName = this.userName;
      userObj.phone = formRef.value.phone;
      this.us.updateUserDetails(userObj).subscribe((res) => {
        if (res['message'] == 'User phone number updated') {
          this.toastr.success('User phone number updated');
          this.phoneRef.nativeElement.value = userObj.phone;
        } else if (res['message'] == 'Unauthorised access') {
          this.toastr.warning('Unauthorised access', 'Please login to access');
          this.router.navigateByUrl('/login');
        } else if (res['message'] == 'Session Expired') {
          this.toastr.warning('Session Expired', 'Please relogin to continue');
          this.router.navigateByUrl('/login');
        }
        (err) => {
          this.toastr.warning('Something went wrong');
          console.log(err);
        };
      });
      this.keyPhone = false;
    }
  }

  onSubmitPassword(formRef) {
    if (formRef.valid) {
      this.us.changePassword(this.userName, formRef.value).subscribe((res) => {
        if (res['message'] == 'currentpwd is missing') {
          this.toastr.warning('currentpwd is missing');
        } else if (res['message'] == 'newpwd is missing') {
          this.toastr.warning('newpwd is missing');
        } else if (res['message'] == 'not matching') {
          this.toastr.warning('New passwords are not matching');
        } else if (res['message'] == 'Invalid password') {
          this.toastr.error('Current password is not valid');
          formRef.reset();
        } else if (res['message'] == 'Passsword updated succesfully') {
          this.toastr.success(
            'Relogin to continue',
            'Password updated successfully'
          );
          localStorage.clear();
          this.router.navigateByUrl('/login');
        }
      });
    }
  }

  updateProfile() {
    this.keyPhone = !this.keyPhone;
    this.keyPassword = false;
  }

  updatePassword() {
    this.keyPassword = !this.keyPassword;
    this.keyPhone = false;
  }
}
