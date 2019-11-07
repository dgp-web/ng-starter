import "dgp-ng-app/polyfills";
import {enableProdMode} from "@angular/core";
import {AppModule} from "./app/app.module";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {bootloader, hmrModule} from "@angularclass/hmr";

if (process.env["production"]) {
    enableProdMode();
}

export function main() {
    return platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .then((ngModuleRef: any) => {
            return hmrModule(ngModuleRef, module);
        });
}

bootloader(main);
