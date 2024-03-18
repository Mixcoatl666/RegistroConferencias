import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Conferencia } from '../../models/Conference';
import { ConferenceService } from '../../services/conference.service';
import { AssistService } from '../../services/assist.service';

@Component({
  selector: 'app-test-back',
  templateUrl: './test-back.component.html',
  styleUrl: './test-back.component.css'
})
export class TestBackComponent {

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
    private assistService:AssistService
  ){

  }

  //--------
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
  }
  /**
   * Funcion para asistir a una conferencia
   */
  onSubmitAssist(){
    console.log("Event click active...");
    this.assistService.assitConference();
  }
}
