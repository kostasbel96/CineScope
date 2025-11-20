import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/services/movie-service';
import { TvService } from '../shared/services/tv-service';
import { MyCarousel } from '../my-carousel/my-carousel';

@Component({
  selector: 'app-popular',
  imports: [MyCarousel],
  templateUrl: './popular.html',
  styleUrl: './popular.css',
})
export class Popular implements OnInit {

  popularMovies: any[] = [];
  popularTvShows: any[] = [];
  iconUrl = 'https://image.tmdb.org/t/p/w500';
  loading = true;
  movieGroups: any[][] = [];
  tvGroups: any[][] = [];


  constructor(private movieService: MovieService,
    private tvService: TvService) { }

  ngOnInit(): void {
    
    this.fetchData();
  }

  fetchData() {
    this.movieService.getPopularMovies(1).subscribe((data) => {
      this.popularMovies = data.results;
      console.log(this.popularMovies);
      this.divideMovies();
    });
    this.tvService.getPopularTvShows(1).subscribe((data) => {
      this.popularTvShows = data.results;
      this.divideTvShows();
      this.loading = false;
    });
  }

  divideMovies() {
    for (let i = 0; i < this.popularMovies.length; i += 4) {
      this.movieGroups.push(this.popularMovies.slice(i, i + 4));
    }
  }

  divideTvShows() {
    for (let i = 0; i < this.popularTvShows.length; i += 4) {
      this.tvGroups.push(this.popularTvShows.slice(i, i + 4));
    }
  }

}
