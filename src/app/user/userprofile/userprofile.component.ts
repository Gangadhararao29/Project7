import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {

  @ViewChild('phone') phoneRef: ElementRef
  constructor(
    private us: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  userObj: any;
  key = false;
  userName = localStorage.getItem('userName');

  ngOnInit(): void {
    this.us.getUser(this.userName).subscribe(
      (res) => {
        if (res['message'] == 'failed') {
          alert(res['reason']);
          localStorage.clear();
          //navigate to loin
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

  onSubmit(formRef) {
    console.log(formRef.value);
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
      } else {
        this.toastr.warning('Something went wrong');
        console.log(res['err']);
      }
    });

    this.key = false;
  }

  updateProfile() {
    this.key = true;
  }
}
