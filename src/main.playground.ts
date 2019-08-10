import "dgp-ng-app/polyfills";
import {PlaygroundModule} from "angular-playground";
import {Component, enableProdMode, HostBinding, NgModule, ViewEncapsulation} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {startPlayground} from "dgp-ng-app";

if (process.env["production"]) {
    enableProdMode();
}

@Component({
    selector: "playground-app",
    template: "<ng-content></ng-content>",
    styleUrls: [
        "./playground-app.component.scss"
    ],
    encapsulation: ViewEncapsulation.None
})
export class PlaygroundAppComponent {

    @HostBinding("class.mat-typography")
    readonly bindings = true;

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

startPlayground(PlaygroundModule
    .configure({
        overlay: false,
        modules: [
            PlaygroundAppModule,
            BrowserAnimationsModule
        ]
    }));
