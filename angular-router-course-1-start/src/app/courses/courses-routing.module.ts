import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { CourseResolver } from './services/course.resolver';
import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { LessonDetailComponent } from './lesson/lesson-detail.component';

//Perquè funcioni lazy loading:
//El CoursesModule ha de tenir el seu Routing Module (CoursesRoutingModule) amb rutes pròpies.

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },

  //Angular capturarà qualsevol subruta de /courses
  //El :courseUrl és un placeholder que pot coincidir amb qualsevol valor dins de l'URL.
  {
    path: ":courseUrl",
    component: CourseComponent,
    //Les rutes fill permeten que un component pare (CourseComponent) mostri dins seu components diferents depenent de la ruta.
    children: [
      {
        path: "",
        component: LessonsListComponent,
      },
      {
        path: "lessons/:lessonSeqNo",
        component: LessonDetailComponent,
      }
    ],
    //Abans de mostrar-lo, Angular crida el CourseResolver, que carrega el curs des d'un servei.
    resolve: {
      course: CourseResolver
    }
  }
];

@NgModule({
  //S'ha d'usar RouterModule.forChild() (no forRoot()).
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  //registres el CourseResolver perquè Angular pugui injectar-lo quan es necessiti.
  providers: [
    CourseResolver
  ]
})
export class CoursesRoutingModule {



}
