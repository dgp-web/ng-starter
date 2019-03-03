import "./polyfills";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { PlaygroundModule } from "angular-playground";
import { Component, NgModule, ViewEncapsulation } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { hmrModule } from "@angularclass/hmr";

@Component({
    selector: "dgp-playground-app",
    template: "<ng-content></ng-content>",
    encapsulation: ViewEncapsulation.None
})
export class PlaygroundAppComponent {

}

@NgModule({
    declarations: [
        PlaygroundAppComponent
    ],
    exports: [
        PlaygroundAppComponent
    ]
})
export class PlaygroundAppModule {

}

PlaygroundModule
    .configure({
        overlay: false,
        modules: [
            PlaygroundAppModule,
            BrowserAnimationsModule
        ]
    });

platformBrowserDynamic().bootstrapModule(PlaygroundModule)
    .then((ngModuleRef: any) => {
        return hmrModule(ngModuleRef, module);
    });
