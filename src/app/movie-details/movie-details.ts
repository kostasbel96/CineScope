import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../shared/services/movie-service';

@Component({
  selector: 'app-movie-details',
  imports: [],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails implements OnInit {

  movieId!: string;
  movie: any;

  constructor(private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id')!;
    console.log('Movie ID:', this.movieId);
    this.movieService.getMovieById(this.movieId).subscribe((data) =>{
      this.movie = data;
      console.log(this.movie);
    })
  }

}
