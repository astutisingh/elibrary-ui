import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTypeComponent } from './book-type.component';

describe('BookTypeComponent', () => {
  let component: BookTypeComponent;
  let fixture: ComponentFixture<BookTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookTypeComponent]
    });
    fixture = TestBed.createComponent(BookTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
