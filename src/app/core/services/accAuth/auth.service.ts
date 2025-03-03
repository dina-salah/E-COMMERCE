import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: string = ""
  private readonly router = inject(Router)
  constructor(private http: HttpClient) { }

  sendRegisterForm(data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/auth/signup`, data)
  }
  sendloginrForm(data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/auth/signin`, data)
  }

  decodeToken(): void {
    this.userData = jwtDecode(localStorage.getItem("token")!);
  }

  logout(): void {
    localStorage.removeItem("token");
    this.userData = '';
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);

  }
}
