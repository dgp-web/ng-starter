import {BrowserModule} from "@angular/platform-browser";
import {ApplicationRef, NgModule} from "@angular/core";
import {createNewHosts, removeNgStyles} from "@angularclass/hmr";
import {AppComponent} from "./components";
import {ApiClientModule, ApiClientSettings} from "../api-client";
import {take} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AppState, AppStoreModule, HmrReloadAction} from "../store";

@NgModule({
  imports: [
    BrowserModule,
    ApiClientModule.forRoot({
      provide: ApiClientSettings,
      useValue: {}
    }),
    AppStoreModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

  constructor(public appRef: ApplicationRef,
              private ngrxStore: Store<AppState>) {
  }

  //noinspection JSUnusedGlobalSymbols
  hmrOnInit(store: any) {
    if (!store || !store.rootState) return;
    if (store.rootState) {
      this.ngrxStore.dispatch(new HmrReloadAction(store.rootState));
    }

    Object.keys(store)
      .forEach(prop => delete store[prop]);
  }

  //noinspection JSUnusedGlobalSymbols
  hmrOnDestroy(store: any) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);

    store.disposeOldHosts = createNewHosts(cmpLocation);

    this.ngrxStore
      .pipe(take(1))
      .subscribe(s => store.rootState = s);

    removeNgStyles();
  }

  //noinspection JSUnusedGlobalSymbols
  hmrAfterDestroy(store: any) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
