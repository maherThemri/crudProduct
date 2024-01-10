import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  apiUrl: string = "http://localhost:8080/api/products";

  constructor(
    private http: HttpClient
  ) { }

  saveProduct(product: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.apiUrl}/save-product`, product);
  }

  findAllProducts(): Observable<Array<Produit>> {
    return this.http.get<Array<Produit>>(`${this.apiUrl}/find-all-products`);
  }

  findProductById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/get-product/${id}`);
  }

  deleteProductById(id: number) {
    return this.http.delete(`${this.apiUrl}/delete-product/${id}`);
  }
}
