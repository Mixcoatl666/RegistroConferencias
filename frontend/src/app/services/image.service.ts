import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { clienteAxios } from '../helpers/clienteAxios';
import { Image } from '../models/Image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly baseUrl = 'images'; // Ruta base para las solicitudes de imágenes

  constructor() {}

  // Subir una imagen
  uploadImage(file: File): Observable<Image> {
    const formData = new FormData();
    formData.append('image', file);

    return new Observable(observer => {
      clienteAxios.post(`${clienteAxios.defaults.baseURL}/${this.baseUrl}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
    });
  }

  // Borrar una imagen por ID
  deleteImage(id: string): Observable<Image> {
    return new Observable(observer => {
      clienteAxios.delete(`${clienteAxios.defaults.baseURL}/${this.baseUrl}/delete/${id}`)
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
    });
  }

  // Obtener todas las imágenes
  getAllImages(): Observable<Image[]> {
    return new Observable(observer => {
      clienteAxios.get<Image[]>(`${clienteAxios.defaults.baseURL}/${this.baseUrl}`)
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
    });
  }
}
