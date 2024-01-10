import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produit } from 'src/app/models/product.model';
import { ProduitService } from 'src/app/services/produit/produit.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product: Produit = {};
  id?: number;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private productService: ProduitService
  ) { }

  ngOnInit(): void {
    this.findProductById();
  }

  findProductById() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.productService.findProductById(this.id!).subscribe({
      next: (data) => {
        this.product = data;
      }
    });
  }

  updateProduct() {
    this.productService.saveProduct(this.product).subscribe({
      next: (data) => {
        this.toastrService.success("Operation with success", "Good!");
        this.router.navigate(['']);
      },
      error: (err) => {
        this.toastrService.error("Operation failed", "Oops!");
      }
    });
  }
  cancel() {
    this.router.navigate(['']);
  }

}
