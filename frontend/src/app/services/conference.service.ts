import { Injectable } from '@angular/core';
import { clienteAxios } from '../helpers/clienteAxios';
import { Conferencia } from '../models/Conference';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {
  //-----------
  constructor() { }
  //-----------
  /**
   * Funcion para agregar una nueva conferencia o un nuevo horario
   * @param conference conferencia
   * @returns mensaje
   */
  async addConference(conference:Conferencia){
    try {
      const token = sessionStorage.getItem('tkn');
    
      if(!token) return;
  
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post('/confer',conference,config);
      return data;
    }catch(error){
      console.log("Faltan Datos");
    }
  }
  //
  async listConfersAdm(){
    //console.log('empieza try..')
    try {
      
      const { data } = await clienteAxios.get('/confer/adm');
      //console.log(data);
      return data;
    } catch (error) {
      console.log("Error en Angular")
    }
  }
  //
  async getConfsDisp(){
    try {
      const { data } = await clienteAxios.get('/confer/pbl');
      //console.log(data);
      return(data);
    } catch (error) {
      console.log("Error Angular");
    }
  }
  //
  async changeStatusConf(id:string,status:boolean){
    try {
      const url = `/confer/adm/?id=${id}&status=${status}`;
      const { data } = await clienteAxios.put(url,status);
      //console.log(data);
      return data;
    } catch (error) {
      console.log("Error angular");
    }
  }
  // 
  async getOneConfer(titulo:string){
    const url = `/confer/title/${titulo}`;
    try {
      const { data } = await clienteAxios.get(url);
      //console.log(data);
      return data;
    } catch (error) {
      console.log("Error de angular")
    }
  }
  //
  async getMyConfers(){
    try {
      const token = sessionStorage.getItem('tkn');
      if(!token) return;
  
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.get('/confer',config);
      //console.log(data);
      return data;
    } catch (error) {
      console.log("Error Angular");      
    }
  }
  //
  async detalConf(id:string){
    try {
      const token = sessionStorage.getItem('tkn');
      
      if(!token) return;
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.get(`/confer/${id}`,config);
      //console.log(data);
      return data;
    } catch (error) {
      console.log("Error en angular");
    }
  }
  //
  async editConf(id:string,confer:any){
    //console.log("On edit...");
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
      const { data } = await clienteAxios.put(`/confer/${id}`,confer,config);
      //console.log(data);
      return data;
    }catch(error){
      console.log("Error en Angular")
    }
  }
  //
  async deleteConf(id:string){
    try {
      const {data} = await clienteAxios.delete(`/confer/${id}`);
      //console.log(data);
      return data;
    } catch (error) {
      console.log("Error Angular");
    }
  }

  async groupTitles(){
    try {
      const {data} = await clienteAxios.get('/confer/titles');
      //console.log(data);
      return data;
    } catch (error) {
      console.log("Error Angular");
    }
  }

  async confersDate(date:string){
    try{
      const {data} = await clienteAxios.get(`/confer/date/?date=${date}`);
      //console.log(data);
      return data;
    }catch(error){
      console.log("Error angular");
    }
  }
  //-----------
}
