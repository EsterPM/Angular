import { Component, Input } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { noop, of } from 'rxjs';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  standalone: false
})

export class FileUploadComponent {
  @Input()
  requiredFileType: string;

  fileName = '';
  fileUploadError = false;
  uploadProgress: number;

  constructor(private http: HttpClient) {

  }

  onFileSelected(event) {
    //el primer fitxer seleccionat
    const file: File = event.target.files[0];

    if (file) {
      //Assigna el nom del fitxer a la variable fileName
      this.fileName = file.name;

      //objecte FormData per enviar el fitxer com si fos un formulari.
      const formData = new FormData();
      //Hi afegeixes el fitxer amb el nom "thumbnail" (ha de coincidir amb el que espera el backend).
      formData.append("thumbnail", file);
      this.fileUploadError = false;

      //Petició post
      this.http.post("/api/thumbnail-upload", formData, {
        reportProgress: true, //indica que volem informació sobre l'estat de la pujada
        observe: 'events' //fa que la resposta retorni diversos esdeveniments
      })
        .pipe(
          catchError(error => {
            this.fileUploadError = true;
            return of(error);
          }),
          //quan tot ha acabat (sigui correcte o error), es reinicia el valor de uploadProgress
          finalize(() => {
            this.uploadProgress = null;
          })
        )
        //Cada vegada que arriba un esdeveniment, comprova si és del tipus UploadProgress
        .subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          }
        });
    }
  }
}
