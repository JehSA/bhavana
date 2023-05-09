import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlanoComponent } from './create-plano.component';

describe('CreatePlanoComponent', () => {
  let component: CreatePlanoComponent;
  let fixture: ComponentFixture<CreatePlanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePlanoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
