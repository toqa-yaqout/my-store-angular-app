import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId: number = 0;
  product: Product = new Product();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let id: any = params.get('id');
      this.productId = parseInt(id);
    });
    
    if (this.productId !== 0) {
      let products: Product[] = [];
      this.productService.getProducts().subscribe((data) => {
        products = data;
        let product = products.find((e) => e.id === this.productId);
        if (product === null || product === undefined) product = new Product();

        this.product = product;
      });
    }
  }
}
