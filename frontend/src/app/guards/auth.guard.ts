import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private router: Router, private userService:UserService) {}

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    // Verifica si sessionStorage está definido antes de intentar acceder a él
    let expectedRoles = next.data['roles'];
    //console.log(expectedRoles);
    this.userService.getRole();
    if (typeof sessionStorage !== 'undefined' || expectedRoles !== 'undefined') {
      const token = sessionStorage.getItem('tkn');
      let  currenUserRol = this.userService.userComputed();
      // Validaciones 
      if(token && currenUserRol === expectedRoles[0] ){
        //console.log(`Expect: ${expectedRoles}, Current: ${currenUserRol}`);
        /* if(currenUserRol === expectedRoles){
          return true;
        }else{
          //this.router.navigate(['/login']);
          return false; 
        } */
        return true;
      }else{
        this.router.navigate(['/user/login']);
        return false;
      }
    } else {
      // Si sessionStorage no está definido, redirige a la página de inicio de sesión por precaución
      this.router.navigate(['/user/login']);
      return false;
    }
  }
}

