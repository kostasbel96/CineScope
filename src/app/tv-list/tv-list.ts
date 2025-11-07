import { Component, signal, ViewChild } from '@angular/core';
import { TvService } from '../shared/services/tv-service';
import { CategoryService } from '../shared/services/category-service';
import { SearchBy } from '../search-by/search-by';
import { Pagination } from '../pagination/pagination';
import { RouterLink } from '@angular/router';
import { TvsView } from "../tvs-view/tvs-view";

@Component({
  selector: 'app-tv-list',
  imports: [RouterLink, SearchBy, TvsView, Pagination],
  templateUrl: './tv-list.html',
  styleUrl: './tv-list.css',
})
export class TvList {
  tvs: any[] = [];
  dataOfTvs: any = {};
  currentPage: number = 1;
  iconUrl = 'https://image.tmdb.org/t/p/w500';
  categories = signal([]);
  hasSearch: boolean = false;
  @ViewChild(SearchBy) searchByComponent!: SearchBy;

  constructor(private tvService: TvService,
              private categoryService: CategoryService){}

  ngOnInit(){
    this.tvService.getAllTvs().subscribe((data) =>{
      console.log(data);
    });
    this.categoryService.getAllCategories('tv').subscribe((data) => {
      console.log(data.genres);
      this.categories.set(data.genres);
    })
  }

  getCategoriesOfTv(tv: any): string{
    let categoriesString = "";
      for (const category of this.categories()){
        if (tv.genre_ids.includes(category['id'])){
          categoriesString = `${category['name']}/${categoriesString}`
        }
      }
      
    return categoriesString.slice(0, categoriesString.length - 1);
  }
  
  onSearchPageChanged(page: number) {
    this.searchByComponent.onSearch(page);
  }
}
