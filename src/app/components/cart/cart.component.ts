import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  myForm: FormGroup = new FormGroup({});

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.products = this.cartService.getProductsInCart();
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      creditCard: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
    });
  }

  calcuateTotalAmount(): number {
    let totalAmount: number = 0;
    for (let i = 0; i < this.products.length; i++) {
      totalAmount += this.products[i].quantity * this.products[i].price;
    }

    return totalAmount;
  }

  cancelOrder(): void {
    this.cartService.removeAllItemFromProduct();
    this.router.navigate(['']);
  }

  onProductRemoved(event: Product[]): void {
    this.products = event;
  }

  onSubmit(form: FormGroup) {
    console.log(form.value.price);
    console.log(form.value.name);
    this.router.navigate(['/confirmation']);
  }
}
