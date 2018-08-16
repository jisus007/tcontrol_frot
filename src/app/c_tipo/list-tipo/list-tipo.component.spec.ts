import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTipoComponent } from './list-tipo.component';

describe('ListTipoComponent', () => {
  let component: ListTipoComponent;
  let fixture: ComponentFixture<ListTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
