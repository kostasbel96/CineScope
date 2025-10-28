import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const discoverMovieApi = "https://api.themoviedb.org/3/discover/movie";
const searchMovieApi = "https://api.themoviedb.org/3/search/movie"
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  constructor(private http: HttpClient){

  }

  getAllMovies(page = 1): Observable<any>{
    return this.http.get(
      `${discoverMovieApi}?api_key=${environment.key}&page=${page}`
    );
  }

  getMovieByTitle(title: string, page = 1): Observable<any>{
    return this.http.get(
      `${searchMovieApi}?api_key=${environment.key}&query=${encodeURIComponent(title)}&page=${page}`
    );
  }

}
