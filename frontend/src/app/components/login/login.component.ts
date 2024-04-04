import { Component, computed, input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
//import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  //------------

  loginForm = this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password:['',[Validators.required]]
  });
  //------------
  constructor(
    private fb:FormBuilder,
    //private authService: AuthService,
    private router: Router,
    private userService:UserService
  ) {}

  //------------
  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

    async login() {
    console.log('Se obtienen los datos');
    try {
      const {email, password} = this.loginForm.value;
      // Lógica de autenticación aquí
      const perfil = await this.userService.login(email!,password!);
      //console.log(perfil);
      console.log(perfil);
      
      if(perfil != undefined ){
        setTimeout(() => {
          this.router.navigate(["/auth/home"]);
        }, 300);
      }
    } catch (error) {
      console.log("Erro Angular");
    }

  }

  redirectTo(url:string){
    this.router.navigate([`/${url}`]);
  }
  
}
