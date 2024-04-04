import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Conferencia } from '../../models/Conference';
import { ConferenceService } from '../../services/conference.service';
import { AssistService } from '../../services/assist.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-test-back',
  templateUrl: './test-back.component.html',
  styleUrl: './test-back.component.css'
})
export class TestBackComponent implements OnInit{
  public conferences:Array<any> = [];
  public confers:Array<any> = new Array();
  
  //-----------
  //  Formulario de conferencias
  conferForm = this.fb.group({
    titulo: ['', [Validators.required]],
    descrip: ['', [Validators.required]], // Agregar el campo de sexo al formulario
    lugar: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
    horaInicio: ['', [Validators.required]],
    horaFin: ['', [Validators.required]],
    semblanza: ['', [Validators.required]],
    foto: ['', [Validators.required]],
    cupo:[0,[Validators.required]]
  });

  //-----------
  constructor(
    private fb : FormBuilder,
    private conferenceService:ConferenceService,
    private assistService:AssistService,
    private router:Router
  ){

  }

  //--------
  async ngOnInit() {
    //this.getConfersDispo();
    this.confers = await this.conferenceService.groupTitles();

  }
  /**
   * Funcion para añadir una conferencia
   */
  onSubmitConfer(){
    const { 
      titulo, 
      descrip, 
      lugar, 
      fecha, 
      horaInicio, 
      horaFin, 
      semblanza, 
      foto, 
      cupo } = this.conferForm.value
    ;
    
    let nwConfer = new Conferencia(titulo!,descrip!);
    
    nwConfer.Horario.Lugar = lugar!;
    nwConfer.Horario.Fecha = fecha!;
    nwConfer.Horario.HoraInicio = horaInicio!;
    nwConfer.Horario.HoraFin = horaFin!;
    nwConfer.Horario.Expositor.Semblanza = semblanza!;
    nwConfer.Horario.Expositor.Foto = foto!;
    nwConfer.Horario.CupoTotal = Number(cupo);
    
    console.log(nwConfer)
    this.conferenceService.addConference(nwConfer);
    this.router.navigate(['/auth/myconfs']);
  }
  /**
   * Funcion para asistir a una conferencia
   */
  onSubmitAssist(id:string){
    console.log("Event click active...");
    this.assistService.assitConference(id);
  }
  //
  async getConfersDispo(){
    console.log("Get confers activated...");
    let confs;
    confs = await this.conferenceService.getConfsDisp();
    this.conferences = confs;
    console.log(confs)
  }
}
