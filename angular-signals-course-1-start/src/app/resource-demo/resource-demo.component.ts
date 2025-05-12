import {Component, effect, inject, resource, signal} from "@angular/core";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {environment} from "../../environments/environment";
import {Lesson} from "../models/lesson.model";


@Component({
  selector: 'resource-demo',
  templateUrl: './resource-demo.component.html',
  styleUrls: ['./resource-demo.component.scss'],
  imports: [MatProgressSpinner]
})
export class ResourceDemoComponent {

  env = environment;

  search = signal<string>('');

  //Creem un resource, un tipus especial de signal que permet fer càrregues de dades asíncrones amb dependències reactives (en aquest cas, la cerca).
  lessons = resource<Lesson[], {search:string}>({
    request: () => ({
      search: this.search()
    }),
    //abortSignal que Angular pot utilitzar per cancel·lar càrregues anteriors si es fa una nova cerca abans que la resposta arribi.
    loader: async ({request, abortSignal}) => {
      const response = await
        fetch(`${this.env.apiRoot}/search-lessons?query=${request.search}&courseId=18`,
          {
            signal: abortSignal
          });
      const json = await response.json();
      return json.lessons;
    }
  });


  constructor() {

    effect(() => {
      console.log('searching lessons:', this.search() );
    })
  }

  searchLessons(search: string) {
    this.search.set(search);
  }

  reset() {

  }

  reload() {

  }
}
