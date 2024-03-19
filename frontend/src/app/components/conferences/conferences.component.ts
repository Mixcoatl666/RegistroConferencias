import { Component, OnInit } from '@angular/core';
import { ConferenceService } from '../../services/conference.service';
import { AssistService } from '../../services/assist.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrl: './conferences.component.css'
})
export class ConferencesComponent implements OnInit{
  //---------
  public listConferences:Array<any>;
  //---------
  constructor(
    private confersService:ConferenceService,
    private assistSerice:AssistService,
    private router:Router
  ){
    this.listConferences = new Array();
  }
  //---------
  async ngOnInit() {
    await this.getConferences();
  }
  /**
   * Funcion que muestra las conferencias 
   * aprovadas por el administrador 
   */
  async getConferences(){
    try{
      this.listConferences = await this.confersService.getConfsDisp();
    }catch(error){
      console.log("Erro en Angular");
    }
  }

  onSubmitAssist(id:string){
    this.assistSerice.assitConference(id);
  }
  onSubmitGet(title:string){
    this.router.navigate([`/confer/details/${title}`]);
    this.confersService.getOneConfer(title);
  }
}
