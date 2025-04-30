import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, UrlSerializer } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanLoadAuthGuard } from './services/can-load-auth.guard';


const routes: Routes = [
  //redirecciona automàticament l'usuari a /courses quan visita el domini base
  {
    path: "",
    redirectTo: "/courses",
    pathMatch: "full" //Fa que la coincidència es faci només si la ruta és exactament buida. (Sense això, podria intentar redireccionar també subrutes.)
  },

  //Lazy loading és una tècnica que carrega els mòduls només quan són necessaris, en lloc de carregar-los tots al principi.
  //Millora el rendiment inicial de l'aplicació.
  //Angular només carregarà CoursesModule quan l'usuari accedeixi a /courses
  {
    path: "courses",
    loadChildren: () => import('./courses/courses.module')
      .then(m => m.CoursesModule),
    canMatch: [CanLoadAuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "about",
    component: AboutComponent
  },

  //Important posar al final
  //captura qualsevol ruta que no coincideixi amb cap altra definida abans.
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [
    CanLoadAuthGuard
  ]
})
export class AppRoutingModule {


}
