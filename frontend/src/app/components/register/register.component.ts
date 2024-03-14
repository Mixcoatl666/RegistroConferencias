import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
//import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Corregir styleUrl a styleUrls
})
export class RegisterComponent {

  registerForm = this.fb.group({
    nombre: ['', [Validators.required]],
    sexo: ['', [Validators.required]], // Agregar el campo de sexo al formulario
    email: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required]],
    confirmPass: ['', [Validators.required, this.passwordMatchValidator()]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    //private usuarioService: UsuarioService
    ){ }

  /*onSubmit(){
    this.usuarioService.createUsuario(usuario)
  }*/

  get email(){
    return this.registerForm.controls['email']
  }

  // Definir el control para el campo "sexo"
  get sexo(){
    return this.registerForm.controls['sexo']
  }

  get nombre(){
    return this.registerForm.controls['nombre']
  }

  get pass(){
    return this.registerForm.controls['pass']
  }

  get confirmPass(){
    return this.registerForm.controls['confirmPass']
  }
  // Definir opciones para el campo de selección de sexo
  sexoOptions = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Femenino', value: 'femenino' }
  ];

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pass = control.parent?.get('pass');
      const confirmPass = control.parent?.get('confirmPass');

      if (pass && confirmPass && pass.value !== confirmPass.value) {
        return { 'passwordMismatch': true };
      }

      return null;
    };
  }
}