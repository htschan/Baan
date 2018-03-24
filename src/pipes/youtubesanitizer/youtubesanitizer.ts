import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'youtubesanitizer',
})
export class YoutubesanitizerPipe implements PipeTransform {

  constructor(private dom: DomSanitizer) { }

  transform(value: string, ...args) {
    value = value.replace("watch?v=", "embed/");
    return this.dom.bypassSecurityTrustResourceUrl(value);
  }
}
