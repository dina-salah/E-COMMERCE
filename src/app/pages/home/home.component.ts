import { OwlOptions } from './../../../../node_modules/ngx-owl-carousel-o/lib/models/owl-options.model.d';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CatigoriesService } from '../../core/services/catigories/catigories.service';
import { Icatigories } from '../../shared/interfaces/icatigories';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SlicePipe } from '@angular/common';
import { JoinPipe } from '../../shared/pipe/join/join.pipe';
import { SearchPipe } from '../../shared/pipe/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartdetailsService } from '../../core/services/cart/cartdetails.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { Iwishlist } from '../../shared/interfaces/iwishlist';


@Component({
  selector: 'app-home',
  imports: [CarouselModule, SlicePipe, JoinPipe,SearchPipe,FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly catigoriesService = inject(CatigoriesService);
  private readonly cartdetailsService = inject(CartdetailsService);
  private readonly toastrService = inject(ToastrService);
    private readonly wishListService = inject(WishListService);
    wishListDetails: Iwishlist[] = [];

  productsData: Iproduct[] = [];
  catigoriesData: Icatigories[]= [];
  searchBar:string ="";

  getProductsData() {
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.productsData = res.data;
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  getCatigory(){
    this.catigoriesService.getAllCate().subscribe({
      next:(res)=>{
        this.catigoriesData = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.getProductsData();
    this.getCatigory();
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplayTimeout: 3500,
    rtl:true,
    autoplay:true,
    autoplayHoverPause:true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

   
    slider: OwlOptions = {
      loop: true,

      mouseDrag: true,
      touchDrag: false,
      pullDrag: true,
      rtl:true,
      autoplay:true,
      autoplaySpeed:5000,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      items:1,
      nav: true
    }

    addProduct(id:string){
      this.cartdetailsService.addItem(id).subscribe({
        next:(res)=>{
          console.log(res);
          this.toastrService.success(res.message)
        },
        error:(err)=>{
          console.log(err);
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
    }
}
