import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: Product[] = [];
  constructor() {}

  addToCart(product: Product): boolean {
    this.products = this.removeProduct(product.id);
    this.products.push(product);
    return true;
  }

  removeProduct(id: number): Product[] {
    let productIndex: number = this.products.findIndex((e) => e.id == id);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
    }

    return this.products;
  }

  getProductsInCart(): Product[] {
    return this.products;
  }

  removeAllItemFromProduct(): void {
    this.products = [];
  }
}
