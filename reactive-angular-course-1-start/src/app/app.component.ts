import {Component, OnInit} from '@angular/core';
import { LoadingService } from './loading/loading.service';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [
      LoadingService //Tiene que estar importado en el principal
    ],
    standalone: false
})
export class AppComponent implements  OnInit {

    constructor() {

    }

    ngOnInit() {


    }

  logout() {

  }

}
