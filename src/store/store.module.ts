import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { appMetaReducers, appReducer, appReducerProviders } from "./store";
import { EffectsModule } from "@ngrx/effects";
import * as effects from "./effects";
import * as dgp from "dgp-ng-app";

@NgModule({
    imports: [
        StoreModule.forRoot(
            appReducer, {
                metaReducers: appMetaReducers
            }
        ),
        EffectsModule.forRoot([
            effects.AppEffects
        ]),

        dgp.DgpRequestStoreModule,
    ],
    providers: [
        appReducerProviders
    ]
})
export class AppStoreModule {
}
