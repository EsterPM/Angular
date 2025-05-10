import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoadingService } from "../loading/loading.service";
import { finalize } from "rxjs";

//defineix l'interceptor com una funció amb la signatura HttpInterceptorFn. Aquesta signatura indica que l'interceptor és una funció que es crida per cada petició HTTP.
export const loadingInterceptor: HttpInterceptorFn =
  (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    //Utilitza el sistema d'injecció de dependències per obtenir una instància del servei LoadingService que s'encarrega de controlar l'estat de càrrega
    const loadingService = inject(LoadingService);

    //S'inicia el procés de càrrega
    loadingService.loadingOn();

    //envia la petició HTTP a la següent part del codi
    return next(req)
      .pipe(
        finalize(() => {
          loadingService.loadingOff()
        })
      )
  }



/*Els interceptors són una eina d'Angular per interceptar les peticions HTTP que es fan des del client i modificar-les o gestionar-les de manera global.
En aquest cas, aquest interceptor es fa servir per mostrar un indicador de càrrega mentre es realitza una petició HTTP.*/
