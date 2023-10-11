var Ng2FlatpickrComponent_1;
import { __decorate } from "tslib";
import { Component, ViewChild, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
if (typeof window !== 'undefined') {
    require('flatpickr');
}
let Ng2FlatpickrComponent = Ng2FlatpickrComponent_1 = class Ng2FlatpickrComponent {
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
};
__decorate([
    ViewChild('flatpickr', {
        static: true
    })
], Ng2FlatpickrComponent.prototype, "flatpickrElement", void 0);
__decorate([
    Input()
], Ng2FlatpickrComponent.prototype, "config", void 0);
__decorate([
    Input()
], Ng2FlatpickrComponent.prototype, "placeholder", void 0);
__decorate([
    Input()
], Ng2FlatpickrComponent.prototype, "addClass", void 0);
__decorate([
    Input()
], Ng2FlatpickrComponent.prototype, "setDate", void 0);
__decorate([
    Input()
], Ng2FlatpickrComponent.prototype, "tabindex", null);
__decorate([
    Input()
], Ng2FlatpickrComponent.prototype, "hideButton", void 0);
Ng2FlatpickrComponent = Ng2FlatpickrComponent_1 = __decorate([
    Component({
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
                useExisting: forwardRef(() => Ng2FlatpickrComponent_1),
                multi: true
            }
        ]
    })
], Ng2FlatpickrComponent);
export { Ng2FlatpickrComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZmxhdHBpY2tyLXdyYXAvIiwic291cmNlcyI6WyJzcmMvbmcyLWZsYXRwaWNrci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBaUIsVUFBVSxFQUFFLEtBQUssRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBS3pFLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO0lBQ2xDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztDQUNyQjtBQWtCRCxJQUFhLHFCQUFxQiw2QkFBbEMsTUFBYSxxQkFBcUI7SUFBbEM7UUFHUyxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLGdCQUFXLEdBQWEsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTFCLDRCQUF1QixHQUFxQjtZQUNuRCxJQUFJLEVBQUUsSUFBSTtZQUNWLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFFBQVEsRUFBRSxDQUFDLGFBQWtCLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3JFLENBQUM7UUFXRixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUd6QixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBVXRCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFnQm5CLG9CQUFlLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQTRDbkMsQ0FBQztJQWhFQSxJQUFJLFFBQVEsS0FBSyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLElBQUksUUFBUSxDQUFDLEVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENB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O2dCQUNwRCxLQUFLLEVBQUUsSUFBSTthQUNYO1NBQ0Q7S0FDRCxDQUFDO0dBQ1cscUJBQXFCLENBOEZqQztTQTlGWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmxhdHBpY2tyT3B0aW9ucyB9IGZyb20gJy4vZmxhdHBpY2tyLW9wdGlvbnMuaW50ZXJmYWNlJztcblxuZGVjbGFyZSB2YXIgcmVxdWlyZTogYW55O1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0cmVxdWlyZSgnZmxhdHBpY2tyJyk7XG59XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ25nMi1mbGF0cGlja3InLFxuXHR0ZW1wbGF0ZTogYFxuXHRcdDxkaXYgY2xhc3M9XCJuZzItZmxhdHBpY2tyLWlucHV0LWNvbnRhaW5lclwiICNmbGF0cGlja3I+XG5cdFx0XHQ8aW5wdXQgKm5nSWY9XCIhaGlkZUJ1dHRvblwiIGNsYXNzPVwibmcyLWZsYXRwaWNrci1pbnB1dCB7eyBhZGRDbGFzcyB9fVwiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIFt0YWJpbmRleF09XCJ0YWJpbmRleFwiIHR5cGU9XCJ0ZXh0XCIgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiIGRhdGEtaW5wdXQ+XG5cdFx0XHQ8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cdFx0PC9kaXY+XG5cdFx0YCxcblx0cHJvdmlkZXJzOiBbXG5cdFx0e1xuXHRcdFx0cHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG5cdFx0XHR1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZzJGbGF0cGlja3JDb21wb25lbnQpLFxuXHRcdFx0bXVsdGk6IHRydWVcblx0XHR9XG5cdF1cbn0pXG5leHBvcnQgY2xhc3MgTmcyRmxhdHBpY2tyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcyB7XG5cblx0cHVibGljIGZsYXRwaWNrcjogT2JqZWN0O1xuXHRwcml2YXRlIF90YWJpbmRleCA9IDA7XG5cdG9uVG91Y2hlZEZuOiBGdW5jdGlvbiA9ICgpID0+IHsgfTtcblxuXHRwcml2YXRlIGRlZmF1bHRGbGF0cGlja3JPcHRpb25zOiBGbGF0cGlja3JPcHRpb25zID0ge1xuXHRcdHdyYXA6IHRydWUsXG5cdFx0Y2xpY2tPcGVuczogdHJ1ZSxcblx0XHRvbkNoYW5nZTogKHNlbGVjdGVkRGF0ZXM6IGFueSkgPT4geyB0aGlzLndyaXRlVmFsdWUoc2VsZWN0ZWREYXRlcyk7IH1cblx0fTtcblxuXHRAVmlld0NoaWxkKCdmbGF0cGlja3InLCB7XG5cdFx0c3RhdGljOiB0cnVlXG5cdH0pXG5cdGZsYXRwaWNrckVsZW1lbnQ6IGFueTtcblxuXHRASW5wdXQoKVxuXHRjb25maWc6IEZsYXRwaWNrck9wdGlvbnM7XG5cblx0QElucHV0KClcblx0cGxhY2Vob2xkZXI6IHN0cmluZyA9IFwiXCI7XG5cblx0QElucHV0KClcblx0YWRkQ2xhc3M6IHN0cmluZyA9IFwiXCI7XG5cblx0QElucHV0KClcblx0c2V0RGF0ZTogc3RyaW5nIHwgRGF0ZTtcblxuXHRASW5wdXQoKVxuXHRnZXQgdGFiaW5kZXgoKSB7IHJldHVybiB0aGlzLl90YWJpbmRleDsgfVxuXHRzZXQgdGFiaW5kZXgodGk6IG51bWJlcikgeyB0aGlzLl90YWJpbmRleCA9IE51bWJlcih0aSk7IH1cblxuXHRASW5wdXQoKVxuXHRoaWRlQnV0dG9uID0gZmFsc2U7XG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHR3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcblx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSh2YWx1ZSk7XG5cdH1cblxuXHRyZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcblx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuXHR9XG5cblx0cmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuXHRcdHRoaXMub25Ub3VjaGVkRm4gPSBmbjtcblx0fVxuXG5cdHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdHNldERhdGVGcm9tSW5wdXQoZGF0ZTogYW55KSB7XG5cdFx0dGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuX2ZsYXRwaWNrci5zZXREYXRlKGRhdGUsIHRydWUpO1xuXHR9XG5cblx0c2V0QWx0SW5wdXRQbGFjZWhvbGRlcihwbGFjZWhvbGRlcjogc3RyaW5nKSB7XG5cdFx0dGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuX2ZsYXRwaWNrci5hbHRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgcGxhY2Vob2xkZXIpO1xuXHR9XG5cblx0bmdBZnRlclZpZXdJbml0KCkge1xuXHRcdGlmICh0aGlzLmNvbmZpZykge1xuXHRcdFx0T2JqZWN0LmFzc2lnbih0aGlzLmRlZmF1bHRGbGF0cGlja3JPcHRpb25zLCB0aGlzLmNvbmZpZyk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5mbGF0cGlja3IpIHtcblx0XHRcdHRoaXMuZmxhdHBpY2tyID0gdGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZmxhdHBpY2tyKHRoaXMuZGVmYXVsdEZsYXRwaWNrck9wdGlvbnMpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5zZXREYXRlKSB7XG5cdFx0XHR0aGlzLnNldERhdGVGcm9tSW5wdXQodGhpcy5zZXREYXRlKTtcblx0XHR9XG5cdH1cblxuXHRuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG5cdFx0aWYgKHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50XG5cdFx0XHQmJiB0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5fZmxhdHBpY2tyKSB7XG5cblx0XHRcdGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdzZXREYXRlJylcblx0XHRcdFx0JiYgY2hhbmdlc1snc2V0RGF0ZSddLmN1cnJlbnRWYWx1ZSkge1xuXHRcdFx0XHR0aGlzLnNldERhdGVGcm9tSW5wdXQoY2hhbmdlc1snc2V0RGF0ZSddLmN1cnJlbnRWYWx1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLmNvbmZpZy5hbHRJbnB1dFxuXHRcdFx0XHQmJiBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdwbGFjZWhvbGRlcicpXG5cdFx0XHRcdCYmIGNoYW5nZXNbJ3BsYWNlaG9sZGVyJ10uY3VycmVudFZhbHVlKSB7XG5cdFx0XHRcdHRoaXMuc2V0QWx0SW5wdXRQbGFjZWhvbGRlcihjaGFuZ2VzWydwbGFjZWhvbGRlciddLmN1cnJlbnRWYWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0b25Gb2N1cyhldmVudDogYW55KSB7XG5cdFx0dGhpcy5vblRvdWNoZWRGbigpO1xuXHR9XG59XG4iXX0=