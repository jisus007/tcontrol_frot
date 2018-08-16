import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditObjetoComponent } from './edit-objeto.component';

describe('EditObjetoComponent', () => {
  let component: EditObjetoComponent;
  let fixture: ComponentFixture<EditObjetoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditObjetoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditObjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
