import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrayectoDiaComponent } from './trayecto-dia.component';

describe('TrayectoDiaComponent', () => {
  let component: TrayectoDiaComponent;
  let fixture: ComponentFixture<TrayectoDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrayectoDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrayectoDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
