import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isListShown: boolean = true;
  detailedProduct: Product = new Product();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onProductDetails(event: Product): void {
    this.isListShown = false;
    this.detailedProduct = event;
  }

  showList(): void{
    this.isListShown = true;
  }
}
