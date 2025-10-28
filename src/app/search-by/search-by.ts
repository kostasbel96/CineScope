import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../shared/services/movie-service';

@Component({
  selector: 'app-search-by',
  imports: [ReactiveFormsModule],
  templateUrl: './search-by.html',
  styleUrl: './search-by.css',
})
export class SearchBy implements OnInit{
  searchForm!: FormGroup;
  @Output()
  movies = new EventEmitter<any[]>();
  @Output()
  dataOfMovies = new EventEmitter<any>();
  @Output() pageChanged = new EventEmitter<number>();
  currentPage: number = 1;
  constructor(private movieService: MovieService){}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchByTitle: new FormControl('', Validators.required)
    });
  }

  onSearch(page: number = 1){
    const title = this.searchForm.get('searchByTitle')?.value;
    console.log(title);
    this.pageChanged.emit(page);
    if (!title) return;
    this.movieService.getMovieByTitle(title, page).subscribe((data) =>{
      console.log(data);
      this.dataOfMovies.emit(data);
      this.movies.emit(data.results);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    })
  }
  
}
