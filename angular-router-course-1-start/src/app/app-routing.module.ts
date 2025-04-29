import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, UrlSerializer } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  //Lazy loading és una tècnica que carrega els mòduls només quan són necessaris, en lloc de carregar-los tots al principi.
  //Millora el rendiment inicial de l'aplicació.
  //Angular només carregarà CoursesModule quan l'usuari accedeixi a /courses
  {
    path: "courses",
    loadChildren: () => import('./courses/courses.module')
      .then(m => m.CoursesModule)
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "about",
    component: AboutComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [

  ]
})
export class AppRoutingModule {


}
