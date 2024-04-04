import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AssistService } from '../../services/assist.service';
import { ConferenceService } from '../../services/conference.service';

@Component({
  selector: 'app-user-confs',
  templateUrl: './user-confs.component.html',
  styleUrl: './user-confs.component.css'
})
export class UserConfsComponent {
  public conferences:Array<any>;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private asistService:AssistService,
    private conferService:ConferenceService
  ){
    this.conferences =  new Array();
  }
  ngOnInit() {
    this.loadConfs();
  }

  async loadConfs(){
    this.conferences = await this.asistService.getConfer();
  }



  deleteConfer(id:string){
    //this.conferService.deleteConf(id);
    this.asistService.unAssitsConf(id);
    console.log('Para quitar asistencia');
    this.router.navigate(['/auth/home']);
  }
  
}
