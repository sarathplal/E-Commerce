import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { AddtoCartComponent } from './addto-cart/addto-cart.component';
import { ViewProductComponent } from './view-product/view-product.component';

const routes: Routes = [
  { path: '', component: AllProductsComponent },
  {
    path: "wish-list", component: WishListComponent
  },
  {
    path: "addtoCart", component: AddtoCartComponent
  },
  {
    path: "view-product/:id", component: ViewProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
