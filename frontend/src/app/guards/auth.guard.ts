import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const token = sessionStorage.getItem('tkn');
  if(!token){
    router.navigate(["/login"]);
    return false;
  }else{
    return true;
  }
};