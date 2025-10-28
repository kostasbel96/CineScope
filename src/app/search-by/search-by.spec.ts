import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBy } from './search-by';

describe('SearchBy', () => {
  let component: SearchBy;
  let fixture: ComponentFixture<SearchBy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
