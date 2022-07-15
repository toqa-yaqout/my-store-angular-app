import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

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
