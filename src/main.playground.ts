import "dgp-ng-app/polyfills";
import {PlaygroundModule} from "angular-playground";
import {Component, enableProdMode, HostBinding, NgModule, ViewEncapsulation} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { hmrModule, bootloader } from "@angularclass/hmr";

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


PlaygroundModule
    .configure({
        overlay: false,
        modules: [
            PlaygroundAppModule,
            BrowserAnimationsModule
        ]
    });

export function main() {
    return platformBrowserDynamic()
        .bootstrapModule(PlaygroundModule)
        .then((ngModuleRef: any) => {

            const newHost = document.createElement("ap-root");
            const body = document.querySelector("body");

            body.insertAdjacentElement("afterbegin", newHost);

            return hmrModule(ngModuleRef, module);
        });
}

bootloader(main);
