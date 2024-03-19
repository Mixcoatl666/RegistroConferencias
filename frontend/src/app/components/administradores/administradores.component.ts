import { Component, OnInit } from '@angular/core';
import { ConferenceService } from '../../services/conference.service';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrl: './administradores.component.css'
})
export class AdministradoresComponent implements OnInit{
  //----------
  public conferennces:Array<any>; 
  //----------
  constructor(
    private conferenceService:ConferenceService
  ){
    this.conferennces = new Array();
  }
  //----------
  ngOnInit(): void {
    this.getConferences();  
  }

  async getConferences(){
    this.conferennces = await this.conferenceService.listConfersAdm();
  }
}
