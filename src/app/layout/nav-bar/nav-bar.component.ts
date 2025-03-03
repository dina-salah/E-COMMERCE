import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component, inject, input, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/accAuth/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { MytranslationService } from '../../core/services/mytranslation/mytranslation.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit{
  authService = inject(AuthService);
  mytranslationService = inject(MytranslationService);
  isLogin = input<boolean>(true);
  savedLang:string = localStorage.getItem("lang")!;
  ngOnInit(): void {
    localStorage.setItem("lang",'en')
  }

  changeLang() {

    if(this.savedLang === 'en'){
      this.savedLang = 'ar';
    }else if(this.savedLang === 'ar'){
      this.savedLang = 'en';

    }
    this.mytranslationService.changeLangTrans(this.savedLang );
    console.log('lang');
  }
}
