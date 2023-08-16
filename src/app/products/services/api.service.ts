import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // searvh key
  searchKey=new BehaviorSubject("")
  // cartCOunt
  cartCount = new BehaviorSubject(0)
  // Base URL
  baseUrl = "http://localhost:3000"

  // Dependency Injection 1.HttpClient--> To make api calls .
  constructor(private http: HttpClient) {
    this.getCartCount()
  }


  // get all products
  getAllProducts() {

    return this.http.get(`${this.baseUrl}/products/get-all-products`)

  }

  // View Product
  viewProduct(id: any) {
    return this.http.get(`${this.baseUrl}/products/view-product/${id}`)
  }

  // Addto wishlist
  addtoWishList(product: any) {

    // make api call to services
    const body = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price
    }
    // make api call to server
    return this.http.post(`${this.baseUrl}/whishList/add-product`, body)

  }
  // view wishLIst
  viewWishList() {
    return this.http.get(`${this.baseUrl}/wishList/all-products`)
  }

  // remove from WhishList Item
  removeItem(id: any) {
    return this.http.delete(`${this.baseUrl}/wishList/delete-item/${id}`)
  }

  // addToCart
  addtoCart(product: any) {
    // make api call to service
    const body = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: 1
    }
    // make api call
    return this.http.post(`${this.baseUrl}/cart/add-product`, body)

  }

  // view cart Items
  viewCartitems() {
    return this.http.get(`${this.baseUrl}/cart/view-products`)
  }

  // getcart count
  getCartCount() {
    this.viewCartitems().subscribe({
      next: (result: any) => {
        return this.cartCount.next(result.length)
      },
      error: (err) => {
        console.log(err);

      },
    })
  }

  // Delete an item from cart
  deleteItem(id: any) {
    return this.http.delete(`${this.baseUrl}/cart/delete-item/${id}`)
  }
  // Increment Item From Cart
  incrementItem(id: any) {
    return this.http.get(`${this.baseUrl}/cart/increment-item/${id}`)
  }
  // decrement item from cart
  decrementItem(id: any) {
    return this.http.get(`${this.baseUrl}/cart/decrement-item/${id}`)
  }
  // Empty Cart
  emptyCart(){
   return this.http.delete(`${this.baseUrl}/cart/empty-cart`)
  }

}
