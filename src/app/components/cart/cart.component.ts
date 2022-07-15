import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.products = this.cartService.getProductsInCart();
  }

  increaseQuantity(product: Product): void {
    if (product.quantity >= 10) {
      alert('You exceed maximum quantity');
      product.quantity = 10;
      return;
    }
    product.quantity += 1;
    console.log('hit increase');
  }

  decreaseQuantity(product: Product): void {
    if (product.quantity <= 0) {
      alert('Quantity can not be negative');
      product.quantity = 0;
      return;
    }
    product.quantity -= 1;
    console.log('hit decrease');
  }

  calcuateTotalAmount(): number {
    let totalAmount: number = 0;
    for (let i = 0; i < this.products.length; i++) {
      totalAmount += (this.products[i].quantity * this.products[i].price);
    }

    return totalAmount;
  }
}
