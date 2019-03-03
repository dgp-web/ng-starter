import {sandboxOf} from "angular-playground";
import {AppComponent} from "../app.component";

export default sandboxOf(AppComponent)
    .add("default", {
        template: `<app></app>`
    });
