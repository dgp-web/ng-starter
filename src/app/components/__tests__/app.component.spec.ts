import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ChangeDetectionStrategy} from "@angular/core";
import {AppComponent} from "../app.component";

describe(AppComponent.name, () => {

    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;


    beforeEach(async(async () => {

        await TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ]
        })
            .compileComponents();

        TestBed.overrideComponent(AppComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default
            }
        });

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

});
