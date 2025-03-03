import { Component, inject, OnInit } from '@angular/core';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from '../../core/services/products/products.service';
import { SearchPipe } from '../../shared/pipe/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JoinPipe } from '../../shared/pipe/join/join.pipe';
import { CurrencyPipe, SlicePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartdetailsService } from '../../core/services/cart/cartdetails.service';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { Iwishlist } from '../../shared/interfaces/iwishlist';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [SearchPipe, FormsModule, RouterLink, JoinPipe, SlicePipe, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartdetailsService = inject(CartdetailsService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishListService = inject(WishListService);
  wishListDetails: Iwishlist[] = [];
  // wishListDetails:BehaviorSubject<Iwishlist[]> = new BehaviorSubject<Iwishlist[]>([]) ;
  searchBar: string = '';
  productsData: Iproduct[] = [];
 

  ngOnInit(): void {
    this.getProductsData();
    this.productsInWishList();

  }
  getProductsData() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.productsData = res.data;
        console.log(this.productsData);
      }, error: (err) => {
        console.log(err);
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
  addToWishList(id: string) {
    this.wishListService.addToWishList(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message);
      }
    })
  }
  productsInWishList() {
    this.wishListService.getWishList().subscribe({
      next: (res) => {
        this.wishListDetails = res.data;
      }
    })
  }
  isProductInWishList(productId: string): boolean {
    return this.wishListDetails.some(item => item.id === productId);
    // return this.wishListDetails.getValue().some(item => item.id === productId);
  }
}
