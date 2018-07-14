import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TcontrolComponent } from './tcontrol.component';

describe('TcontrolComponent', () => {
  let component: TcontrolComponent;
  let fixture: ComponentFixture<TcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TcontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
