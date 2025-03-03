import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartdetailsService {

  constructor(private http: HttpClient) { }

  addItem(id: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/cart/`,
      {
        "productId": id
      }

    );
  }

  userCart(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/cart/`)
  }

  updateQty(id: string, newCount: number): Observable<any> {
    return this.http.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        "count": newCount
      }

    )
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/v1/cart/${id}`
    );
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/v1/cart`
    )
  }
}
