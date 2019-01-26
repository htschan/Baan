import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'linebreaker',
})
export class LineBreakerPipe implements PipeTransform {

    constructor() { }

    transform(value: string, ...args) {
        return value.replace(/\n/g, '<br>').replace(/\r/g, '');
    }
}
