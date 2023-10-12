import { Component, ViewChild, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
if (typeof window !== 'undefined') {
    require('flatpickr-wrap');
}
export class Ng2FlatpickrComponent {
    constructor() {
        this._tabindex = 0;
        this.onTouchedFn = () => { };
        this.defaultFlatpickrOptions = {
            wrap: true,
            clickOpens: true,
            onChange: (selectedDates) => { this.writeValue(selectedDates); }
        };
        this.placeholder = "";
        this.addClass = "";
        this.hideButton = false;
        this.propagateChange = (_) => { };
    }
    get tabindex() { return this._tabindex; }
    set tabindex(ti) { this._tabindex = Number(ti); }
    ///////////////////////////////////
    writeValue(value) {
        this.propagateChange(value);
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedFn = fn;
    }
    ///////////////////////////////////
    setDateFromInput(date) {
        this.flatpickrElement.nativeElement._flatpickr.setDate(date, true);
    }
    setAltInputPlaceholder(placeholder) {
        this.flatpickrElement.nativeElement._flatpickr.altInput.setAttribute('placeholder', placeholder);
    }
    ngAfterViewInit() {
        if (this.config) {
            Object.assign(this.defaultFlatpickrOptions, this.config);
        }
        if (this.flatpickrElement.nativeElement.flatpickr) {
            this.flatpickr = this.flatpickrElement.nativeElement.flatpickr(this.defaultFlatpickrOptions);
        }
        if (this.setDate) {
            this.setDateFromInput(this.setDate);
        }
    }
    ngOnChanges(changes) {
        if (this.flatpickrElement.nativeElement
            && this.flatpickrElement.nativeElement._flatpickr) {
            if (changes.hasOwnProperty('setDate')
                && changes['setDate'].currentValue) {
                this.setDateFromInput(changes['setDate'].currentValue);
            }
            if (this.config.altInput
                && changes.hasOwnProperty('placeholder')
                && changes['placeholder'].currentValue) {
                this.setAltInputPlaceholder(changes['placeholder'].currentValue);
            }
        }
    }
    onFocus(event) {
        this.onTouchedFn();
    }
}
Ng2FlatpickrComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng2-flatpickr',
                template: `
		<div class="ng2-flatpickr-input-container" #flatpickr>
			<input *ngIf="!hideButton" class="ng2-flatpickr-input {{ addClass }}" [placeholder]="placeholder" [tabindex]="tabindex" type="text" (focus)="onFocus($event)" data-input>
			<ng-content></ng-content>
		</div>
		`,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => Ng2FlatpickrComponent),
                        multi: true
                    }
                ]
            },] }
];
Ng2FlatpickrComponent.propDecorators = {
    flatpickrElement: [{ type: ViewChild, args: ['flatpickr', {
                    static: true
                },] }],
    config: [{ type: Input }],
    placeholder: [{ type: Input }],
    addClass: [{ type: Input }],
    setDate: [{ type: Input }],
    tabindex: [{ type: Input }],
    hideButton: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbmcyLWZsYXRwaWNrci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQWlCLFVBQVUsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUt6RSxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtJQUNsQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztDQUMxQjtBQWtCRCxNQUFNLE9BQU8scUJBQXFCO0lBaEJsQztRQW1CUyxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLGdCQUFXLEdBQWEsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTFCLDRCQUF1QixHQUFxQjtZQUNuRCxJQUFJLEVBQUUsSUFBSTtZQUNWLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFFBQVEsRUFBRSxDQUFDLGFBQWtCLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3JFLENBQUM7UUFXRixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUd6QixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBVXRCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFnQm5CLG9CQUFlLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQTRDbkMsQ0FBQztJQWpFQSxJQUNJLFFBQVEsS0FBSyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLElBQUksUUFBUSxDQUFDLEVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFLekQsbUNBQW1DO0lBRW5DLFVBQVUsQ0FBQyxLQUFVO1FBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQU87UUFDdkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQU87UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUlELG1DQUFtQztJQUVuQyxnQkFBZ0IsQ0FBQyxJQUFTO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELHNCQUFzQixDQUFDLFdBQW1CO1FBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2xHLENBQUM7SUFFRCxlQUFlO1FBQ2QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN6RDtRQUNELElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUU7WUFDbEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUM3RjtRQUNELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3BDO0lBQ0YsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNqQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhO2VBQ25DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFO1lBRW5ELElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7bUJBQ2pDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDdkQ7WUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUTttQkFDcEIsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUM7bUJBQ3JDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDakU7U0FDRDtJQUNGLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBVTtRQUNqQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7O1lBN0dELFNBQVMsU0FBQztnQkFDVixRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFOzs7OztHQUtSO2dCQUNGLFNBQVMsRUFBRTtvQkFDVjt3QkFDQyxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixDQUFDO3dCQUNwRCxLQUFLLEVBQUUsSUFBSTtxQkFDWDtpQkFDRDthQUNEOzs7K0JBYUMsU0FBUyxTQUFDLFdBQVcsRUFBRTtvQkFDdkIsTUFBTSxFQUFFLElBQUk7aUJBQ1o7cUJBR0EsS0FBSzswQkFHTCxLQUFLO3VCQUdMLEtBQUs7c0JBR0wsS0FBSzt1QkFHTCxLQUFLO3lCQUlMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmxhdHBpY2tyT3B0aW9ucyB9IGZyb20gJy4vZmxhdHBpY2tyLW9wdGlvbnMuaW50ZXJmYWNlJztcblxuZGVjbGFyZSB2YXIgcmVxdWlyZTogYW55O1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0cmVxdWlyZSgnZmxhdHBpY2tyLXdyYXAnKTtcbn1cblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnbmcyLWZsYXRwaWNrcicsXG5cdHRlbXBsYXRlOiBgXG5cdFx0PGRpdiBjbGFzcz1cIm5nMi1mbGF0cGlja3ItaW5wdXQtY29udGFpbmVyXCIgI2ZsYXRwaWNrcj5cblx0XHRcdDxpbnB1dCAqbmdJZj1cIiFoaWRlQnV0dG9uXCIgY2xhc3M9XCJuZzItZmxhdHBpY2tyLWlucHV0IHt7IGFkZENsYXNzIH19XCIgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCIgW3RhYmluZGV4XT1cInRhYmluZGV4XCIgdHlwZT1cInRleHRcIiAoZm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCIgZGF0YS1pbnB1dD5cblx0XHRcdDxuZy1jb250ZW50PjwvbmctY29udGVudD5cblx0XHQ8L2Rpdj5cblx0XHRgLFxuXHRwcm92aWRlcnM6IFtcblx0XHR7XG5cdFx0XHRwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcblx0XHRcdHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nMkZsYXRwaWNrckNvbXBvbmVudCksXG5cdFx0XHRtdWx0aTogdHJ1ZVxuXHRcdH1cblx0XVxufSlcbmV4cG9ydCBjbGFzcyBOZzJGbGF0cGlja3JDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzIHtcblxuXHRwdWJsaWMgZmxhdHBpY2tyOiBPYmplY3Q7XG5cdHByaXZhdGUgX3RhYmluZGV4ID0gMDtcblx0b25Ub3VjaGVkRm46IEZ1bmN0aW9uID0gKCkgPT4geyB9O1xuXG5cdHByaXZhdGUgZGVmYXVsdEZsYXRwaWNrck9wdGlvbnM6IEZsYXRwaWNrck9wdGlvbnMgPSB7XG5cdFx0d3JhcDogdHJ1ZSxcblx0XHRjbGlja09wZW5zOiB0cnVlLFxuXHRcdG9uQ2hhbmdlOiAoc2VsZWN0ZWREYXRlczogYW55KSA9PiB7IHRoaXMud3JpdGVWYWx1ZShzZWxlY3RlZERhdGVzKTsgfVxuXHR9O1xuXG5cdEBWaWV3Q2hpbGQoJ2ZsYXRwaWNrcicsIHtcblx0XHRzdGF0aWM6IHRydWVcblx0fSlcblx0ZmxhdHBpY2tyRWxlbWVudDogYW55O1xuXG5cdEBJbnB1dCgpXG5cdGNvbmZpZzogRmxhdHBpY2tyT3B0aW9ucztcblxuXHRASW5wdXQoKVxuXHRwbGFjZWhvbGRlcjogc3RyaW5nID0gXCJcIjtcblxuXHRASW5wdXQoKVxuXHRhZGRDbGFzczogc3RyaW5nID0gXCJcIjtcblxuXHRASW5wdXQoKVxuXHRzZXREYXRlOiBzdHJpbmcgfCBEYXRlO1xuXG5cdEBJbnB1dCgpXG5cdGdldCB0YWJpbmRleCgpIHsgcmV0dXJuIHRoaXMuX3RhYmluZGV4OyB9XG5cdHNldCB0YWJpbmRleCh0aTogbnVtYmVyKSB7IHRoaXMuX3RhYmluZGV4ID0gTnVtYmVyKHRpKTsgfVxuXG5cdEBJbnB1dCgpXG5cdGhpZGVCdXR0b24gPSBmYWxzZTtcblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuXHRcdHRoaXMucHJvcGFnYXRlQ2hhbmdlKHZhbHVlKTtcblx0fVxuXG5cdHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuXHRcdHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG5cdH1cblxuXHRyZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG5cdFx0dGhpcy5vblRvdWNoZWRGbiA9IGZuO1xuXHR9XG5cblx0cHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0c2V0RGF0ZUZyb21JbnB1dChkYXRlOiBhbnkpIHtcblx0XHR0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5fZmxhdHBpY2tyLnNldERhdGUoZGF0ZSwgdHJ1ZSk7XG5cdH1cblxuXHRzZXRBbHRJbnB1dFBsYWNlaG9sZGVyKHBsYWNlaG9sZGVyOiBzdHJpbmcpIHtcblx0XHR0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5fZmxhdHBpY2tyLmFsdElucHV0LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBwbGFjZWhvbGRlcik7XG5cdH1cblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0aWYgKHRoaXMuY29uZmlnKSB7XG5cdFx0XHRPYmplY3QuYXNzaWduKHRoaXMuZGVmYXVsdEZsYXRwaWNrck9wdGlvbnMsIHRoaXMuY29uZmlnKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50LmZsYXRwaWNrcikge1xuXHRcdFx0dGhpcy5mbGF0cGlja3IgPSB0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5mbGF0cGlja3IodGhpcy5kZWZhdWx0RmxhdHBpY2tyT3B0aW9ucyk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLnNldERhdGUpIHtcblx0XHRcdHRoaXMuc2V0RGF0ZUZyb21JbnB1dCh0aGlzLnNldERhdGUpO1xuXHRcdH1cblx0fVxuXG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblx0XHRpZiAodGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnRcblx0XHRcdCYmIHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50Ll9mbGF0cGlja3IpIHtcblxuXHRcdFx0aWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3NldERhdGUnKVxuXHRcdFx0XHQmJiBjaGFuZ2VzWydzZXREYXRlJ10uY3VycmVudFZhbHVlKSB7XG5cdFx0XHRcdHRoaXMuc2V0RGF0ZUZyb21JbnB1dChjaGFuZ2VzWydzZXREYXRlJ10uY3VycmVudFZhbHVlKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuY29uZmlnLmFsdElucHV0XG5cdFx0XHRcdCYmIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3BsYWNlaG9sZGVyJylcblx0XHRcdFx0JiYgY2hhbmdlc1sncGxhY2Vob2xkZXInXS5jdXJyZW50VmFsdWUpIHtcblx0XHRcdFx0dGhpcy5zZXRBbHRJbnB1dFBsYWNlaG9sZGVyKGNoYW5nZXNbJ3BsYWNlaG9sZGVyJ10uY3VycmVudFZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRvbkZvY3VzKGV2ZW50OiBhbnkpIHtcblx0XHR0aGlzLm9uVG91Y2hlZEZuKCk7XG5cdH1cbn1cbiJdfQ==