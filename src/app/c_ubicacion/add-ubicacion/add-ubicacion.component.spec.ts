import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUbicacionComponent } from './add-ubicacion.component';

describe('AddUbicacionComponent', () => {
  let component: AddUbicacionComponent;
  let fixture: ComponentFixture<AddUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
