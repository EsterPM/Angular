import { inject, Injectable } from "@angular/core";
import { Lesson } from "../models/lesson.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { GetLessonsResponse } from "../models/get-lessons.response";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  //configuració global de l'entorn (com l'URL de l'API)
  env = environment;

  http = inject(HttpClient);

  async loadLessons(config: {
    courseId?: string,
    query?: string;
  }): Promise<Lesson[]> {

    const { courseId, query } = config;

    //l'objecte params amb els paràmetres que s'enviaran per URL
    let params = new HttpParams();

    //Si existeix, s'afegeix com a paràmetre.
    if (courseId) {
      params = params.set("courseId", courseId);
    }
    if (query) {
      params = params.set("query", query);
    }


    const lessons$ = this.http.get<GetLessonsResponse>(
      `${this.env.apiRoot}/search-lessons`,
      {
        params
      }
    )

    //espera la resposta de l'observable i la transforma en una promesa.
    const response = await firstValueFrom(lessons$);
    return response.lessons;
  }

}
