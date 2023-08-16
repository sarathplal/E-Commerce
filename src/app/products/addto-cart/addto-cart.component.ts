import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';


@Component({
  selector: 'app-addto-cart',
  templateUrl: './addto-cart.component.html',
  styleUrls: ['./addto-cart.component.css']
})
export class AddtoCartComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  allCartProducts: any = []
  totalCartAmount: number = 0
  checkOutClickStatus: boolean = false
  userName: any
  flat: any
  state: any
  pincode: any
  showSuccess: boolean = false
  showCancel: boolean = false
  showError: boolean = false
  showPaypal:boolean=false

  deliveryAddress = this.fb.group({
    userName: [''],
    flatNo: [''],
    state: [''],
    pincode: ['']
  })

  constructor(private api: ApiService, private fb: FormBuilder) {

  }


  ngOnInit(): void {
    this.getCart()
  }

//GetCart
  getCart() {
    this.api.viewCartitems().subscribe({
      next: (result) => {
        this.allCartProducts = result
        this.getCartTotalPrice()
        this.api.getCartCount()
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // GetCart total
  getCartTotalPrice() {
    let total = 0
    this.allCartProducts.forEach((item: any) => {
      total += item.total
      this.totalCartAmount = Math.ceil(total)
    })
    console.log(this.totalCartAmount);
  }

  // Delete Product
  deleteItem(id: any) {
    this.api.deleteItem(id).subscribe({
      next: (res: any) => {
        this.allCartProducts = res
        this.getCartTotalPrice()
        this.api.getCartCount()
      },
      error: (error: any) => {
        console.log(error);

      }
    })
  }
  // Increment Item
  incrementItem(id: any) {
    this.api.incrementItem(id).subscribe({
      next: (res) => {
        this.allCartProducts = res
        console.log(this.allCartProducts);
        // update total Price 
        this.getCartTotalPrice()
      }
    })
  }
  // Decrement item
  decrementItem(id: any) {
    this.api.decrementItem(id).subscribe({
      next: (res) => {
        this.allCartProducts = res
        // update total Price 
        this.getCartTotalPrice()
        // update cart count
        this.api.getCartCount()
      }
    })
  }
  // EmptyCArt item
  emptyCart() {
    this.api.emptyCart().subscribe({
      next: (res: any) => {
        this.allCartProducts = res
        this.totalCartAmount = 0
        this.api.getCartCount()
      }
    })
  }

  // Delivery Form validation check
  checkoutValidation() {
    if (this.deliveryAddress.valid) {
      this.checkOutClickStatus = true
      this.userName = this.deliveryAddress.value.userName
      this.flat = this.deliveryAddress.value.flatNo
      this.state = this.deliveryAddress.value.state
      this.pincode = this.deliveryAddress.value.pincode

    } else {
      alert("Invalid Form")
    }
  }

// Make payment 
  makePayment(){
    this.showPaypal=true
    this.initConfig()
  }

 // paypal Intergration step
  private initConfig(): void {
    let amount = this.totalCartAmount.toString()
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: amount,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: amount
              }
            }
          },

        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // Payment success
        this.showSuccess = true;
        // empty cart
        this.emptyCart()
        // payPal hidden
        this.showPaypal=false
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.showCancel = true;

      },
      onError: err => {
        console.log('OnError', err);
        this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        // this.resetStatus();
      }
    };
  }

}
