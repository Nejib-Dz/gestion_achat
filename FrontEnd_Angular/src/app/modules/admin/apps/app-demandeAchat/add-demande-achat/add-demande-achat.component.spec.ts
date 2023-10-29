import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDemandeAchatComponent } from './add-demande-achat.component';

describe('AddDemandeAchatComponent', () => {
  let component: AddDemandeAchatComponent;
  let fixture: ComponentFixture<AddDemandeAchatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDemandeAchatComponent]
    });
    fixture = TestBed.createComponent(AddDemandeAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
