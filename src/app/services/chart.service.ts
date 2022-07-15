import { Injectable } from '@angular/core';
import { Product } from 'src/models/product';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  products: Product[] = [];
  constructor() {}

  addToChart(product: Product): boolean {
    this.products.push(product);
    return true;
  }

  getProductsInChart(): Product[] {
    return this.products;
  }
}
