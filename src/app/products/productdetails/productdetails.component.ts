import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'services/product.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  product:any;

  constructor(private ar:ActivatedRoute, private ps:ProductService) { }

  ngOnInit(): void {
    this.ar.params.subscribe((data)=>{
      this.ps.getProductById(data.id).subscribe((obj)=>{
        this.product = obj.product;
        // console.log(this.product);
      })
    })
  }

}
