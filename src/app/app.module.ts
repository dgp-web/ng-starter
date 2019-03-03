import { BrowserModule } from "@angular/platform-browser";
import { ApplicationRef, NgModule } from "@angular/core";
import { createNewHosts, removeNgStyles } from "@angularclass/hmr";
import { AppComponent } from "./components";

@NgModule({
    imports: [
        BrowserModule,
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

    constructor(public appRef: ApplicationRef) {
    }

    //noinspection JSUnusedGlobalSymbols
    hmrOnInit(store) {
        if (!store || !store.rootState) return;
        this.appRef.tick();
        Object.keys(store)
            .forEach(prop => delete store[prop]);
    }

    //noinspection JSUnusedGlobalSymbols
    hmrOnDestroy(store) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        store.disposeOldHosts = createNewHosts(cmpLocation);
        removeNgStyles();
    }

    //noinspection JSUnusedGlobalSymbols
    hmrAfterDestroy(store) {
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }

}
