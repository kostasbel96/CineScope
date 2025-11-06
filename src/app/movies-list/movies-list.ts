import { Component, EventEmitter, OnInit, Output, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../shared/services/movie-service';
import { CategoryService } from '../shared/services/category-service';
import { Pagination } from '../pagination/pagination';
import { SearchBy } from '../search-by/search-by';
import { MoviesView } from '../movies-view/movies-view';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  imports: [ReactiveFormsModule, Pagination, SearchBy, MoviesView, RouterLink],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.css',
})
export class MoviesList {
  
  movies: any[] = [];
  dataOfMovies: any = {};
  currentPage: number = 1;
  iconUrl = 'https://image.tmdb.org/t/p/w500';
  categories = signal([]);
  hasSearch: boolean = false;
  @ViewChild(SearchBy) searchByComponent!: SearchBy;

  constructor(private movieService: MovieService,
              private categoryService: CategoryService){}

  ngOnInit(){
    this.movieService.getAllMovies().subscribe((data) =>{
      console.log(data);
    });
    this.categoryService.getAllCategories().subscribe((data) => {
      console.log(data.genres);
      this.categories.set(data.genres);
    })
  }

  getCategoriesOfMovie(movie: any): string{
    let categoriesString = "";
      for (const category of this.categories()){
        if (movie.genre_ids.includes(category['id'])){
          categoriesString = `${category['name']}/${categoriesString}`
        }
      }
      
    return categoriesString.slice(0, categoriesString.length - 1);
  }
  
  onSearchPageChanged(page: number) {
    this.searchByComponent.onSearch(page);
  }
}
