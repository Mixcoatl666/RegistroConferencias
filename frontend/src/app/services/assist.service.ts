import { Injectable } from '@angular/core';
import { clienteAxios } from '../helpers/clienteAxios';


@Injectable({
  providedIn: 'root'
})
export class AssistService {
  //-----------
  constructor() { }
  //-----------
  async assitConference(id:string){
    //const id = '65f6ea2dc7bb0d3f94175a24';
    const token = sessionStorage.getItem('tkn');
    if(!token) return;
    try {
      const url = `/assist/${id}`;
        const config = {
          headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
          }
        }
      const { data } = await clienteAxios.post(url,undefined,config);
      console.log(data);
    } catch (error) {
      console.log("Error en angular"); 
    }
  }
}
