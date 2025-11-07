import { Component, OnInit } from '@angular/core';
import { TvService } from '../shared/services/tv-service';
import { CategoryService } from '../shared/services/category-service';
import { Category } from '../shared/interfaces/category';
import { firstValueFrom } from 'rxjs';
import {
  CarouselModule,
  CarouselInnerComponent,
  CarouselItemComponent,
  CarouselControlComponent,
  CarouselCaptionComponent
} from '@coreui/angular';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-tvs-view',
  imports: [CarouselModule,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselControlComponent,
    CarouselCaptionComponent,
    RouterLink],
  templateUrl: './tvs-view.html',
  styleUrl: './tvs-view.css',
})
export class TvsView implements OnInit {

  iconUrl = 'https://image.tmdb.org/t/p/w500';
  categories: Category[] = [];
  tvs: any[] = [];
  tvsByCategory: { [name: string]: string[] } = {};
  loading = true;

  constructor(private tvService: TvService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.fetchData();
  }

  async getMultiplePages(pages = 20) {
    for (let i = 1; i <= pages; i++) {
      const data = await firstValueFrom(this.tvService.getAllTvs(i));
      this.tvs.push(...data.results);
    }
  }

  async fetchData() {
    const categoriesData = await firstValueFrom(this.categoryService.getAllCategories('tv'))
    this.categories = categoriesData.genres;
    await this.getMultiplePages();
    this.catigorizedTvs();
    this.loading = false;
  }

  catigorizedTvs() {
    for (const cat of this.categories) {
      if (!this.tvsByCategory[cat.name]) {
        this.tvsByCategory[cat.name] = [];
      }
      for (const tv of this.tvs) {
        if (tv.genre_ids.includes(cat.id)) {
          this.tvsByCategory[cat.name].push(tv.name);
        }
      }
    }
  }

  getTv(tvTitle: string) {
    return this.tvs
      .find(tv => tv.name === tvTitle);
  }

}
