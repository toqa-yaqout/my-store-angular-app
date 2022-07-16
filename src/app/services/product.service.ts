import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('../../assets/data.json');
  }

  private getProductsList(): Product[] {
    let products: Product[] = [];
    this.getProducts().subscribe((e) => (products = e));
    return products;
  }
}
