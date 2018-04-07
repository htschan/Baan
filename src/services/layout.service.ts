import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";



@Injectable()
export class LayoutService {

    data: BehaviorSubject<ScreenProperties> = new BehaviorSubject<ScreenProperties>({ width: 100, height: 100 });

    constructor() { }

    setScreenSize(width: number, height: number) {
        this.data.next({ width: width, height: height });
    }
}

export class ScreenProperties {
    width: number;
    height: number;
}