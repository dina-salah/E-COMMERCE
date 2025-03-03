import { SlicePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { JoinPipe } from '../../shared/pipe/join/join.pipe';
import { CatigoriesService } from '../../core/services/catigories/catigories.service';
import { Icatigories } from '../../shared/interfaces/icatigories';

@Component({
  selector: 'app-categories',
  imports: [SlicePipe,JoinPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  private readonly catigoriesService = inject(CatigoriesService);


  catigoriesData:Icatigories[] = [];  

  ngOnInit(): void {
    this.catigoriesService.getAllCate().subscribe({
      next:(res)=>{
        // console.log(res);
        this.catigoriesData = res.data;
      }
    })
  }

}
