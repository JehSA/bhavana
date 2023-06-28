import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfessorComponent } from './create-professor.component';

describe('CreateProfessorComponent', () => {
  let component: CreateProfessorComponent;
  let fixture: ComponentFixture<CreateProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProfessorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
