import { Component, OnInit } from '@angular/core';
import { ProductService } from 'services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productsArray = [];
  productsOrgainc = [];
  productsOrgaincFruits = [];
  productsOrgaincVegetables = [];
  productsInorgainc = [];
  productsInorgaincFruits = [];
  productsInorgaincVegetables = [];

  constructor(private ps: ProductService) {}

  ngOnInit(): void {
    this.ps.getProducts().subscribe((res) => {
      // console.log("mes1",res['message'])
      this.productsArray = res['message'];
      // console.log("mes2",this.productsArray)

      // Organic and Inorganic
      this.productsOrgainc = this.productsArray.filter((item) => {
        return item.productBrand == 'Organic';
      });
      this.productsInorgainc = this.productsArray.filter((item) => {
        return item.productBrand == 'Inorganic';
      });

      this.productsOrgaincFruits = this.productsOrgainc.filter((item)=>{
        return item.productCategory == 'Fruits';
      })

      this.productsOrgaincVegetables = this.productsOrgainc.filter((item)=>{
        return item.productCategory == 'Vegetables';
      })
        this.productsInorgaincFruits = this.productsInorgainc.filter((item)=>{
          return item.productCategory == 'Fruits';
        })
  
        this.productsInorgaincVegetables = this.productsInorgainc.filter((item)=>{
          return item.productCategory == 'Vegetables';
        
      })
      // console.log("mes3",this.productsOrgainc)
      // console.log("mes4",this.productsInorgainc)
      // console.log("mes5",this.productsOrgaincFruits)
      // console.log("mes6",this.productsOrgaincVegetables)
    });
  }

  addToCart(product){

  }

  specifications(productID){

  }
}
