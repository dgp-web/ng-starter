import "./polyfills";
import {enableProdMode} from "@angular/core";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

import {AppModule} from "./app/app.module";
import {bootloader, hmrModule} from "@angularclass/hmr/dist";

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
