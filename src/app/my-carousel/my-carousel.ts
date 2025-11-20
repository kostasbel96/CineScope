import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselInnerComponent, CarouselItemComponent, CarouselComponent, CarouselControlComponent, CarouselCaptionComponent } from "@coreui/angular";
import { MovieService } from '../shared/services/movie-service';
import { TvService } from '../shared/services/tv-service';


@Component({
  selector: 'app-my-carousel',
  imports: [CarouselInnerComponent,
    CarouselItemComponent,
    CarouselComponent,
    CarouselControlComponent,
    RouterLink, CarouselCaptionComponent],
  templateUrl: './my-carousel.html',
  styleUrl: './my-carousel.css',
})
export class MyCarousel {

  @Input()
  listItem: any[] = [];
  @Input()
  itemType: string = '';
  @Input()
  isMobile = false;
  @Input()
  movies?: any[];

  itemGroups: any[][] = [];
  iconUrl = 'https://image.tmdb.org/t/p/w500';

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 850;

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 850;
    });
    this.divide();
  }

  divide() {
    if (this.itemType === 'movie') {
      for (let i = 0; i < this.listItem.length; i += 4) {
        this.itemGroups.push(this.listItem.slice(i, i + 4));
      }
    }
    else {
      for (let i = 0; i < this.listItem.length; i += 4) {
        this.itemGroups.push(this.listItem.slice(i, i + 4));
      }
    }

  }

  getMovie(movieTitle: string) {
    if (this.movies) {
      return this.movies
        .find(movie => movie.title === movieTitle);
    }
  }

}
