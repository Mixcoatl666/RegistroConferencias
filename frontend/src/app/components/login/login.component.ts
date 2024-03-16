import { Component } from '@angular/core';
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

  login() {
    console.log('Se obtienen los datos');
    try {
      const {email, password} = this.loginForm.value;
      // Lógica de autenticación aquí
      this.userService.login(email!,password!);
      this.router.navigate(["home"]);
    } catch (error) {
      
    }

  }
  
}
