import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscriber, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable()
      .subscribe(
        numero => console.log('Subs', numero),
        error => console.error('Error en el obs', error),
        () => console.log('El observador termino!')
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La página se va a cerrar');
    this.subscription.unsubscribe();
  }


  regresaObservable(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      let contador = 0;
      const intervalo = setInterval(() => {
        contador++;
        const salida = {valor: contador};

        observer.next(salida);


        // if ( contador === 3 ) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if ( contador === 2 ) {
        //   // clearInterval(intervalo);
        //   observer.error('Auxilio!');
        // }

      }, 1000);

    }).pipe(
      map(resp => resp.valor),
      filter((valor, index) => {
        if ((valor % 2) === 1) {
          return true;// impar
        } else {
          return false;// par
        }
      })
    );

  }

}
