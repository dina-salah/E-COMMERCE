import { Component, inject, OnInit } from '@angular/core';
import { CartdetailsService } from '../../core/services/cart/cartdetails.service';
import { Icart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  private readonly cartdetailsService = inject(CartdetailsService);
  cartDetails:Icart={}as Icart;
  ngOnInit(): void {
    this.cartdetailsService.userCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails = res.data;
      }
    })
  }
  removeItem(id:string){
    this.cartdetailsService.deleteItem(id).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails = res.data;
      }
    })
  }

  clearCart(){
    this.cartdetailsService.clearCart().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message === 'success'){
          this.cartDetails = {} as Icart;
        }
       
      }
    })
  }

  updateQty(id:string, counter:number){
    this.cartdetailsService.updateQty(id,counter).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails = res.data;
      }
    })
  }
}
