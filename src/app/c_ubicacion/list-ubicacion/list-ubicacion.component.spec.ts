import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUbicacionComponent } from './list-ubicacion.component';

describe('ListUbicacionComponent', () => {
  let component: ListUbicacionComponent;
  let fixture: ComponentFixture<ListUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
