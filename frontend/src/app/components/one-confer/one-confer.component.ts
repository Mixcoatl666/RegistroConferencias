import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConferenceService } from '../../services/conference.service';


@Component({
  selector: 'app-one-confer',
  templateUrl: './one-confer.component.html',
  styleUrl: './one-confer.component.css'
})
export class OneConferComponent implements OnInit{
  private id = this.route.snapshot.params['id'];
  public putConfer:any;
  //  Formulario de conferencias
  conferForm = this.fb.group({
    titulo: ['', [Validators.required]],
    descrip: ['', [Validators.required]], // Agregar el campo de sexo al formulario
    lugar: ['', [Validators.required]],
    //fecha: ['', [Validators.required]],
    horaInicio: ['', [Validators.required]],
    horaFin: ['', [Validators.required]],
    semblanza: ['', [Validators.required]],
    cupo:[0,[Validators.required]]
  });
  constructor(
    private fb : FormBuilder,
    private route:ActivatedRoute,
    private conferenceService:ConferenceService
  ){};
  
  async ngOnInit() {
    this.putConfer = await this.conferenceService.detalConf(this.id);
    this.conferForm.patchValue({
      titulo: this.putConfer.Titulo,
      descrip: this.putConfer.Descripcion,
      lugar: this.putConfer.Horario.Lugar,
      //fecha: this.putConfer.Horario.Fecha,
      horaInicio: this.putConfer.Horario.HoraInicio,
      horaFin: this.putConfer.Horario.HoraFin,
      semblanza: this.putConfer.Horario.Expositor.Semblanza,
      cupo:this.putConfer.Horario.CupoTotal
    });
    console.log(this.putConfer);
  }

  onSubmitConfer(){
    const { 
      titulo, 
      descrip, 
      lugar, 
      horaInicio, 
      horaFin, 
      semblanza, 
      cupo 
    } = this.conferForm.value;
    console.log(this.conferForm.value);
    this.conferenceService.editConf(this.id,this.conferForm.value);
  }
}
