import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2FlatpickrComponent } from './ng2-flatpickr.component';
import { Ng2FlatpickrDirective } from './ng2-flatpickr.directive';
import 'flatpickr-wrap';
export class Ng2FlatpickrModule {
}
Ng2FlatpickrModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [
                    Ng2FlatpickrComponent,
                    Ng2FlatpickrDirective
                ],
                exports: [
                    Ng2FlatpickrComponent,
                    Ng2FlatpickrDirective
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbmcyLWZsYXRwaWNrci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxnQkFBZ0IsQ0FBQztBQWF4QixNQUFNLE9BQU8sa0JBQWtCOzs7WUFYOUIsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsWUFBWSxFQUFFO29CQUNWLHFCQUFxQjtvQkFDckIscUJBQXFCO2lCQUN4QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wscUJBQXFCO29CQUNyQixxQkFBcUI7aUJBQ3hCO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nMkZsYXRwaWNrckNvbXBvbmVudCB9IGZyb20gJy4vbmcyLWZsYXRwaWNrci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmcyRmxhdHBpY2tyRGlyZWN0aXZlIH0gZnJvbSAnLi9uZzItZmxhdHBpY2tyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgJ2ZsYXRwaWNrci13cmFwJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTmcyRmxhdHBpY2tyQ29tcG9uZW50LFxuICAgICAgICBOZzJGbGF0cGlja3JEaXJlY3RpdmVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTmcyRmxhdHBpY2tyQ29tcG9uZW50LFxuICAgICAgICBOZzJGbGF0cGlja3JEaXJlY3RpdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nMkZsYXRwaWNrck1vZHVsZSB7XG59XG4iXX0=