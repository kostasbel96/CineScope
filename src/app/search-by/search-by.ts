import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../shared/services/movie-service';
import { TvService } from '../shared/services/tv-service';

@Component({
  selector: 'app-search-by',
  imports: [ReactiveFormsModule],
  templateUrl: './search-by.html',
  styleUrl: './search-by.css',
})
export class SearchBy implements OnInit {
  searchForm!: FormGroup;
  @Output()
  movies = new EventEmitter<any[]>();
  @Output()
  dataOfMovies = new EventEmitter<any>();
  @Output()
  tvs = new EventEmitter<any[]>();
  @Output()
  dataOfTvs = new EventEmitter<any>();
  @Output()
  pageChanged = new EventEmitter<number>();
  @Output()
  hasSearch = new EventEmitter<boolean>(false);
  currentPage: number = 1;
  @Input()
  type!: string;


  constructor(private movieService: MovieService,
    private tvService: TvService
  ) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchByTitle: new FormControl('', Validators.required)
    });
  }

  onSearch(page: number = 1) {
    const title = this.searchForm.get('searchByTitle')?.value;
    console.log(title);
    this.pageChanged.emit(page);
    this.hasSearch.emit(true);
    if (!title) return;
    if (this.type === 'movie') {
      this.movieService.getMovieByTitle(title, page).subscribe((data) => {
        console.log(data);
        this.dataOfMovies.emit(data);
        this.movies.emit(data.results);
        window.scrollTo({ top: 100, behavior: 'smooth' });
      })
    }
    if (this.type === 'tv') {
      this.tvService.getTvByTitle(title, page).subscribe((data) => {
        console.log(data);
        this.dataOfTvs.emit(data);
        this.tvs.emit(data.results);
        window.scrollTo({ top: 100, behavior: 'smooth' });
      })
    }

  }

}
