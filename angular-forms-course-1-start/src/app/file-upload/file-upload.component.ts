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


  onFileSelected(event) {
    //el primer fitxer seleccionat
    const file: File = event.target.files[0];

    if (file) {
      //Assigna el nom del fitxer a la variable fileName
      this.fileName = file.name;
      console.log(this.fileName);
    }

  }

}
