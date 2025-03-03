import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FrgtPassService } from '../../core/services/frgtPass/frgt-pass.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  isSpin: boolean = false;
  private readonly router = inject(Router);
  private readonly frgtPassService = inject(FrgtPassService);
  private readonly toastrService = inject(ToastrService);


  resetPassForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
  });

  verify() {

    if (this.resetPassForm.valid) {
      this.isSpin = true
      this.frgtPassService.newPass(this.resetPassForm.value).subscribe({
        next: (res) => {
          this.isSpin = false
          console.log(res)
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 700);
        },
        error: (err) => {
          this.isSpin = false;
          this.toastrService.error(err.status);

        }
      })
    }
  }


}
