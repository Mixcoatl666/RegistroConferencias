import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  if(!sessionStorage.getItem('tkn')){
    router.navigate(["/login"]);
    return false;
  }else{
    return true;
  }
};