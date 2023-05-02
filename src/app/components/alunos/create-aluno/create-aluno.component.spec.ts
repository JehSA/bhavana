import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlunoComponent } from './create-aluno.component';

describe('CreateAlunoComponent', () => {
  let component: CreateAlunoComponent;
  let fixture: ComponentFixture<CreateAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAlunoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
