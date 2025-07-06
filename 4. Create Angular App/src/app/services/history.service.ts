import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { History } from '../models/History';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private historySubject = new BehaviorSubject<History[]>([]);

  get history$(): Observable<History[]> {
    return this.historySubject.asObservable();
  }

  addToHistory(req: History): void {
    const current = this.historySubject.getValue();
    this.historySubject.next([...current, req]);
  }

  clearHistory(): void {
    this.historySubject.next([]);
  }
  
}
