import { BrowserModule } from "@angular/platform-browser";
import { ApplicationRef, NgModule } from "@angular/core";
import { AppComponent } from "./components";
import { ApiClientModule, ApiClientSettings, ApiClientSettingsProvider } from "../api-client";
import { Store } from "@ngrx/store";
import { AppState, AppStoreModule } from "../store";
import * as dgp from "dgp-ng-app";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UiSharedModule } from "../ui/shared";
import * as services from "./services";
import * as features from "../features";

declare var injectedAppSettings: ApiClientSettings;

const apiClientSettings: ApiClientSettings = {};

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        ApiClientModule.forRoot({
            provide: ApiClientSettings,
            useValue: apiClientSettings
        } as ApiClientSettingsProvider),

        AppStoreModule,

        RouterModule.forRoot([]),

        dgp.DgpAuthenticationModule.forRoot({
            authenticationApiClientProvider: services.authenticationApiClientProvider,
            initializationServiceProvider: services.initializationServiceProvider
        }),
        dgp.DgpHamburgerShellModule.forRoot(),
        dgp.DgpThemeSwitcherModule.forRoot(),
        dgp.DgpLogModule,
        dgp.DgpBroadcastStoreModule.forRoot(),

        UiSharedModule,
        features.HomeModule
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule extends dgp.DgpNgApp {

    constructor(public appRef: ApplicationRef,
                protected ngrxStore: Store<AppState>) {
        super(appRef, ngrxStore);

        this.ngrxStore.dispatch(
            new dgp.SetBroadcastChannelDataIdAction("dgpNgApp")
        );
    }

}
