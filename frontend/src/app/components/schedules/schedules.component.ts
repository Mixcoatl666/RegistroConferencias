import { Component, OnInit, input, signal } from '@angular/core';
import { ConferenceService } from '../../services/conference.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css'
})
export class SchedulesComponent implements OnInit{
  //--------------
  confers:Array<any>;
  //--------------
  constructor(
    private conferenceService:ConferenceService,
    private router:Router,
  ){
    this.confers = [];
  }
  //--------------
  
  async ngOnInit() {
    this.confers = await this.conferenceService.groupTitles();
  }

  onSubmitGet(title:string){
    this.router.navigate([`/auth/confer/details/${title}`]);
    this.conferenceService.getOneConfer(title);
  }

}
