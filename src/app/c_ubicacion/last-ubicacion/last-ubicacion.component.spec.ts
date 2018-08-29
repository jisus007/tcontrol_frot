import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastUbicacionComponent } from './last-ubicacion.component';

describe('LastUbicacionComponent', () => {
  let component: LastUbicacionComponent;
  let fixture: ComponentFixture<LastUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
