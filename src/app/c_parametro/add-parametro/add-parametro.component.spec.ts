import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParametroComponent } from './add-parametro.component';

describe('AddParametroComponent', () => {
  let component: AddParametroComponent;
  let fixture: ComponentFixture<AddParametroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParametroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
