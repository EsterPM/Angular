import { inject, Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  //signal privat
  #loadingSignal = signal(false);

  //Exposem el signal de forma read-only perquè altres components el puguin observar, però no modificar.
  loading = this.#loadingSignal.asReadonly();


  loadingOn() {
    this.#loadingSignal.set(true);
  }

  loadingOff() {
    this.#loadingSignal.set(false);
  }
}
