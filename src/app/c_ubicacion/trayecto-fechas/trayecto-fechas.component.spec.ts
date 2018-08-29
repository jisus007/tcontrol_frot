import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrayectoFechasComponent } from './trayecto-fechas.component';

describe('TrayectoFechasComponent', () => {
  let component: TrayectoFechasComponent;
  let fixture: ComponentFixture<TrayectoFechasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrayectoFechasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrayectoFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
