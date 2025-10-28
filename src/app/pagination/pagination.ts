import { Component, EventEmitter, input, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination implements OnInit{
  
  dataOfMovies =  input<any>({});
  @Output() 
  pageChanged = new EventEmitter<number>();

  @Input()
  currentPage = 1;
  itemsPerPage = 20;

  ngOnInit(): void {
    this.currentPage = this.dataOfMovies()?.page ?? 1;
  }

  get totalPages() {
    return this.dataOfMovies()?.total_pages ?? 1;
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
