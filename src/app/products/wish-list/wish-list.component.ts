import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  wishListItems: any = []
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.viewWishList().subscribe({
      next: (res) => {
        this.wishListItems = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  removeItem(id: any) {
    this.api.removeItem(id).subscribe({
      next: (result) => {
        this.wishListItems = result
      },
      error: (error) => {
        console.log(error);

      }
    })
  }

  // Add to cart
  addtoCart(product: any) {
    this.api.addtoCart(product).subscribe({
      next: (result) => {
        this.api.getCartCount()
        this.removeItem(product.id)
        alert(result)
      },
      error: (err) => {
        console.log(err.error);
      }
    })
  }

  // 
}
