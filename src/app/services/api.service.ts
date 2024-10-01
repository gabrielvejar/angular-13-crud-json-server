import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../product/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private productsUrl = 'http://localhost:3000/products';

  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);

  get products(): Observable<Product[]> {
    return this._products.asObservable();
  }

  constructor(private http: HttpClient) {}

  postProduct(product: Product): Observable<any> {
    return this.http.post<any>(this.productsUrl, product);
  }

  getProducts(): void {
    this.http.get<Product[]>(this.productsUrl).subscribe((products) => {
      this._products.next(products);
    });
  }

  updateProduct(id: number, product: Product): Observable<any> {
    return this.http.put<any>(`${this.productsUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.productsUrl}/${id}`);
  }
}
