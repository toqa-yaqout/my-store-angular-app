import { Component, Input, OnInit } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product = new Product();

  constructor(private chartService: ChartService) {}

  ngOnInit() {}

  addToChart(): void {
    this.initQuantity(this.product);
    if(this.product.quantity === 0)
    {
      alert("You can't add 0 quantity")
      return;
    }
    let response = this.chartService.addToChart(this.product);
    if (response) alert('Addes to chart successfully');
  }

  increaseQuantity(): void {
    this.initQuantity(this.product);
    if (this.product.quantity >= 10) {
      alert('You exceed maximum quantity');
      this.product.quantity = 10;
      return;
    }
    this.product.quantity += 1;
    console.log('hit increase');
  }

  decreaseQuantity(): void {
    this.initQuantity(this.product);
    if (this.product.quantity <= 0) {
      alert('Quantity can not be negative');
      this.product.quantity = 0;
      return;
    }
    this.product.quantity -= 1;
    console.log('hit decrease');
  }

  initQuantity(product: Product): void {
    if (product.quantity === NaN || product.quantity === undefined)
      product.quantity = 0;
  }
}
