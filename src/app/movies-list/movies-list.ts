import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../shared/services/movie-service';
import { CategoryService } from '../shared/services/category-service';
import { Pagination } from '../pagination/pagination';

@Component({
  selector: 'app-movies-list',
  imports: [ReactiveFormsModule, Pagination],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.css',
})
export class MoviesList {
  
  searchForm!: FormGroup;
  @Output()
  movies = signal<any>([]);
  @Output()
  dataOfMovies = signal<any>({});

  currentPage: number = 1;

  iconUrl = 'https://image.tmdb.org/t/p/w500';
  categories = [];

  constructor(private movieService: MovieService,
              private categoryService: CategoryService){}

  ngOnInit(){
    this.movieService.getAllMovies().subscribe((data) =>{
      console.log(data);
    });
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data.genres;
    })

    this.searchForm = new FormGroup({
      searchByTitle: new FormControl('', Validators.required)
    });
  }

  onSearch(page: number = 1){
    const title = this.searchForm.get('searchByTitle')?.value;
    console.log(title);
    this.currentPage = page;
    if (!title) return;
    this.movieService.getMovieByTitle(title, page).subscribe((data) =>{
      console.log(data);
      this.dataOfMovies = data;
      this.movies.set(data.results);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    })
  }

  getCategoriesOfMovie(movie: any): string{
    let categoriesString = "";
      for (const category of this.categories){
        if (movie.genre_ids.includes(category['id'])){
          categoriesString = `${category['name']}/${categoriesString}`
        }
      }
      
    return categoriesString.slice(0, categoriesString.length - 1);
  }

}
