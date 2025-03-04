import { routes } from './../../app.routes';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { AuthService } from '../../core/services/accAuth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isSpin: boolean = false;
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  errorMes: string = '';

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, { updateOn: 'submit', validators: [this.confirmPassword] })

  submit() {

    if (this.registerForm.valid) {
      this.isSpin = true
      this.authService.sendRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          this.isSpin = false
          if (res.message == 'success') {
            setTimeout(() => {
              this.router.navigate(['/login'])
            }, 1000);

            // acc created
          }
        },
        error: (err) => {
          this.isSpin = false
          console.log(err);
          this.errorMes = err.error.message;

        }
      })
    }
  }

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { mismatch: true };
  }

  navTologin(): void {
    setTimeout(() => {
      this.router.navigate(['/login'])
    }, 1000);
  }



}
