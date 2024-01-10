import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

const routes: Routes = [
  { path: "", component: ProductsTableComponent },
  { path: "add-product", component: AddProductComponent },
  { path: "edit-product/:id", component: EditProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
