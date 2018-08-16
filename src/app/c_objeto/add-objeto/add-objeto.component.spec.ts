import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObjetoComponent } from './add-objeto.component';

describe('AddObjetoComponent', () => {
  let component: AddObjetoComponent;
  let fixture: ComponentFixture<AddObjetoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddObjetoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddObjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
