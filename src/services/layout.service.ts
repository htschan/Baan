import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Platform } from "ionic-angular/platform/platform";



@Injectable()
export class LayoutService {

    data: BehaviorSubject<ScreenProperties> = new BehaviorSubject<ScreenProperties>({ width: 100, height: 100 });

    constructor(private plt: Platform) { }

    setScreenSize(width: number, height: number) {
        this.data.next({ width: width, height: height });
    }

    isPlatform(name: string) {
        return this.plt.is(name);
    }

    getPlatforms() {
        return this.plt.platforms();
    }

    isPortrait() {
        return this.plt.isPortrait();
    }

    isLandscape() {
        return this.plt.isLandscape();
    }
}

export class ScreenProperties {
    width: number;
    height: number;
}