import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodologyExplainComponent } from './methodology-explain.component';

describe('MethodologyExplainComponent', () => {
  let component: MethodologyExplainComponent;
  let fixture: ComponentFixture<MethodologyExplainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MethodologyExplainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MethodologyExplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
