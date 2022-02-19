import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageConventerService {

  constructor() { }

  createImage(image: Blob, imagePath: string) {
    return new Promise((resolve) => {
      if (image && image.size > 0) {
        const reader = new FileReader();
  
        reader.addEventListener("load", () => {
          resolve(reader.result);
        }, false);
        reader.readAsDataURL(image);
      } else {
        resolve(imagePath);
      }
    });
  }
}