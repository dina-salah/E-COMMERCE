import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private HttpClient: HttpClient) { }

  addToWishList(id: string): Observable<any> {
    return this.HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
        "productId": id
      }
    );
  };

  getWishList(): Observable<any> {
    return this.HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`);
  };

  removeFromWishList(id: string): Observable<any> {
    return this.HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`);
  };
}
