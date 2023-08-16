import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  allProducts: any = []
  searchKey: string = ""
  constructor(private api: ApiService) {

  }
  ngOnInit(): void {

    this.api.getAllProducts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allProducts = res
      },
      error: (error: any) => {
        console.log(error);

      }
    })

    // get search key
    this.api.searchKey.subscribe({
      next: (key: any) => {
        this.searchKey = key
      }
    })
  }

  // addTocart
  addtoCart(product: any) {

    this.api.addtoCart(product).subscribe({
      next: (result: any) => {
        console.log(result);
        this.api.getCartCount()
        alert(result)
      },
      error: (err) => {
        console.log(err.error);
      }
    })
  }


}
