import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBracketsComponent } from './my-brackets.component';

describe('MyBracketsComponent', () => {
  let component: MyBracketsComponent;
  let fixture: ComponentFixture<MyBracketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBracketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBracketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
