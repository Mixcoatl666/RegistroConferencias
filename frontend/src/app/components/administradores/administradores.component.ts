import { Component, OnInit } from '@angular/core';
import { ConferenceService } from '../../services/conference.service';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/Image';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrl: './administradores.component.css'
})
export class AdministradoresComponent implements OnInit{
  //----------
  public conferennces:Array<any>; 
  
  //----------
  constructor(
    private conferenceService:ConferenceService,
    private imageService:ImageService
  ){
    this.conferennces = new Array();
  }
  
  //----------
  ngOnInit(): void {
    this.getConferences();  
  }

  async getConferences(){
    this.conferennces = await this.conferenceService.listConfersAdm();
  }

  //Aqui esta el cliente para poder recibir y subir imagenes
  selectedFile: File | null = null;
  images: Image[] = [];

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(): void {
    if (this.selectedFile) {
      this.imageService.uploadImage(this.selectedFile).subscribe((image: Image) => {
        console.log('Imagen subida:', image);
        this.selectedFile = null;
        this.loadImages();
      }, error => {
        console.error('Error al subir imagen:', error);
      });
    }
  }

  deleteImage(id: string): void {
    this.imageService.deleteImage(id).subscribe((deletedImage: Image) => {
      console.log('Imagen borrada:', deletedImage);
      this.loadImages();
    }, error => {
      console.error('Error al borrar imagen:', error);
    });
  }

  loadImages(): void {
    this.imageService.getAllImages().subscribe((images: Image[]) => {
      this.images = images;
    }, error => {
      console.error('Error al obtener imágenes:', error);
    });
  }
  // Fin para el cliente imagenes
}
