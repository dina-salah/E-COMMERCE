import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { authGuard } from './core/gaurd/auth.guard';
import { loggedinGuard } from './core/gaurd/loggedin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
        title: 'login',
        canActivate: [loggedinGuard]
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
        title: 'register',
        canActivate: [loggedinGuard]
      },
      {
        path: 'forget-password',
        loadComponent: () => import('./pages/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent),
        title: 'forget-password',
        canActivate: [loggedinGuard]
      },
      {
        path: 'verify-code',
        loadComponent: () => import('./pages/verify-code/verify-code.component').then(m => m.VerifyCodeComponent),
        title: 'verify-code',
        canActivate: [loggedinGuard]
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
        title: 'reset-password',
        canActivate: [loggedinGuard]
      },
    ],
  },

  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        title: 'home',
        canActivate: [authGuard]
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
        title: 'cart',
        canActivate: [authGuard]
      },
      {
        path: 'brand',
        loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent),
        title: 'brand',
        canActivate: [authGuard]
      },
      {
        path: 'categories',
        loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent),
        title: 'categories',
        canActivate: [authGuard]
      },
      {
        path: 'checkout/:id',
        loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
        title: 'checkout',
        canActivate: [authGuard]
      },
      {
        path: 'product',
        loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
        title: 'product',
        canActivate: [authGuard]
      },
      {
        path: 'wishlist',
        loadComponent: () => import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent),
        title: 'wishlist',
        canActivate: [authGuard]
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent),
        title: 'details',
        canActivate: [authGuard]
      },
      {
        path: '**',
        loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent),
      },
    ],
  },
];
