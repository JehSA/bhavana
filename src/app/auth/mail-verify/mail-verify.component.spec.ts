import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailVerifyComponent } from './mail-verify.component';

describe('MailVerifyComponent', () => {
  let component: MailVerifyComponent;
  let fixture: ComponentFixture<MailVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
