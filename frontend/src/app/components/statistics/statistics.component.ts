import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit{
  //-----------
  public confs:Array<any>;
  public registers:Array<any>;
  public f = 0;
  public m = 0;
  public porcent:Array<any>;

  //-----------
  constructor(
    private statistService:StatisticsService
  ){
    this.confs = new Array();
    this.registers =  new Array();
    this.porcent = new Array();
  }
  //-----------
  async ngOnInit() {
    this.confs = await this.statistService.analiticsConfer();
    console.log(this.confs);

    this.confs.forEach(confer => {
      for(let i=0; i< confer.Registrados.length;i++){
        this.registers.push(confer.Registrados[i]);
      }
    });
    console.log(this.registers);

    /* this.registers.forEach(conf =>{
      for(let i=0;i<conf.gen.length;i++){
        if(conf.gen[i]=='Femenino'){
          this.m++;
        }
        if(conf.gen[i]=='masculino'){
          this.h++;
        }
      }
    }); */
    this.registers.forEach(conf=>{
      for(let i=0; i<conf.Gen.length;i++){
        console.log(conf.Gen[i]);
        if(conf.Gen[i]=='Femenino'){
          this.f++;
        }
        if(conf.Gen[i]=='masculino'){
          this.m++;
        }
      }
      this.porcent.push({'F':(this.f/conf.Gen.length)*100,'M':(this.m/conf.Gen.length)*100});
      this.f=0;
      this.m=0;
      console.log(this.porcent);
    });

  }

}
