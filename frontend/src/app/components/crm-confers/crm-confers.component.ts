import { Component, Input } from '@angular/core';
import { ConferenceService } from '../../services/conference.service';

@Component({
  selector: 'app-crm-confers',
  templateUrl: './crm-confers.component.html',
  styleUrl: './crm-confers.component.css'
})
export class CrmConfersComponent {
  @Input() confers:Array<any>;
  //--------
  constructor(
    private conferenceService:ConferenceService
  ){
    this.confers = new Array();
  }
  //--------
  changeStatus(id:string,status:boolean){
    if(status === false){
      status = true;
    }else{
      status = false;
    };
    this.conferenceService.changeStatusConf(id,status);
    console.log(status);
  }

  deleteConfer(id:string){

  }

} 
