import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  @Input() product: Product = new Product();
  @Output() products = new EventEmitter<Product[]>();

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.initQuantity(this.product, 1);
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

  initQuantity(product: Product, value: number): void {
    if (product.quantity === NaN || product.quantity === undefined)
      product.quantity = value;
  }

  removeProductFromCart(): void {
    let products = this.cartService.removeProduct(this.product.id);
    this.products.emit(products);
  }
}
