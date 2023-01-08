import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private os: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  order(checkOut) {
    // console.log(checkOut.value);
    if (checkOut.valid) {
      this.os.storeAddress(checkOut.value);
      this.toastr.success('Address added successfully');
      this.router.navigateByUrl('/user/payment');
    }
  }
}
