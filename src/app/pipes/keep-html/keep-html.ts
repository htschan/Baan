import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'keephtml'
})
export class KeephtmlPipe implements PipeTransform {

    constructor(private dom: DomSanitizer) { }

    transform(value: string, ...args) {
        return this.dom.bypassSecurityTrustHtml(value);
    }
}
