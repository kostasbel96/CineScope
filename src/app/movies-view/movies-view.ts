import { Component, Input, OnInit, signal } from '@angular/core';
import { MovieService } from '../shared/services/movie-service';
import { MoviesByCategory } from '../shared/interfaces/movies-by-category';
import { Category } from '../shared/interfaces/category';
import { CategoryService } from '../shared/services/category-service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-movies-view',
  imports: [],
  templateUrl: './movies-view.html',
  styleUrl: './movies-view.css',
})
export class MoviesView implements OnInit{
  
  categories: Category[] = [];
  movies: any[] = [];
  moviesByCategory: { [name: string]: string[] } = {};
  loading = true;

  constructor(private movieService: MovieService,
              private categoryService: CategoryService){}

  async ngOnInit(){
    const categoriesData = await firstValueFrom(this.categoryService.getAllCategories())
    this.categories = categoriesData.genres;
    await this.getMultiplePages();
    this.catigorizedMovies();
    this.loading = false;
  }

  async getMultiplePages(pages = 50) {
    for (let i = 1; i <= pages; i++) {
      const data = await firstValueFrom(this.movieService.getAllMovies(i));
      this.movies.push(...data.results);
    }
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

}
