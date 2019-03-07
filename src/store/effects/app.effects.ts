import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {hmrReloadActionType} from "../actions";
import {tap} from "rxjs/operators";

@Injectable()
export class AppEffects {

  /*  @Effect({
      dispatch: false
    })
    onHmrReload$ = this.actions.pipe(
      ofType(hmrReloadActionType),
      tap(() => {
        console.log("App is reloaded");
      })
    );*/

  constructor(
    private readonly actions: Actions
  ) {
  }

}
