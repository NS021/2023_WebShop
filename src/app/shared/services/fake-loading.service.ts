import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeLoadingService {

  constructor() { }

  loadingWithPromise(email: string, password:string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i === 2) {
          clearInterval(interval);
          if (email === 'test@gmail.com' && password === 'testpw') {
            resolve(true);
          } else {
            reject('Hibás felhasználónév vagy jelszó!')
          }
        }
      }, 1000);
    })
  }
}
