import { Injectable } from '@angular/core';
import { clienteAxios } from '../helpers/clienteAxios';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  //
  constructor() { }
  //
  //----------
  async getSoldOut(date:string){
    try {
      const {data} = await clienteAxios.get(`/statist/out/?date=${date}`);
      //console.log(data);
      return data;
    } catch (error) {
      console.log("Error Angular")
    }

  }

  // Estadisticas
  async analiticsConfer(){
    try {
      const token = sessionStorage.getItem('tkn');
      
      if(!token) return;
      //console.log("On edit try retur...");
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const {data} = await clienteAxios.get('/statist',config);
      //console.log(data);
      return data;
    } catch (error) {
      console.log("Error angular");
    }
  }
}
