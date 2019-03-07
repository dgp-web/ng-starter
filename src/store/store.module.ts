import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {appMetaReducers, appReducer, appReducerProviders} from "./store";
import {EffectsModule} from "@ngrx/effects";
import * as effects from "./effects";

@NgModule({
  imports: [
    StoreModule.forRoot(
      appReducer, {
        metaReducers: appMetaReducers
      }
    ),
    EffectsModule.forRoot([
      effects.AppEffects
    ])
  ],
  providers: [
    appReducerProviders
  ]
})
export class AppStoreModule {
}
