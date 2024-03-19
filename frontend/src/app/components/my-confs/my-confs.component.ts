import { Component, OnInit} from '@angular/core';
import { ConferenceService } from '../../services/conference.service';

@Component({
  selector: 'app-my-confs',
  templateUrl: './my-confs.component.html',
  styleUrl: './my-confs.component.css'
})
export class MyConfsComponent implements OnInit{
  public conferences:Array<any> = new Array();
  constructor(
    private conferService:ConferenceService
  ){

  }
  ngOnInit() {
    this.loadConfs();
  }

  async loadConfs(){
    const data = await this.conferService.getMyConfers();
    this.conferences = data;
  }

}
