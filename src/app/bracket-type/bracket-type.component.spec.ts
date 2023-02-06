import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BracketTypeComponent } from './bracket-type.component';

describe('BracketTypeComponent', () => {
  let component: BracketTypeComponent;
  let fixture: ComponentFixture<BracketTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BracketTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BracketTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
