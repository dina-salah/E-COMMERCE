import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FrgtPassService } from '../../core/services/frgtPass/frgt-pass.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-verify-code',
  imports: [ReactiveFormsModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent {
    isSpin: boolean = false;
    private readonly router = inject(Router);
    private readonly frgtPassService = inject(FrgtPassService);
     private readonly toastrService = inject(ToastrService);
  
  
    verifyCodeForm: FormGroup = new FormGroup({
      resetCode: new FormControl(null, [Validators.required]),
      });
  
      verify() {
     
        if (this.verifyCodeForm.valid) {
        this.isSpin = true
        this.frgtPassService.verifyCode(this.verifyCodeForm.value).subscribe({
          next:(res)=>{
            this.isSpin = false
            console.log(res)
            this.toastrService.success(res.status);
            setTimeout(() => {
              this.router.navigate(['/reset-password']);
            }, 700);
          },
          error:(err)=>{
            this.isSpin = false;
            this.toastrService.error(err.status);
  
          }
        })
      }
    }

}
