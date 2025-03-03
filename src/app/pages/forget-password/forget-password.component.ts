import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FrgtPassService } from '../../core/services/frgtPass/frgt-pass.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  isSpin: boolean = false;
  private readonly router = inject(Router);
  private readonly frgtPassService = inject(FrgtPassService);
   private readonly toastrService = inject(ToastrService);


  forgetForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    });

    verify() {
   
      if (this.forgetForm.valid) {
      this.isSpin = true
      this.frgtPassService.forgetPass(this.forgetForm.value).subscribe({
        next:(res)=>{
          this.isSpin = false
          console.log(res)
          this.toastrService.success(res.message);
          setTimeout(() => {
            this.router.navigate(['/verify-code']);
          }, 700);
        },
        error:(err)=>{
          this.isSpin = false;
          this.toastrService.error(err.message);

        }
      })
    }
  }


}
