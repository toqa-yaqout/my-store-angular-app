import { Injectable } from '@angular/core';
import { Product } from 'src/models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: Product[] = [];
  constructor() {}

  addToCart(product: Product): boolean {
    let productIndex: number = this.products.findIndex(
      (e) => e.id == product.id
    );
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
    }
    this.products.push(product);
    return true;
  }

  getProductsInCart(): Product[] {
    return this.products;
  }

  removeAllItemFromProduct(): void {
    this.products = [];
  }
}
