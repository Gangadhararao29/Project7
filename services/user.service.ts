import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private hc :HttpClient) { }

  createUser(userObj):Observable<any>{
    return this.hc.post("/user/createuser",userObj)
  }

  loginUser(loginObj):Observable<any>{
    return this.hc.post("/user/login",loginObj)
  }

  loginAdminUser(loginObj):Observable<any>{
    return this.hc.post("/admin/login",loginObj)
  }
  addProduct(productObj):Observable<any>{
    return this.hc.post("/product/addproduct",productObj)
  }
  checkUser(userName):Observable<any>{
    return this.hc.post("/user/checkuser",userName)
  }
}
