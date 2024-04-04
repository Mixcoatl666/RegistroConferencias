import { Component, Input, OnInit, DoCheck, OnChanges, SimpleChanges } from '@angular/core';

declare var $:any;


@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit, DoCheck, OnChanges{
  //props
  @Input() porcent:number;
  public porcentaje:number;
  
  //constr
  constructor(){
    this.porcent = 0;
    this.porcentaje = 0;
  }

  //meths
  ngOnChanges(changes: SimpleChanges): void {
    this.porcentaje = Number((this.porcent/100).toFixed(2));
    //console.log(porcentaje);
    $('#circle').circleProgress({value:this.porcentaje});
    //Cambiar el color de acuerdo al porcentaje 
    if(this.porcentaje > 1){
      $('#circle').circleProgress({fill:{gradient:["#DC2626","orange"]}})
    }else{
      $('#circle').circleProgress({fill:{gradient:["aqua","blue"]}})
    }
  }

  ngOnInit(): void {
    this.settingGraphic(0);
  }

  ngDoCheck(): void {}

  settingGraphic(value:number){
    $('#circle').circleProgress({
      value: value,
      size: 200,
      fill: {
        gradient: ["aqua", "blue"]
      }
    });
  }
}