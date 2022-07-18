import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  products: Product[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    let products = localStorage.getItem('purchasedProduct');
    if (products === null || products === undefined) this.products = [];
    else this.products = JSON.parse(products);
  }

  backToHome(): void {
    this.router.navigate(['']);
  }
}
