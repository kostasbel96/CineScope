import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/services/movie-service';
import { RouterLink } from '@angular/router';
import {
  CarouselInnerComponent,
  CarouselComponent,
  CarouselItemComponent,
  CarouselCaptionComponent,
  CarouselControlComponent
} from "@coreui/angular";

@Component({
  selector: 'app-popular',
  imports: [RouterLink,
    CarouselInnerComponent,
    CarouselComponent,
    CarouselItemComponent,
    CarouselCaptionComponent,
    CarouselControlComponent],
  templateUrl: './popular.html',
  styleUrl: './popular.css',
})
export class Popular implements OnInit {

  popularMovies: any[] = [];
  iconUrl = 'https://image.tmdb.org/t/p/w500';
  loading = true;
  movieGroups: any[][] = [];
  isMobile = false;


  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 768;

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
    this.fetchData();
  }

  fetchData() {
    this.movieService.getPopularMovies(1).subscribe((data) => {
      this.popularMovies = data.results;
      console.log(this.popularMovies);
      this.divideMovies();
      this.loading = false;
    });
  }

  divideMovies() {
    for (let i = 0; i < this.popularMovies.length; i += 4) {
      this.movieGroups.push(this.popularMovies.slice(i, i + 4));
    }
  }

}
