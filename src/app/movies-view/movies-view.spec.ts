import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesView } from './movies-view';

describe('MoviesView', () => {
  let component: MoviesView;
  let fixture: ComponentFixture<MoviesView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
