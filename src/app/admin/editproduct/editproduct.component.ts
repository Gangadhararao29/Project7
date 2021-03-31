import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'services/product.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  productsArray = [];
  productsOrgainc = [];
  productsOrgaincFruits = [];
  productsOrgaincVegetables = [];
  productsInorgainc = [];
  productsInorgaincFruits = [];
  productsInorgaincVegetables = [];

  constructor(private ps:ProductService, private router:Router) { }

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

      this.productsOrgaincFruits = this.productsOrgainc.filter((item) => {
        return item.productCategory == 'Fruits';
      });

      this.productsOrgaincVegetables = this.productsOrgainc.filter((item) => {
        return item.productCategory == 'Vegetables';
      });
      this.productsInorgaincFruits = this.productsInorgainc.filter((item) => {
        return item.productCategory == 'Fruits';
      });

      this.productsInorgaincVegetables = this.productsInorgainc.filter((item) => {
        return item.productCategory == 'Vegetables';
      });
    });
  }
  edit(id){
    this.router.navigateByUrl(`admin/editdetails/${id}`)
  }

  delete(id){
    this.ps.deleteProduct(id).subscribe(res=>{
      if(res['message']=="Product deleted")
      {
        alert("Product deleted Successfully")
        this.router.navigateByUrl('/admin/home')
      }
      else if(res['message'] == "Unauthorised access"){
        alert("Please login to access")
        this.router.navigateByUrl("/login")
      }
      else if(res['message'] == "Session Expired"){
        alert("Please relogin to continue")
        this.router.navigateByUrl("/login")
      }
      else
      {
        alert("Something went wrong in deleting the Product")
      }

    })
  }
}
