import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from 'src/app/models/product.model';
import { ProduitService } from 'src/app/services/produit/produit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  products: Array<Produit> = [];
  constructor(
    private productService: ProduitService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.productService.findAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      }
    });
  }

  navigateToEdit(id?: number) {
    this.router.navigate([`edit-product/${id}`])
  }
  deleteProduct(id?: number) {
    Swal.fire({
      title: 'Confirm !',
      text: `Would you really want to delete this product ?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      cancelButtonColor: "#FF0000",
      confirmButtonColor: "#008000",
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProductById(id!).subscribe({
          next: () => {
            this.findAll();
            Swal.fire('Success', 'Product deleted', 'success');
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }

}
