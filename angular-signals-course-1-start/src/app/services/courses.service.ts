import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpContext } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { firstValueFrom } from "rxjs";
import { Course } from "../models/course.model";
import { GetCoursesResponse } from "../models/get-courses.response";
import { SkipLoading } from "../loading/skip-loading.component";


@Injectable({
  providedIn: "root"
})
export class CoursesService {

  http = inject(HttpClient);

  env = environment;

  async loadAllCourses(): Promise<Course[]> {
    const courses$ =
      this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`);

    //Com que HttpClient.get() retorna un Observable, el converteixes a una Promise amb firstValueFrom().
    const response = await firstValueFrom(courses$);
    return response.courses;
  }

  //Accepta un objecte parcial (Partial<Course>) perquè potser no tens tots els camps (p. ex. l'id el genera el servidor).
  async createCourse(course: Partial<Course>): Promise<Course> {
    const course$ =
      this.http.post<Course>(`${this.env.apiRoot}/courses`, course)
    return firstValueFrom(course$);
  }

  //Passes l'id del curs i només els camps modificats (changes).
  async saveCourse(courseId: string,
    changes: Partial<Course>): Promise<Course> {
    const course$ =
      this.http.put<Course>(`${this.env.apiRoot}/courses/${courseId}`,
        changes)
    return firstValueFrom(course$);
  }

  //Retorna la Promise de la resposta (que podria ser buida).
  async deleteCourse(courseId: string) {
    const delete$ =
      this.http.delete(`${this.env.apiRoot}/courses/${courseId}`);
    return firstValueFrom(delete$);
  }
}
