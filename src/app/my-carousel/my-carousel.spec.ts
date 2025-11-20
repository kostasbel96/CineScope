import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCarousel } from './my-carousel';

describe('MyCarousel', () => {
  let component: MyCarousel;
  let fixture: ComponentFixture<MyCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
