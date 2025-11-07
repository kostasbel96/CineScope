import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvsView } from './tvs-view';

describe('TvsView', () => {
  let component: TvsView;
  let fixture: ComponentFixture<TvsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvsView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
