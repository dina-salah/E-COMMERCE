import { error } from 'console';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);
  checkoutForm!: FormGroup;
  cartId:string='';

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: [null, [Validators.required]],
    });
    this.getcartid();
  }

  getcartid(){
    this.activatedRoute.paramMap.subscribe({
      next:(val)=>{
       this.cartId = val.get('id')!; 
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  
  submit(){
   this.orderService.sendCart(this.checkoutForm.value,this.cartId).subscribe({
    next:(res)=>{
      console.log(res);
      open(res.session.url,'_self')
     },
     error:(err)=>{
       console.log(err);
     }
   })
  }

}
