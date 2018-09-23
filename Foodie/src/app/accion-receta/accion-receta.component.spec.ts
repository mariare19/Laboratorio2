import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionRecetaComponent } from './accion-receta.component';

describe('AccionRecetaComponent', () => {
  let component: AccionRecetaComponent;
  let fixture: ComponentFixture<AccionRecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccionRecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
