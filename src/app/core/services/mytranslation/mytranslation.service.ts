import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import {TranslateService} from '@ngx-translate/core'
import { get } from 'http';

@Injectable({
  providedIn: 'root'
})
export class MytranslationService {
  
  private readonly renderer2 = inject(RendererFactory2).createRenderer(null,null);

  constructor(private translateService:TranslateService , @Inject(PLATFORM_ID) private id:object) {
  if(isPlatformBrowser(this.id)){
      // logic
    // 1-deful lang
    this.translateService.setDefaultLang("en");
    // 2- get lang local storage
    const savedLang  = localStorage.getItem("lang");

    // 3- use lang in local storage
    if(savedLang){
      this.translateService.use(savedLang);
    }
  }
   }
changeDir():void{
  
  if (localStorage.getItem("lang")==='en') {
    this.renderer2.setAttribute(document.documentElement , 'dir', 'ltr');
    this.renderer2.setAttribute(document.documentElement , 'lang', 'en');
   }else if(localStorage.getItem("lang")=== 'ar'){
    this.renderer2.setAttribute(document.documentElement , 'dir', 'rtl');
    this.renderer2.setAttribute(document.documentElement , 'lang', 'ar');


   }
}

changeLangTrans(lang:string):void{
  localStorage.setItem('lang',lang);
  this.translateService.use(lang);
  this.changeDir();
}
}
