import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Ibrand } from '../../shared/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
  private readonly brandsService = inject(BrandsService);

  brandsData:Ibrand[] = [];
  ngOnInit(): void {
    this.brandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res);
        this.brandsData = res.data;
      }
    })

  }

}
