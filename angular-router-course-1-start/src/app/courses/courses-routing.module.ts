import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

//Perquè funcioni lazy loading:
//El CoursesModule ha de tenir el seu Routing Module (CoursesRoutingModule) amb rutes pròpies.

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  }
];

@NgModule({
  //S'ha d'usar RouterModule.forChild() (no forRoot()).
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [

  ]
})
export class CoursesRoutingModule {



}
