import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    // Verifica si sessionStorage está definido antes de intentar acceder a él
    if (typeof sessionStorage !== 'undefined') {
      const token = sessionStorage.getItem('tkn');
      const rol = sessionStorage.getItem('rol');
      if (!token) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    } else {
      // Si sessionStorage no está definido, redirige a la página de inicio de sesión por precaución
      this.router.navigate(['/login']);
      return false;
    }
  }
}
