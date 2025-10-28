import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const discoverCategoryApi = "https://api.themoviedb.org/3/genre/movie/list";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient){

  }

  getAllCategories(): Observable<any>{
      return this.http.get(
        `${discoverCategoryApi}?api_key=${environment.key}&language=en-US`
      );
    }
}
