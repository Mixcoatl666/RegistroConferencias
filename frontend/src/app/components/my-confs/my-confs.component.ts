import { Component, OnInit} from '@angular/core';
import { ConferenceService } from '../../services/conference.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-confs',
  templateUrl: './my-confs.component.html',
  styleUrl: './my-confs.component.css'
})
export class MyConfsComponent implements OnInit{
  public conferences:Array<any> = new Array();
  constructor(
    private conferService:ConferenceService,
    private route:ActivatedRoute,
    private router:Router
  ){

  }
  ngOnInit() {
    this.loadConfs();
  }

  async loadConfs(){
    const data = await this.conferService.getMyConfers();
    this.conferences = data;
  }

  getDetailConf(id:string){
    //const data = this.conferService.detalConf(id);
    this.router.navigate([`/confer/${id}`]);
  }

  deleteConfer(id:string){
    this.conferService.deleteConf(id);
  }
  
  
}
