import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../services/youtube.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-songlist',
  templateUrl: './songlist.page.html',
  styleUrls: ['./songlist.page.scss'],
})
export class SonglistPage {
  constructor(private router: Router, public ytService: YoutubeService) {
  }

  viewVideo(url: string, title: string) {
    this.router.navigate(['Songlist/viewvideo', { url: url, title: title }]);
  }
}
