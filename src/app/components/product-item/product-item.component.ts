import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product = new Product();
  @Output() productDetails = new EventEmitter<Product>();

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.initQuantity(this.product, 1);
  }

  addToCart(): void {
    if (this.product.quantity === 0) {
      alert("You can't add 0 quantity");
      return;
    }
    let response = this.cartService.addToCart(this.product);
    if (response) alert('Addes to cart successfully');
  }

  increaseQuantity(): void {
    if (this.product.quantity >= 10) {
      alert('You exceed maximum quantity');
      this.product.quantity = 10;
      return;
    }
    this.product.quantity += 1;
    console.log('hit increase');
  }

  decreaseQuantity(): void {
    if (this.product.quantity <= 0) {
      alert('Quantity can not be negative');
      this.product.quantity = 0;
      return;
    }
    this.product.quantity -= 1;
    console.log('hit decrease');
  }

  initQuantity(product: Product, value: number): void {
    if (product.quantity === NaN || product.quantity === undefined)
      product.quantity = value;
  }
  showProductDetails(): void {
    this.productDetails.emit(this.product);
  }
}
