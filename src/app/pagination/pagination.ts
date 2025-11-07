import { Component, EventEmitter, input, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination implements OnInit{
  
  dataOfMovies =  input<any>({});
  dataOfTvs =  input<any>({});
  @Output() 
  pageChanged = new EventEmitter<number>();

  @Input()
  currentPage = 1;
  @Input()
  type!: string;
  itemsPerPage = 20;

  ngOnInit(): void {
    this.currentPage = this.dataOfMovies()?.page ?? 1;
  }

  get totalPages() {
    if(this.type === 'movie'){
      return this.dataOfMovies()?.total_pages ?? 1;
    }
    else if(this.type === 'tv'){
      return this.dataOfTvs()?.total_pages ?? 1;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChanged.emit(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChanged.emit(this.currentPage);
    }
  }
}
