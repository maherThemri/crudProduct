import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProduitService } from 'src/app/services/produit/produit.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  product!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private produitService: ProduitService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.product = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      description: ["", [Validators.required, Validators.minLength(6)]],
      price: ["", [Validators.required]],
    });
  }

  addProduct() {
    if (this.product.valid) {
      console.log(this.product.value);
      this.produitService.saveProduct(this.product.value).subscribe({
        next: (data) => {
          console.log(data);
          this.toastr.success("Operation with success", "Good!");
          this.router.navigate(['']);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("Operation failed", "Oops!");
        }
      }
      );
    }

  }
  cancel(): void {
    this.router.navigate(['']);
  }
}
