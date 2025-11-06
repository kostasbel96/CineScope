import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../shared/services/movie-service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  imports: [],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails implements OnInit {

  movieId!: string;
  movie: any;
  iconUrl = 'https://image.tmdb.org/t/p/w500';
  videoData: any
  videoUrl!: SafeResourceUrl;

  constructor(private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id')!;
    this.movieService.getMovieById(this.movieId).subscribe((data) =>{
      this.movie = data;
      console.log(this.movie);
    })

    this.movieService.getMovieVideoById(this.movieId).subscribe((data => {
      this.videoData = data;
      if (this.videoData.results.length > 0) {
        const videoKey = this.videoData.results[0].key;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${videoKey}`
        );
      }
      console.log(this.videoData);
    }))

    
  }

}
