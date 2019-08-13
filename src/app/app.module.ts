import {BrowserModule} from "@angular/platform-browser";
import {ApplicationRef, NgModule} from "@angular/core";
import {AppComponent} from "./components";
import {ApiClientModule, ApiClientSettings, ApiClientSettingsProvider} from "../api-client";
import {Store} from "@ngrx/store";
import {AppState, AppStoreModule} from "../store";
import {DgpNgApp} from "dgp-ng-app";

declare var injectedAppSettings: ApiClientSettings;

const apiClientSettings: ApiClientSettings = {};

@NgModule({
  imports: [
    BrowserModule,
    ApiClientModule.forRoot({
      provide: ApiClientSettings,
      useValue: apiClientSettings
    } as ApiClientSettingsProvider),
    AppStoreModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule extends DgpNgApp {

  constructor(public appRef: ApplicationRef,
              private ngrxStore: Store<AppState>) {
    super();
  }

}
