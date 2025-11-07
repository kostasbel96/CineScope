import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const discoverMovieCategoryApi = "https://api.themoviedb.org/3/genre/movie/list";
const discoverTvCategoryApi = "https://api.themoviedb.org/3/genre/tv/list";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient){

  }

  getAllCategories(type: string): Observable<any>{
    if (type == 'movie'){
      return this.http.get(
        `${discoverMovieCategoryApi}?api_key=${environment.key}&language=en-US`
      );
    }
    else{
      return this.http.get(
        `${discoverTvCategoryApi}?api_key=${environment.key}&language=en-US`
      );
    }
      
    }
}
