import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  //-------
  public category = '';
  @Output() sendFilter =  new EventEmitter();
  //-------
  constructor(){}
  //-------
  getFilter(){
    // solo si se ha seleccionado la caegoria haz:
    if(this.category !=''){
      this.sendFilter.emit(this.category);
      console.log(this.category);
    }
  }
}
