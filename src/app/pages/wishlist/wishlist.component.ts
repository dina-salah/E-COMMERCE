import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { Iwishlist } from '../../shared/interfaces/iwishlist';
import { CurrencyPipe } from '@angular/common';
import { CartdetailsService } from '../../core/services/cart/cartdetails.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  private readonly wishListService = inject(WishListService);
  private readonly cartdetailsService = inject(CartdetailsService);
  private readonly toastrService = inject(ToastrService);
  wishListDetails: Iwishlist[] = [];
  ngOnInit(): void {
    this.wishListService.getWishList().subscribe({
      next: (res) => {
        console.log(res.data);
        this.wishListDetails = res.data;
      }
    })
  }
  removeItem(id: string) {
    this.wishListService.removeFromWishList(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.wishListDetails = res.data;
      }
    })
  }
  addProduct(id: string) {
    this.cartdetailsService.addItem(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message)
      }
    })
  }

}
