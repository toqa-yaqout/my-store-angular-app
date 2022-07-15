import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/models/product';

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
      name: ['', Validators.required],
      address: ['', Validators.required],
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

  increaseQuantity(product: Product): void {
    if (product.quantity >= 10) {
      alert('You exceed maximum quantity');
      product.quantity = 10;
      return;
    }
    product.quantity += 1;
    console.log('hit increase');
  }

  decreaseQuantity(product: Product): void {
    if (product.quantity <= 0) {
      alert('Quantity can not be negative');
      product.quantity = 0;
      return;
    }
    product.quantity -= 1;
    console.log('hit decrease');
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

  onSubmit(form: FormGroup) {
    console.log(form.value.price);
    console.log(form.value.name);
    this.router.navigate(['/confirmation']);

    // console.log('Valid?', form.valid); // true or false
    // console.log('Name', form.value.name);
    // console.log('Email', form.value.email);
    // console.log('Message', form.value.message);
  }
}
