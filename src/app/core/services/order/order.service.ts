import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  token:any = localStorage.getItem("token");
  constructor(private http:HttpClient) { }


  sendCart(data:object,id:string):Observable<any>{
    return this.http.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
      {
        "shippingAddress": data
    }
    )
  }
}
