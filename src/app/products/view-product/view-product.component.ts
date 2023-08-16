import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  product: any = {}

  constructor(private viewRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.viewRoute.params.subscribe({
      next: (res: any) => {
        const { id } = res
        console.log(id);

        // using id make a call to service to get details of that particular product with above id 
        this.api.viewProduct(id).subscribe({
          next: (result: any) => {
            this.product = result
          },
          error: (error: any) => {
            console.log(error);
          }
        })
      }
    })
  }

  // add to wishList method
  addtoWishlist(product: any) {
    this.api.addtoWishList(product).subscribe({
      next: (res: any) => {
        console.log(res);
        alert(res)
      },
      error: (err) => {
        console.log(err.error);
        alert(err.error)
      }
    })
  }

  // add to cart method
  addtoCart(product: any) {
    this.api.addtoCart(product).subscribe({
      next: (result) => {
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
