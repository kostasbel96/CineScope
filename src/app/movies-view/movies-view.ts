import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/services/movie-service';
import { Category } from '../shared/interfaces/category';
import { CategoryService } from '../shared/services/category-service';
import { firstValueFrom } from 'rxjs';
import { CarouselModule, 
  CarouselInnerComponent, 
  CarouselItemComponent, 
  CarouselControlComponent,
  CarouselCaptionComponent } from '@coreui/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies-view',
  imports: [CarouselModule, 
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselControlComponent,
    CarouselCaptionComponent,
    RouterLink
  ],
  templateUrl: './movies-view.html',
  styleUrl: './movies-view.css',
})
export class MoviesView implements OnInit{
  
  iconUrl = 'https://image.tmdb.org/t/p/w500';
  categories: Category[] = [];
  movies: any[] = [];
  moviesByCategory: { [name: string]: string[] } = {};
  loading = true;

  constructor(private movieService: MovieService,
              private categoryService: CategoryService){}

  ngOnInit(){
    this.fetchData();
  }

  async getMultiplePages(pages = 50) {
    for (let i = 1; i <= pages; i++) {
      const data = await firstValueFrom(this.movieService.getAllMovies(i));
      this.movies.push(...data.results);
    }
  }

  async fetchData(){
    const categoriesData = await firstValueFrom(this.categoryService.getAllCategories('movie'))
    this.categories = categoriesData.genres;
    await this.getMultiplePages();
    this.catigorizedMovies();
    this.loading = false;
  }

  catigorizedMovies(){
    for (const cat of this.categories){
      if (!this.moviesByCategory[cat.name]) {
        this.moviesByCategory[cat.name] = [];
      }
      for(const movie of this.movies){
        if (movie.genre_ids.includes(cat.id)){
          this.moviesByCategory[cat.name].push(movie.title);
        }
      }
    }    
  }

  getMovie(movieTitle: string){
    return  this.movies
      .find(movie => movie.title === movieTitle);
  }
}
