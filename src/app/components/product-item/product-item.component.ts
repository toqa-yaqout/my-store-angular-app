import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product = new Product();

  constructor() {}

  ngOnInit() {}

  addToChart(product: Product): void {}

  increaseQuantity(product: Product): void {
    this.initQuantity(product);
    if (product.quantity >= 10) {
      alert('You exceed maximum quantity');
      product.quantity = 10;
      return;
    }
    product.quantity += 1;
    console.log('hit increase');
  }

  decreaseQuantity(product: Product): void {
    this.initQuantity(product);
    if (product.quantity <= 0) {
      alert('Quantity can not be negative');
      product.quantity = 0;
      return;
    }
    product.quantity -= 1;
    console.log('hit decrease');
  }

  initQuantity(product: Product): void {
    if (product.quantity === NaN || product.quantity === undefined)
      product.quantity = 0;
  }
}
