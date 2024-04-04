import { Injectable, input, computed, signal } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { clienteAxios } from '../helpers/clienteAxios';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //--------------
  /*public perfil = input.required<any>();
  public infPer = computed(()=>{
    const {infoPer} = this.perfil();
    return Object.values(infoPer);
  });*/
  private user = signal<any>(undefined);
  private isLoged = signal<boolean>(false);
  public userComputed = computed(()=> this.user());
  public isLogedComputed = computed(()=> this.isLoged());
  //--------------
  constructor() { 
  
  }
  //--------------
  /**
   * Funcion para registrar un nuevo usuario
   * @param user usuario
   */
  async createUser(user:Usuario){
    try {
      const {data} = await clienteAxios.post('/user/register',user);
      //console.log(data);
      return data;
    } catch (error) {
      console.log(`Error Angular`);
    }
  }

  async login(email:string,pass:string){
    try {
      const {data} = await clienteAxios.post('/user/auth',{email,pass});
      //console.log(data);
      //console.log('storage');
      sessionStorage.setItem('tkn',data.lgUser.token);
      //sessionStorage.setItem('rol', data.lgUser.rol);
      this.isLoged.set(true);
      return data;
    } catch (error) {
      this.isLoged.set(false);
      console.log("Datos incorrectos");
    }
  }
  
  logout() {
    sessionStorage.removeItem('tkn');
    this.isLoged.set(false);
  }

  getRole(){
    try {
      const token = sessionStorage.getItem('tkn')!;
      const decode:any  = jwtDecode(token);
      this.user.set(decode.rol);
      this.isLoged.set(true);
      //console.log(this.user());
    } catch (error) {
      this.isLoged.set(false);
      this.user.set(undefined);
    }
  }
}
