import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBooksDialogueComponent } from './update-books-dialogue.component';

describe('UpdateBooksDialogueComponent', () => {
  let component: UpdateBooksDialogueComponent;
  let fixture: ComponentFixture<UpdateBooksDialogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateBooksDialogueComponent]
    });
    fixture = TestBed.createComponent(UpdateBooksDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
