import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvService } from '../shared/services/tv-service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-tv-details',
  imports: [],
  templateUrl: './tv-details.html',
  styleUrl: './tv-details.css',
})
export class TvDetails implements OnInit {
  tvId!: string;
  tv: any;
  iconUrl = 'https://image.tmdb.org/t/p/w500';
  videoData: any
  videoUrl!: SafeResourceUrl;

  constructor(private route: ActivatedRoute,
    private tvService: TvService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.tvId = this.route.snapshot.paramMap.get('id')!;
    this.tvService.getTvById(this.tvId).subscribe((data) => {
      this.tv = data;
    })

    this.tvService.getTvVideoById(this.tvId).subscribe((data => {
      this.videoData = data;
      if (this.videoData.results.length > 0) {
        const videoKey = this.videoData.results[0].key;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${videoKey}`
        );
      }
      console.log(this.videoData);
    }))


  }
}
