import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CatigoriesService {

  constructor(private http:HttpClient) {  }

  getAllCate():Observable<any>{
    return this.http.get(`${environment.baseUrl}/api/v1/categories`)
  }
  getSpecificCate(id:string):Observable<any>{
    return this.http.get(`${environment.baseUrl}/api/v1/categories/${id}`)
  }
}
