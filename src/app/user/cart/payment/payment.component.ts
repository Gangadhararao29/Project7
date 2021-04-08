import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'services/order.service';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(private toastr: ToastrService, private os: OrderService, private router:Router,private us: UserService) {}

  ngOnInit(): void {}
  value = true;
  mainvalue = true;
  userName=localStorage.getItem('userName');
  checkvalidation(validForm) {
    let check = validForm.value;
    var d = new Date();
    let presentmonth = d.getMonth();
    let presentyear = d.getFullYear();
    if (check.year == presentyear) {
      if (check.month <= presentmonth) {
        this.value = false;
        console.log('error');
      } else {
        this.value = true;
      }
      console.log(check.month);
    } else {
      this.value = true;
    }
  }

  orderPlaced(paymentForm, paypal, netBanking) {
    if (paymentForm.valid || paypal || netBanking) {
      let orderObj = this.os.confirmedOrder();
      this.os.createOrder(orderObj).subscribe((res) => {
        if (res['message'] == 'New Order saved') {
          this.toastr.success('Your order has been placed successfully');
        } else {
          this.toastr.warning(res['message']);
        }
      });
      this.us.resetCart(this.userName).subscribe(res=>{
        if(res['message']=='user cart got reset')
        {
          this.toastr.success('Thanks for Shopping with Us')
        }
        else{
          this.toastr.warning('Something went wrong but Order may be placed plaese check in your profile')
        }
      });
      this.router.navigateByUrl('/')
    }
  }
}
