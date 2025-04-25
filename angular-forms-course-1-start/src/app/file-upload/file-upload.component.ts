import { Component, Input } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { noop, of } from 'rxjs';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers: [
    //Angular no sap que ha d'utilitzar el teu component com a control de formulari si no l'hi dius amb aquest provider.
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent
    },
    //Necessari per la validació personalitzada
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FileUploadComponent
    }
  ],
  standalone: false
})

export class FileUploadComponent implements ControlValueAccessor, Validator {
  //Variables i propietats
  @Input()
  requiredFileType: string;
  fileName = '';
  fileUploadError = false;
  uploadProgress: number;
  onChange = (fileName: string) => { };
  onTouched = () => { };
  disabled: boolean = false;
  fileUploadSuccess = false;
  onValidatorChange = () => { };

  constructor(private http: HttpClient) {

  }

  //Simula un clic a l'input type="file" per obrir el diàleg de selecció de fitxers.
  onClick(fileUpload: HTMLInputElement) {
    this.onTouched();
    fileUpload.click();
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
          //Si finalitza correctament crida onChange amb el nom del fitxer.
          else if (event.type == HttpEventType.Response) {
            this.fileUploadSuccess = true;
            this.onChange(this.fileName);
            this.onValidatorChange();
          }
        });
    }
  }

  //Mètodes del ControlValueAccessor: Permeten que aquest component funcioni dins d'un formControl com si fos un <input> normal
  writeValue(value: any) {
    this.fileName = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }


  //s'utilitza per notificar a Angular quan el resultat de la validació pot haver canviat
  registerOnValidatorChange(onValidatorChange: () => void) {
    this.onValidatorChange = onValidatorChange;
  }

  //implementar la validació personalitzada
  validate(control: AbstractControl): ValidationErrors | null {

    if (this.fileUploadSuccess) {
      return null;
    }

    let errors: any = {
      requiredFileType: this.requiredFileType
    };

    if (this.fileUploadError) {
      errors.uploadFailed = true;
    }

    return errors;
  }
}
