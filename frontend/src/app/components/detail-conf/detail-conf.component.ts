import { Component, OnInit } from '@angular/core';
import { ConferenceService } from '../../services/conference.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detail-conf',
  templateUrl: './detail-conf.component.html',
  styleUrl: './detail-conf.component.css'
})
export class DetailConfComponent implements OnInit{
  //---------
  public dataConfs;
  //---------
  constructor(
    private conferServices:ConferenceService,
    private acRuter:ActivatedRoute
  ){
    this.dataConfs=new Array();
  }
  //---------
  async ngOnInit() {
    await this.getHoras();
  }
  async getHoras(){
    let title = this.acRuter.snapshot.params['title'];
    let data = await this.conferServices.getOneConfer(title);
    this.dataConfs = data.horarios;
  }
}
