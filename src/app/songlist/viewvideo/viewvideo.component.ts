import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewvideo',
  templateUrl: './viewvideo.component.html',
  styleUrls: ['./viewvideo.component.scss']
})
export class ViewvideoComponent implements OnInit {

  video: any = {
    url: '',
    title: ''
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.video.url = this.route.snapshot.paramMap.get('url');
    this.video.title = this.route.snapshot.paramMap.get('title');
  }

}
