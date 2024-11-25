import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceBooksComponent } from './space-books.component';

describe('SpaceBooksComponent', () => {
  let component: SpaceBooksComponent;
  let fixture: ComponentFixture<SpaceBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceBooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
