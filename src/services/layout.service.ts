import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Platform } from "ionic-angular/platform/platform";
import { Events } from "ionic-angular";

const hideSplitPaneThreshold = 576; // sm

@Injectable()
export class LayoutService {

    splitPaneHidden: boolean;
    allowSplitPane: boolean;

    splitPane: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    data: BehaviorSubject<ScreenProperties> = new BehaviorSubject<ScreenProperties>(
        { width: 100, height: 100, contentWidth: 100, contentHeight: 100 });

    constructor(
        private plt: Platform,
        public events: Events,
    ) {
        events.subscribe('user:signout', (user) => {
            this.hideSplitPane();
            this.splitPane.next(false);
        });
        events.subscribe('user:signin', (user) => {
            this.unHideSplitPane();
            this.splitPane.next(true);
        });

    }

    setScreenSize(width: number, height: number, contentWidth: number, contentHeight: number) {
        this.data.next({ width: width, height: height, contentWidth: contentWidth, contentHeight: contentHeight });
        this.allowSplitPane = width > hideSplitPaneThreshold;
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

    showSplitPane() {
        return this.allowSplitPane && !this.splitPaneHidden;
    }

    hideSplitPane() {
        this.splitPaneHidden = true;
    }

    unHideSplitPane() {
        this.splitPaneHidden = false;
    }
}

export class ScreenProperties {
    width: number;
    height: number;
    contentWidth: number;
    contentHeight: number;
}