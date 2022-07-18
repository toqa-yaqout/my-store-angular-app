import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  @Input() isDisabled: boolean = false;
  @Input() product: Product = new Product();
  @Output() products = new EventEmitter<Product[]>();
  @Output() productQuantityPrice = new EventEmitter();

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.initQuantity(this.product, 1);
    console.log();
  }

  increaseQuantity(): void {
    if (this.product.quantity >= 10) {
      alert('You exceed maximum quantity');
      this.product.quantity = 10;
      return;
    }
    this.product.quantity += 1;
    this.onQuantityChange(this.product.quantity);
    console.log('hit increase');
  }

  decreaseQuantity(): void {
    if (this.product.quantity <= 0) {
      alert('Quantity can not be negative');
      this.product.quantity = 0;
      return;
    }
    this.product.quantity -= 1;
    this.onQuantityChange(this.product.quantity);
    console.log('hit decrease');
  }

  initQuantity(product: Product, value: number): void {
    if (product.quantity === NaN || product.quantity === undefined)
      product.quantity = value;
  }

  onQuantityChange(value: number): void {
    let productQuantityPrice: number = value * this.product.price;
   this.productQuantityPrice.emit();
  }

  removeProductFromCart(): void {
    let products = this.cartService.removeProduct(this.product.id);
    this.products.emit(products);
  }
}
