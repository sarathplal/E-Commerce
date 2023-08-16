import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';

const routes: Routes = [
  {
    path: "", redirectTo: "products", pathMatch: "full"
  },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  {
    path: "**", component: PagenotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
