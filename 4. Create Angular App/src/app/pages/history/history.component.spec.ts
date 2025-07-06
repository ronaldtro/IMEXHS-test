// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { BehaviorSubject } from 'rxjs';
// import { HistoryComponent } from './history.component';
// import { HistoryService } from '../../services/history.service';
// import { History } from '../../models/History';
// import { By } from '@angular/platform-browser';
// import { CommonModule } from '@angular/common';

// // 1) Stub de HistoryService
// class MockHistoryService {
//   // Comenzamos con un array vacío
//   private subject = new BehaviorSubject<History[]>([]);
//   history$ = this.subject.asObservable();

//   // Método auxiliar para emitir datos en los tests
//   emit(hist: History[]) {
//     this.subject.next(hist);
//   }
// }

// describe('HistoryComponent', () => {
//   let component: HistoryComponent;
//   let fixture: ComponentFixture<HistoryComponent>;
//   let mockService: MockHistoryService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         CommonModule,
//         HistoryComponent  // al ser standalone lo importamos directamente
//       ],
//       providers: [
//         { provide: HistoryService, useClass: MockHistoryService }
//       ]
//     }).compileComponents();

//     // 2) Crear fixture e instancia de componente
//     fixture = TestBed.createComponent(HistoryComponent);
//     component = fixture.componentInstance;

//     // 3) Recuperar referencia al stub para controlar emisiones
//     mockService = TestBed.inject(HistoryService) as any;
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should show "No data" when history is empty', () => {
//     // Componente se suscribe en ngOnInit
//     fixture.detectChanges();

//     // Debería haber una fila con "No data"
//     const noDataTd = fixture.debugElement
//       .query(By.css('tbody tr td'))
//       .nativeElement as HTMLElement;
//     expect(noDataTd.textContent).toContain('No data');
//   });

//   it('should display a row per history entry after service emits', () => {
//     // Emitimos dos entradas de ejemplo
//     const sample: History[] = [
//       { pointsCount: 500, area: 1250 },
//       { pointsCount: 1000, area: 2300 }
//     ];
//     mockService.emit(sample);

//     // Actualizamos bindings y view
//     fixture.detectChanges();

//     // Ahora deberíamos tener exactamente 2 filas de datos (excluyendo la fila "No data")
//     const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
//     // Dado que ya no mostrará "No data", total de tr == 2
//     expect(rows.length).toBe(2);

//     // Verificamos el contenido de la primera fila
//     const firstRowTds = rows[0].queryAll(By.css('td'));
//     expect(firstRowTds[0].nativeElement.textContent.trim()).toBe('1');          // índice
//     expect(firstRowTds[1].nativeElement.textContent.trim()).toBe('500');        // pointsCount
//     expect(firstRowTds[2].nativeElement.textContent.trim()).toBe('1250');       // area
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { HistoryComponent } from './history.component';
import { HistoryService } from '../../services/history.service';
import { History } from '../../models/History';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


class MockHistoryService {

  private subject = new BehaviorSubject<History[]>([]);
  history$ = this.subject.asObservable();

  emit(hist: History[]) {
    this.subject.next(hist);
  }
}

describe('HistoryComponent', () => {

  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let mockService: MockHistoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HistoryComponent
      ],
      providers: [
        { provide: HistoryService, useClass: MockHistoryService }
      ]
    }).compileComponents();


    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;

    mockService = TestBed.inject(HistoryService) as any;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show "No data" when history is empty', () => {
    fixture.detectChanges();

    const noDataTd = fixture.debugElement
      .query(By.css('tbody tr td'))
      .nativeElement as HTMLElement;
    expect(noDataTd.textContent).toContain('No data');
  });

  it('should display a row per history entry after service emits', () => {

    const sample: History[] = [
      { pointsCount: 500, area: 1250 },
      { pointsCount: 1000, area: 2300 }
    ];
    mockService.emit(sample);

    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    expect(rows.length).toBe(2);

    const firstRowTds = rows[0].queryAll(By.css('td'));
    expect(firstRowTds[0].nativeElement.textContent.trim()).toBe('1');
    expect(firstRowTds[1].nativeElement.textContent.trim()).toBe('500');
    expect(firstRowTds[2].nativeElement.textContent.trim()).toBe('1250');
  });
});
