import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: Product = new Product();
  @Output() backToList = new EventEmitter();
  productId: number = 0;

  constructor() {}

  ngOnInit() {}

  backToProductList(): void {
    this.backToList.emit();
  }
}
