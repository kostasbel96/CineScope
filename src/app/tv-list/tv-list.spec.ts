import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvList } from './tv-list';

describe('TvList', () => {
  let component: TvList;
  let fixture: ComponentFixture<TvList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
