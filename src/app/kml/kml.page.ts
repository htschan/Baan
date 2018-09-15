import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AgmMap, AgmKmlLayer, KmlLayerManager } from '@agm/core';
import { UploadFileService } from '../services/upload-file.service';
import { FileUpload } from '../../model/fileupload';

@Component({
  selector: 'app-kml',
  templateUrl: './kml.page.html',
  styleUrls: ['./kml.page.scss'],
})
export class KmlPage implements AfterViewInit {
  agmMap: AgmMap;
  agmKmlLayer: AgmKmlLayer;

  @ViewChild(AgmMap)
  set mat(directive: AgmMap) {
    this.agmMap = directive;
  }

  @ViewChild(AgmKmlLayer)
  set kmlLayer(directive: AgmKmlLayer) {
    this.agmKmlLayer = directive;
  }

  lat = 47.488837;
  lng = 8.753452;
  mapTypeId = 'terrain';
  // kmlurl = "http://MattPayne.org/agm-pedometer2/Friday.kml";
  // kmlurl = "https://drive.google.com/file/d/1n7z_1PJYuv1SBNfHDZgZw0M7r-IXNR83/view?usp=sharing";
  // kmlurl = "https://sorawit.ch/kml/Friday.kml";
  kmlurl = 'https://sorawit.ch/kml/20170626.kml';


  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };

  constructor(
    public uploadService: UploadFileService,
    public kmlLayerManager: KmlLayerManager) { }

  ngAfterViewInit() {
    console.log(this.agmKmlLayer);
    console.log(this.agmMap);
    // var kmlLayer = new AgmKmlLayer(this.kmlLayerManager);
    // kmlLayer.url = "https://sorawit.ch/kml/20170626.kml";
    // this.kmlLayerManager.addKmlLayer(kmlLayer);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KmlPage');
  }

  // upload(event) {
  //   this.afStorage.upload(`/MyHome/kml/${event.target.files[0].name}`, event.target.files[0]);
  // }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
    // this.uploadService.downloadURL.subscribe((url) => {
    //   var kmlLayer = new AgmKmlLayer(this.kmlLayerManager);
    //   kmlLayer.url = url;
    //   this.kmlLayerManager.addKmlLayer(kmlLayer);
    // });
  }
}
