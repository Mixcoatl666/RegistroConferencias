import { Component, OnInit } from '@angular/core';
import { ConferenceService } from '../../services/conference.service';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrl: './administradores.component.css'
})
export class AdministradoresComponent implements OnInit{
  //----------

  //----------
  constructor(
    private conferenceService:ConferenceService
  ){}
  //----------
  ngOnInit(): void {
    this.getConferences();  
  }

  getConferences(){
    this.conferenceService.listConfersAdm();
  }
}
