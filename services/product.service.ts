import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private hc:HttpClient) { }

  getProducts():Observable<any>{
    return this.hc.get("/product/getproducts")
  }
  updateProductsPrice(productValue):Observable<any>{
    return this.hc.post("/product/updateprice",productValue)
  }

  getProductById(id):Observable<any> {
    return this.hc.get(`/product/getproduct/${id}`)
}
}
