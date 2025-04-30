import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, UrlSerializer } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanLoadAuthGuard } from './services/can-load-auth.guard';
import { CustomPreloadingStrategy } from './services/custom-preloading.strategy';
import { ChatComponent } from './chat/chat.component';


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
    //canMatch: [CanLoadAuthGuard],  //CanMatch no afecta al preload (en teoria)
    data: {
      preload: true
    }
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "helpdesk-chat",
    component: ChatComponent,
    outlet: 'chat' //nom del route outlet secondari de appComponent
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
    RouterModule.forRoot(
      routes, {
        //ara fem servir el custom
        preloadingStrategy: CustomPreloadingStrategy,
        enableTracing: true, //Et mostra a la consola del navegador cada pas que fa Angular mentre navega entre rutes.
        useHash: true //Utilitza rutes amb hash #
        //per aplicacions que es serveixen des de servidors sense configuració de rutes
      })
  ],
  exports: [RouterModule],
  providers: [
    CanLoadAuthGuard,
    CustomPreloadingStrategy
  ]
})
export class AppRoutingModule {


}
