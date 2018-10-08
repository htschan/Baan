import { Router, NavigationEnd } from '@angular/router';

export class BasePage {
    navigationSubscription;
    currentRoute;
    constructor(public router: Router, public initFunction: () => void) {
        this.currentRoute = router.routerState.snapshot.url;
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // If it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
                if (e.url === this.currentRoute) {
                    this.initFunction();
                }
            }
        });
    }

    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    destroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }
}
