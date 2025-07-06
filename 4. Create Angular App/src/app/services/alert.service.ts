import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Alert {
  state: boolean,
  message: string,
  type: string
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSubject: BehaviorSubject<Alert> = new BehaviorSubject<Alert>(
    {
      state: false,
      message: "",
      type: ""
    }
  );

  get alert$(): Observable<Alert> {
    return this.alertSubject.asObservable();
  }

  getAlertSubject() {
    return this.alertSubject.asObservable();
  }

  setStateAlertSubject(state: boolean) {
    this.alertSubject.next({ ...this.alertSubject.getValue(), state });
  }

  setTypeAlertSubject(type: string) {
    this.alertSubject.next({ ...this.alertSubject.getValue(), type });
  }

  setMessageAlertSubject(message: string) {
    this.alertSubject.next({ ...this.alertSubject.getValue(), message });
  }

}
