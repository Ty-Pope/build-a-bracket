import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BracketEditComponent } from './bracket-edit.component';

describe('BracketEditComponent', () => {
  let component: BracketEditComponent;
  let fixture: ComponentFixture<BracketEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BracketEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BracketEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
