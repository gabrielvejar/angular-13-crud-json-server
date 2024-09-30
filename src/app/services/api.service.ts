import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../product/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private productsUrl = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  postProduct(product: Product): Observable<any> {
    return this.http.post<any>(this.productsUrl, product);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<any>(this.productsUrl);
  }
}
