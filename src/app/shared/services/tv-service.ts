import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const discoverTvApi = "https://api.themoviedb.org/3/discover/tv";
const searchTvApi = "https://api.themoviedb.org/3/search/tv";
const getTvApi = "https://api.themoviedb.org/3/tv";
const getPopularTvShowsApi = "https://api.themoviedb.org/3/tv/popular";

@Injectable({
  providedIn: 'root',
})
export class TvService {

  constructor(private http: HttpClient) {

  }

  getAllTvs(page = 1): Observable<any> {
    return this.http.get(
      `${discoverTvApi}?api_key=${environment.key}&page=${page}`
    );
  }

  getTvByTitle(title: string, page = 1): Observable<any> {
    return this.http.get(
      `${searchTvApi}?api_key=${environment.key}&query=${encodeURIComponent(title)}&page=${page}`
    );
  }

  getTvById(id: string): Observable<any> {
    return this.http.get(
      `${getTvApi}/${id}?api_key=${environment.key}`
    );
  }

  getTvVideoById(id: string): Observable<any> {
    return this.http.get(
      `${getTvApi}/${id}/videos?api_key=${environment.key}`
    );
  }

  getPopularTvShows(page = 1): Observable<any>{
      return this.http.get(
        `${getPopularTvShowsApi}?api_key=${environment.key}&page=${page}`
      );
    }

}
