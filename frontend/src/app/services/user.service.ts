import { Injectable } from '@angular/core';
import { clienteAxios } from '../helpers/clienteAxios';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //--------------
  
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
      console.log(data);
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
    } catch (error) {
      console.log("Error angular");
    }
  }
}
