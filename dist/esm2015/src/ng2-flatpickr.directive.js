import { __decorate } from "tslib";
import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, OnChanges } from '@angular/core';
import { ControlContainer, FormControl, NgControl } from '@angular/forms';
let Ng2FlatpickrDirective = class Ng2FlatpickrDirective {
    constructor(parent, ngControl, element, renderer) {
        this.parent = parent;
        this.ngControl = ngControl;
        this.element = element;
        this.renderer = renderer;
        /**
         * onChange gets triggered when the user selects a date, or changes the time on a selected date.
         *
         * Default:  null
         */
        this.flatpickrOnChange = new EventEmitter();
        /**
         * onClose gets triggered when the calendar is closed.
         *
         * Default:  null
         */
        this.flatpickrOnClose = new EventEmitter();
        /**
         * onOpen gets triggered when the calendar is opened.
         *
         * Default:  null
         */
        this.flatpickrOnOpen = new EventEmitter();
        /**
         * onReady gets triggered once the calendar is in a ready state.
         *
         * Default:  null
         */
        this.flatpickrOnReady = new EventEmitter();
    }
    /** Allow double-clicking on the control to open/close it. */
    onClick() {
        this.flatpickr.toggle();
    }
    get control() {
        return this.parent ? this.parent.formDirective.getControl(this.ngControl) : null;
    }
    ngAfterViewInit() {
        /** We cannot initialize the flatpickr instance in ngOnInit(); it will
            randomize the date when the form control initializes. */
        let nativeElement = this.element.nativeElement;
        if (typeof nativeElement === 'undefined' || nativeElement === null) {
            throw 'Error: invalid input element specified';
        }
        if (this.flatpickrOptions.wrap) {
            this.renderer.setAttribute(this.element.nativeElement, 'data-input', '');
            nativeElement = nativeElement.parentNode;
        }
        this.flatpickr = nativeElement.flatpickr(this.flatpickrOptions);
    }
    ngOnChanges(changes) {
        if (this.flatpickr
            && this.flatpickrAltInput
            && changes.hasOwnProperty('placeholder')
            && changes['placeholder'].currentValue) {
            this.flatpickr.altInput.setAttribute('placeholder', changes['placeholder'].currentValue);
        }
    }
    ngOnDestroy() {
        if (this.flatpickr) {
            this.flatpickr.destroy();
        }
        if (this.formControlListener) {
            this.formControlListener.unsubscribe();
            this.formControlListener = undefined;
        }
        this.flatpickrOnChange = undefined;
        this.flatpickrOnClose = undefined;
        this.flatpickrOnOpen = undefined;
        this.flatpickrOnReady = undefined;
    }
    ngOnInit() {
        this.globalOnChange = this.flatpickrOptions.onChange;
        this.globalOnClose = this.flatpickrOptions.onClose;
        this.globalOnOpen = this.flatpickrOptions.onOpen;
        this.globalOnReady = this.flatpickrOptions.onReady;
        this.flatpickrOptions = {
            altFormat: this.getOption('altFormat'),
            altInput: this.getOption('altInput'),
            altInputClass: this.getOption('altInputClass'),
            allowInput: this.getOption('allowInput'),
            appendTo: this.getOption('appendTo'),
            clickOpens: this.getOption('clickOpens', true),
            dateFormat: this.getOption('dateFormat'),
            defaultDate: this.getOption('defaultDate'),
            disable: this.getOption('disable'),
            disableMobile: this.getOption('disableMobile'),
            enable: this.getOption('enable'),
            enableTime: this.getOption('enableTime'),
            enableSeconds: this.getOption('enableSeconds'),
            hourIncrement: this.getOption('hourIncrement'),
            inline: this.getOption('inline'),
            locale: this.getOption('locale'),
            maxDate: this.getOption('maxDate'),
            minDate: this.getOption('minDate'),
            minuteIncrement: this.getOption('minuteIncrement'),
            mode: this.getOption('mode'),
            nextArrow: this.getOption('nextArrow'),
            noCalendar: this.getOption('noCalendar'),
            onChange: this.eventOnChange.bind(this),
            onClose: this.eventOnClose.bind(this),
            onOpen: this.eventOnOpen.bind(this),
            onReady: this.eventOnReady.bind(this),
            parseDate: this.getOption('parseDate'),
            prevArrow: this.getOption('prevArrow'),
            shorthandCurrentMonth: this.getOption('shorthandCurrentMonth'),
            static: this.getOption('static'),
            time_24hr: this.getOption('time_24hr'),
            utc: this.getOption('utc'),
            weekNumbers: this.getOption('weekNumbers'),
            wrap: this.getOption('wrap', true),
        };
        // Remove unset properties
        Object.keys(this.flatpickrOptions).forEach((key) => {
            (this.flatpickrOptions[key] === undefined) &&
                delete this.flatpickrOptions[key];
        });
        if (this.control) {
            this.formControlListener = this.control.valueChanges
                .subscribe((value) => {
                if (!(value instanceof Date)) {
                    // Quietly update the value of the form control to be a
                    // Date object. This avoids any external subscribers
                    // from being notified a second time (once for the user
                    // initiated event, and once for our conversion to
                    // Date()).
                    this.control.setValue(new Date('' + value), {
                        onlySelf: true,
                        emitEvent: false,
                        emitModelToViewChange: false,
                        emitViewToModelChange: false
                    });
                }
            });
        }
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onChange callback, if defined.
     */
    eventOnChange(selectedDates, dateStr, instance) {
        let event = {
            selectedDates: selectedDates,
            dateStr: dateStr,
            instance: instance
        };
        if (this.flatpickrOnChange) {
            this.flatpickrOnChange.emit(event);
        }
        if (this.globalOnChange) {
            this.globalOnChange(event);
        }
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onClose callback, if defined.
     */
    eventOnClose(selectedDates, dateStr, instance) {
        let event = {
            selectedDates: selectedDates,
            dateStr: dateStr,
            instance: instance
        };
        if (this.flatpickrOnClose) {
            this.flatpickrOnClose.emit(event);
        }
        if (this.globalOnClose) {
            this.globalOnClose(event);
        }
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onOpen callback, if defined.
     */
    eventOnOpen(selectedDates, dateStr, instance) {
        let event = {
            selectedDates: selectedDates,
            dateStr: dateStr,
            instance: instance
        };
        if (this.flatpickrOnOpen) {
            this.flatpickrOnOpen.emit(event);
        }
        if (this.globalOnOpen) {
            this.globalOnOpen(event);
        }
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onReady callback, if defined.
     */
    eventOnReady(selectedDates, dateStr, instance) {
        let event = {
            selectedDates: selectedDates,
            dateStr: dateStr,
            instance: instance
        };
        if (this.flatpickrOnReady) {
            this.flatpickrOnReady.emit(event);
        }
        if (this.globalOnReady) {
            this.globalOnReady(event);
        }
    }
    /**
     * Return the configuration value for option {option}, or {defaultValue} if it
     * doesn't exist.
     */
    getOption(option, defaultValue) {
        let localName = 'flatpickr' + option.substring(0, 1).toUpperCase()
            + option.substring(1);
        if (typeof this[localName] !== 'undefined') {
            return this[localName];
        }
        else if (typeof this.flatpickrOptions[option] !== 'undefined') {
            return this.flatpickrOptions[option];
        }
        else {
            return defaultValue;
        }
    }
};
Ng2FlatpickrDirective.ctorParameters = () => [
    { type: ControlContainer },
    { type: NgControl },
    { type: ElementRef },
    { type: Renderer2 }
];
__decorate([
    Input('flatpickr')
], Ng2FlatpickrDirective.prototype, "flatpickrOptions", void 0);
__decorate([
    Input('placeholder')
], Ng2FlatpickrDirective.prototype, "placeholder", void 0);
__decorate([
    Input('altFormat')
], Ng2FlatpickrDirective.prototype, "flatpickrAltFormat", void 0);
__decorate([
    Input('altInput')
], Ng2FlatpickrDirective.prototype, "flatpickrAltInput", void 0);
__decorate([
    Input('altInputClass')
], Ng2FlatpickrDirective.prototype, "flatpickrAltInputClass", void 0);
__decorate([
    Input('allowInput')
], Ng2FlatpickrDirective.prototype, "flatpickrAllowInput", void 0);
__decorate([
    Input('appendTo')
], Ng2FlatpickrDirective.prototype, "flatpickrAppendTo", void 0);
__decorate([
    Input('clickOpens')
], Ng2FlatpickrDirective.prototype, "flatpickrClickOpens", void 0);
__decorate([
    Input('dateFormat')
], Ng2FlatpickrDirective.prototype, "flatpickrDateFormat", void 0);
__decorate([
    Input('defaultDate')
], Ng2FlatpickrDirective.prototype, "flatpickrDefaultDate", void 0);
__decorate([
    Input('disable')
], Ng2FlatpickrDirective.prototype, "flatpickrDisable", void 0);
__decorate([
    Input('disableMobile')
], Ng2FlatpickrDirective.prototype, "flatpickrDisableMobile", void 0);
__decorate([
    Input('enable')
], Ng2FlatpickrDirective.prototype, "flatpickrEnable", void 0);
__decorate([
    Input('enableTime')
], Ng2FlatpickrDirective.prototype, "flatpickrEnableTime", void 0);
__decorate([
    Input('enableSeconds')
], Ng2FlatpickrDirective.prototype, "flatpickrEnableSeconds", void 0);
__decorate([
    Input('hourIncrement')
], Ng2FlatpickrDirective.prototype, "flatpickrHourIncrement", void 0);
__decorate([
    Input('inline')
], Ng2FlatpickrDirective.prototype, "flatpickrInline", void 0);
__decorate([
    Input('locale')
], Ng2FlatpickrDirective.prototype, "flatpickrLocale", void 0);
__decorate([
    Input('maxDate')
], Ng2FlatpickrDirective.prototype, "flatpickrMaxDate", void 0);
__decorate([
    Input('minDate')
], Ng2FlatpickrDirective.prototype, "flatpickrMinDate", void 0);
__decorate([
    Input('minuteIncrement')
], Ng2FlatpickrDirective.prototype, "flatpickrMinuteIncrement", void 0);
__decorate([
    Input('mode')
], Ng2FlatpickrDirective.prototype, "flatpickrMode", void 0);
__decorate([
    Input('nextArrow')
], Ng2FlatpickrDirective.prototype, "flatpickrNextArrow", void 0);
__decorate([
    Input('noCalendar')
], Ng2FlatpickrDirective.prototype, "flatpickrNoCalendar", void 0);
__decorate([
    Input('parseDate')
], Ng2FlatpickrDirective.prototype, "flatpickrParseDate", void 0);
__decorate([
    Input('prevArrow')
], Ng2FlatpickrDirective.prototype, "flatpickrPrevArrow", void 0);
__decorate([
    Input('shorthandCurrentMonth')
], Ng2FlatpickrDirective.prototype, "flatpickrShorthandCurrentMonth", void 0);
__decorate([
    Input('static')
], Ng2FlatpickrDirective.prototype, "flatpickrStatic", void 0);
__decorate([
    Input('time_24hr')
], Ng2FlatpickrDirective.prototype, "flatpickrTime_24hr", void 0);
__decorate([
    Input('utc')
], Ng2FlatpickrDirective.prototype, "flatpickrUtc", void 0);
__decorate([
    Input('weekNumbers')
], Ng2FlatpickrDirective.prototype, "flatpickrWeekNumbers", void 0);
__decorate([
    Input('wrap')
], Ng2FlatpickrDirective.prototype, "flatpickrWrap", void 0);
__decorate([
    Output('onChange')
], Ng2FlatpickrDirective.prototype, "flatpickrOnChange", void 0);
__decorate([
    Output('onClose')
], Ng2FlatpickrDirective.prototype, "flatpickrOnClose", void 0);
__decorate([
    Output('onOpen')
], Ng2FlatpickrDirective.prototype, "flatpickrOnOpen", void 0);
__decorate([
    Output('onReady')
], Ng2FlatpickrDirective.prototype, "flatpickrOnReady", void 0);
__decorate([
    HostListener('dblclick')
], Ng2FlatpickrDirective.prototype, "onClick", null);
Ng2FlatpickrDirective = __decorate([
    Directive({ selector: '[flatpickr]', exportAs: 'ng2-flatpickr' })
], Ng2FlatpickrDirective);
export { Ng2FlatpickrDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZmxhdHBpY2tyLXdyYXAvIiwic291cmNlcyI6WyJzcmMvbmcyLWZsYXRwaWNrci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTixhQUFhLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFDdkUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQzlELE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFPMUUsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUEyUmpDLFlBQ1csTUFBd0IsRUFDeEIsU0FBb0IsRUFDcEIsT0FBbUIsRUFDbkIsUUFBbUI7UUFIbkIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFqRDlCOzs7O1dBSUc7UUFDd0Isc0JBQWlCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEc7Ozs7V0FJRztRQUN1QixxQkFBZ0IsR0FBaUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5Rjs7OztXQUlHO1FBQ3NCLG9CQUFlLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFNUY7Ozs7V0FJRztRQUN1QixxQkFBZ0IsR0FBaUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQXdCMUYsQ0FBQztJQXRCTCw2REFBNkQ7SUFFdEQsT0FBTztRQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQW9CRCxJQUFJLE9BQU87UUFDVixPQUFPLElBQUks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QyxTQUFTLENBQUM7K0RBQXdDO0FBTy9CO0lBQXpCLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQzt1RUFBeUM7QUFPbkQ7SUFBZCxLQUFLLENBQUMsTUFBTSxDQUFDOzREQUE4QjtBQU94QjtJQUFuQixLQUFLLENBQUMsV0FBVyxDQUFDO2lFQUFtQztBQVFqQztJQUFwQixLQUFLLENBQUMsWUFBWSxDQUFDO2tFQUFxQztBQU9yQztJQUFuQixLQUFLLENBQUMsV0FBVyxDQUFDO2lFQUFxQztBQU9wQztJQUFuQixLQUFLLENBQUMsV0FBVyxDQUFDO2lFQUFtQztBQU90QjtJQUEvQixLQUFLLENBQUMsdUJBQXVCLENBQUM7NkVBQWdEO0FBUTlEO0lBQWhCLEtBQUssQ0FBQyxRQUFRLENBQUM7OERBQWlDO0FBTzdCO0lBQW5CLEtBQUssQ0FBQyxXQUFXLENBQUM7aUVBQW9DO0FBRXpDO0lBQWIsS0FBSyxDQUFDLEtBQUssQ0FBQzsyREFBOEI7QUFPckI7SUFBckIsS0FBSyxDQUFDLGFBQWEsQ0FBQzttRUFBc0M7QUFPNUM7SUFBZCxLQUFLLENBQUMsTUFBTSxDQUFDOzREQUErQjtBQU96QjtJQUFuQixNQUFNLENBQUMsVUFBVSxDQUFDO2dFQUE2RTtBQU83RTtJQUFsQixNQUFNLENBQUMsU0FBUyxDQUFDOytEQUE0RTtBQU81RTtJQUFqQixNQUFNLENBQUMsUUFBUSxDQUFDOzhEQUEyRTtBQU96RTtJQUFsQixNQUFNLENBQUMsU0FBUyxDQUFDOytEQUE0RTtBQUk5RjtJQURDLFlBQVksQ0FBQyxVQUFVLENBQUM7b0RBR3hCO0FBOVFXLHFCQUFxQjtJQURqQyxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsQ0FBQztHQUNyRCxxQkFBcUIsQ0E2ZWpDO1NBN2VZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LFxuXHRPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBSZW5kZXJlcjIsIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xDb250YWluZXIsIEZvcm1Db250cm9sLCBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZsYXRwaWNrckV2ZW50IH0gZnJvbSAnLi9mbGF0cGlja3ItZXZlbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZsYXRwaWNrckluc3RhbmNlIH0gZnJvbSAnLi9mbGF0cGlja3ItaW5zdGFuY2UnO1xuaW1wb3J0IHsgRmxhdHBpY2tyT3B0aW9ucyB9IGZyb20gJy4vZmxhdHBpY2tyLW9wdGlvbnMuaW50ZXJmYWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2ZsYXRwaWNrcl0nLCBleHBvcnRBczogJ25nMi1mbGF0cGlja3InIH0pXG5leHBvcnQgY2xhc3MgTmcyRmxhdHBpY2tyRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cdC8qKlxuXHQgKiBUaGUgZmxhdHBpY2tyIGNvbmZpZ3VyYXRpb24gYXMgYSBzaW5nbGUgb2JqZWN0IG9mIHZhbHVlcy5cblx0ICpcblx0ICogU2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9vcHRpb25zLyBmb3IgZnVsbCBsaXN0LlxuXHQgKi9cblx0QElucHV0KCdmbGF0cGlja3InKSBwdWJsaWMgZmxhdHBpY2tyT3B0aW9uczogRmxhdHBpY2tyT3B0aW9ucztcblxuXHQvKipcblx0ICogUGxhY2Vob2xkZXIgZm9yIGlucHV0IGZpZWxkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QElucHV0KCdwbGFjZWhvbGRlcicpIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBFeGFjdGx5IHRoZSBzYW1lIGFzIGRhdGUgZm9ybWF0LCBidXQgZm9yIHRoZSBhbHRJbnB1dCBmaWVsZC5cblx0ICpcblx0ICogRGVmYXVsdDogIFwiRiBqLCBZXCJcblx0ICovXG5cdEBJbnB1dCgnYWx0Rm9ybWF0JykgcHVibGljIGZsYXRwaWNrckFsdEZvcm1hdDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBTaG93IHRoZSB1c2VyIGEgcmVhZGFibGUgZGF0ZSAoYXMgcGVyIGFsdEZvcm1hdCksIGJ1dCByZXR1cm4gc29tZXRoaW5nXG5cdCAqIHRvdGFsbHkgZGlmZmVyZW50IHRvIHRoZSBzZXJ2ZXIuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCdhbHRJbnB1dCcpIHB1YmxpYyBmbGF0cGlja3JBbHRJbnB1dDogYm9vbGVhbjtcblxuXHQvKipcblx0ICogVGhpcyBjbGFzcyB3aWxsIGJlIGFkZGVkIHRvIHRoZSBpbnB1dCBlbGVtZW50IGNyZWF0ZWQgYnkgdGhlIGFsdElucHV0XG5cdCAqIG9wdGlvbi5cblx0ICpcblx0ICogRGVmYXVsdDogIFwiXCJcblx0ICovXG5cdEBJbnB1dCgnYWx0SW5wdXRDbGFzcycpIHB1YmxpYyBmbGF0cGlja3JBbHRJbnB1dENsYXNzOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIEFsbG93cyB0aGUgdXNlciB0byBlbnRlciBhIGRhdGUgZGlyZWN0bHkgaW5wdXQgdGhlIGlucHV0IGZpZWxkLiBCeVxuXHQgKiBkZWZhdWx0LCBkaXJlY3QgZW50cnkgaXMgZGlzYWJsZWQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCdhbGxvd0lucHV0JykgcHVibGljIGZsYXRwaWNrckFsbG93SW5wdXQ6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEluc3RlYWQgb2YgYm9keSwgYXBwZW5kcyB0aGUgY2FsZW5kYXIgdG8gdGhlIHNwZWNpZmllZCBub2RlIGluc3RlYWQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoJ2FwcGVuZFRvJykgcHVibGljIGZsYXRwaWNrckFwcGVuZFRvOiBhbnk7IC8vIEhUTUxFbGVtZW50XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgY2xpY2tpbmcgb24gdGhlIGlucHV0IHNob3VsZCBvcGVuIHRoZSBwaWNrZXIuXG5cdCAqIFlvdSBjb3VsZCBkaXNhYmxlIHRoaXMgaWYgeW91IHdpc2ggdG8gb3BlbiB0aGUgY2FsZW5kYXIgbWFudWFsbHlcblx0ICogd2l0aC5vcGVuKCkuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICB0cnVlXG5cdCAqL1xuXHRASW5wdXQoJ2NsaWNrT3BlbnMnKSBwdWJsaWMgZmxhdHBpY2tyQ2xpY2tPcGVuczogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQSBzdHJpbmcgb2YgY2hhcmFjdGVycyB3aGljaCBhcmUgdXNlZCB0byBkZWZpbmUgaG93IHRoZSBkYXRlIHdpbGwgYmVcblx0ICogZGlzcGxheWVkIGluIHRoZSBpbnB1dCBib3guXG5cdCAqIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvZm9ybWF0dGluZy8gZm9yIHN1cHBvcnRlZCB0b2tlbnMuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcIlktbS1kXCJcblx0ICovXG5cdEBJbnB1dCgnZGF0ZUZvcm1hdCcpIHB1YmxpYyBmbGF0cGlja3JEYXRlRm9ybWF0OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFNldHMgdGhlIGluaXRpYWwgc2VsZWN0ZWQgZGF0ZShzKS5cblx0ICpcblx0ICogSWYgeW91J3JlIHVzaW5nIHttb2RlOiBcIm11bHRpcGxlXCJ9IG9yIGEgcmFuZ2UgY2FsZW5kYXIgc3VwcGx5IGFuIEFycmF5IG9mXG5cdCAqIERhdGUgb2JqZWN0cyBvciBhbiBBcnJheSBvZiBkYXRlIHN0cmluZ3Mgd2hpY2ggZm9sbG93IHlvdXIgZGF0ZUZvcm1hdC5cblx0ICpcblx0ICogT3RoZXJ3aXNlLCB5b3UgY2FuIHN1cHBseSBhIHNpbmdsZSBEYXRlIG9iamVjdCBvciBhIGRhdGUgc3RyaW5nLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QElucHV0KCdkZWZhdWx0RGF0ZScpIHB1YmxpYyBmbGF0cGlja3JEZWZhdWx0RGF0ZTogc3RyaW5nIHwgRGF0ZTtcblxuXHQvKipcblx0ICogRGlzYWJsZSBhbiBhcnJheSBvZiBzcGVjaWZpYyBkYXRlcywgZGF0ZSByYW5nZXMsIG9yIGZ1bmN0aW9ucyB0byBkaXNhYmxlXG5cdCAqIGRhdGVzLiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2V4YW1wbGVzLyNkaXNhYmxpbmctc3BlY2lmaWMtZGF0ZXNcblx0ICpcblx0ICogRGVmYXVsdDogIFtdXG5cdCAqL1xuXHRASW5wdXQoJ2Rpc2FibGUnKSBwdWJsaWMgZmxhdHBpY2tyRGlzYWJsZTogc3RyaW5nW10gfCBEYXRlW107XG5cblx0LyoqXG5cdCAqIFNldCBkaXNhYmxlTW9iaWxlIHRvIHRydWUgdG8gYWx3YXlzIHVzZSB0aGUgbm9uLW5hdGl2ZSBwaWNrZXIuIEJ5XG5cdCAqIGRlZmF1bHQsIEZsYXRwaWNrciB1dGlsaXplcyBuYXRpdmUgZGF0ZXRpbWUgd2lkZ2V0cyB1bmxlc3MgY2VydGFpblxuXHQgKiBvcHRpb25zIChlLmcuIGRpc2FibGUpIGFyZSB1c2VkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCgnZGlzYWJsZU1vYmlsZScpIHB1YmxpYyBmbGF0cGlja3JEaXNhYmxlTW9iaWxlOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBFbmFibGUgYW4gYXJyYXkgb2Ygc3BlY2lmaWMgZGF0ZXMsIGRhdGUgcmFuZ2VzLCBvciBmdW5jdGlvbnMgdG8gZW5hYmxlXG5cdCAqIGRhdGVzLiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2V4YW1wbGVzLyNkaXNhYmxpbmctYWxsLWRhdGVzLWV4Y2VwdC1zZWxlY3QtZmV3XG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBbXVxuXHQgKi9cblx0QElucHV0KCdlbmFibGUnKSBwdWJsaWMgZmxhdHBpY2tyRW5hYmxlOiBzdHJpbmdbXSB8IERhdGVbXTtcblxuXHQvKipcblx0ICogRW5hYmxlcyB0aW1lIHBpY2tlci5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoJ2VuYWJsZVRpbWUnKSBwdWJsaWMgZmxhdHBpY2tyRW5hYmxlVGltZTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRW5hYmxlcyBzZWNvbmRzIGluIHRoZSB0aW1lIHBpY2tlci5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoJ2VuYWJsZVNlY29uZHMnKSBwdWJsaWMgZmxhdHBpY2tyRW5hYmxlU2Vjb25kczogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQWRqdXN0cyB0aGUgc3RlcCBmb3IgdGhlIGhvdXIgaW5wdXQgKGluY2wuIHNjcm9sbGluZykuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICAxXG5cdCAqL1xuXHRASW5wdXQoJ2hvdXJJbmNyZW1lbnQnKSBwdWJsaWMgZmxhdHBpY2tySG91ckluY3JlbWVudDogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBEaXNwbGF5cyB0aGUgY2FsZW5kYXIgaW5saW5lLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCgnaW5saW5lJykgcHVibGljIGZsYXRwaWNrcklubGluZTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogVXNlIGEgc3BlY2lmaWMgbG9jYWxlIGZvciB0aGUgZmxhdHBpY2tyIGluc3RhbmNlLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QElucHV0KCdsb2NhbGUnKSBwdWJsaWMgZmxhdHBpY2tyTG9jYWxlOiBPYmplY3Q7XG5cblx0LyoqXG5cdCAqIFRoZSBtYXhpbXVtIGRhdGUgdGhhdCBhIHVzZXIgY2FuIHBpY2sgdG8gKGluY2x1c2l2ZSkuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoJ21heERhdGUnKSBwdWJsaWMgZmxhdHBpY2tyTWF4RGF0ZTogc3RyaW5nIHwgRGF0ZTtcblxuXHQvKipcblx0ICogVGhlIG1pbmltdW0gZGF0ZSB0aGF0IGEgdXNlciBjYW4gc3RhcnQgcGlja2luZyBmcm9tIChpbmNsdXNpdmUpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QElucHV0KCdtaW5EYXRlJykgcHVibGljIGZsYXRwaWNrck1pbkRhdGU6IHN0cmluZyB8IERhdGU7XG5cblx0LyoqXG5cdCAqIEFkanVzdHMgdGhlIHN0ZXAgZm9yIHRoZSBtaW51dGUgaW5wdXQgKGluY2wuIHNjcm9sbGluZykuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICA1XG5cdCAqL1xuXHRASW5wdXQoJ21pbnV0ZUluY3JlbWVudCcpIHB1YmxpYyBmbGF0cGlja3JNaW51dGVJbmNyZW1lbnQ6IG51bWJlcjtcblxuXHQvKipcblx0ICogXCJzaW5nbGVcIiwgXCJtdWx0aXBsZVwiLCBvciBcInJhbmdlXCJcblx0ICpcblx0ICogRGVmYXVsdDogIFwic2luZ2xlXCJcblx0ICovXG5cdEBJbnB1dCgnbW9kZScpIHB1YmxpYyBmbGF0cGlja3JNb2RlOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIEhUTUwgZm9yIHRoZSBhcnJvdyBpY29uLCB1c2VkIHRvIHN3aXRjaCBtb250aHMuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcIj5cIlxuXHQgKi9cblx0QElucHV0KCduZXh0QXJyb3cnKSBwdWJsaWMgZmxhdHBpY2tyTmV4dEFycm93OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIEhpZGVzIHRoZSBkYXkgc2VsZWN0aW9uIGluIGNhbGVuZGFyLiBVc2UgaXQgYWxvbmcgd2l0aCBlbmFibGVUaW1lIHRvXG5cdCAqIGNyZWF0ZSBhIHRpbWUgcGlja2VyLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCgnbm9DYWxlbmRhcicpIHB1YmxpYyBmbGF0cGlja3JOb0NhbGVuZGFyOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBGdW5jdGlvbiB0aGF0IGV4cGVjdHMgYSBkYXRlIHN0cmluZyBhbmQgbXVzdCByZXR1cm4gYSBEYXRlIG9iamVjdC5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoJ3BhcnNlRGF0ZScpIHB1YmxpYyBmbGF0cGlja3JQYXJzZURhdGU6IEZ1bmN0aW9uO1xuXG5cdC8qKlxuXHQgKiBIVE1MIGZvciB0aGUgbGVmdCBhcnJvdyBpY29uLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgXCI8XCJcblx0ICovXG5cdEBJbnB1dCgncHJldkFycm93JykgcHVibGljIGZsYXRwaWNrclByZXZBcnJvdzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBTaG93IHRoZSBtb250aCB1c2luZyB0aGUgc2hvcnRoYW5kIHZlcnNpb24gKGllLCBTZXAgaW5zdGVhZCBvZiBTZXB0ZW1iZXIpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCgnc2hvcnRoYW5kQ3VycmVudE1vbnRoJykgcHVibGljIGZsYXRwaWNrclNob3J0aGFuZEN1cnJlbnRNb250aDogYm9vbGVhbjtcblxuXHQvKipcblx0ICogUG9zaXRpb24gdGhlIGNhbGVuZGFyIGluc2lkZSB0aGUgd3JhcHBlciBhbmQgbmV4dCB0byB0aGUgaW5wdXQgZWxlbWVudFxuXHQgKiAoTGVhdmUgZmFsc2UgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91J3JlIGRvaW5nKS5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoJ3N0YXRpYycpIHB1YmxpYyBmbGF0cGlja3JTdGF0aWM6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIERpc3BsYXlzIHRpbWUgcGlja2VyIGluIDI0IGhvdXIgbW9kZSB3aXRob3V0IEFNL1BNIHNlbGVjdGlvbiB3aGVuIGVuYWJsZWQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCd0aW1lXzI0aHInKSBwdWJsaWMgZmxhdHBpY2tyVGltZV8yNGhyOiBib29sZWFuO1xuXG5cdEBJbnB1dCgndXRjJykgcHVibGljIGZsYXRwaWNrclV0YzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRW5hYmxlcyBkaXNwbGF5IG9mIHdlZWsgbnVtYmVycyBpbiBjYWxlbmRhci5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoJ3dlZWtOdW1iZXJzJykgcHVibGljIGZsYXRwaWNrcldlZWtOdW1iZXJzOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBDdXN0b20gZWxlbWVudHMgYW5kIGlucHV0IGdyb3Vwcy5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoJ3dyYXAnKSBwdWJsaWMgZmxhdHBpY2tyV3JhcDogYm9vbGVhbjtcblxuXHQvKipcblx0ICogb25DaGFuZ2UgZ2V0cyB0cmlnZ2VyZWQgd2hlbiB0aGUgdXNlciBzZWxlY3RzIGEgZGF0ZSwgb3IgY2hhbmdlcyB0aGUgdGltZSBvbiBhIHNlbGVjdGVkIGRhdGUuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRAT3V0cHV0KCdvbkNoYW5nZScpIHB1YmxpYyBmbGF0cGlja3JPbkNoYW5nZTogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHQvKipcblx0ICogb25DbG9zZSBnZXRzIHRyaWdnZXJlZCB3aGVuIHRoZSBjYWxlbmRhciBpcyBjbG9zZWQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRAT3V0cHV0KCdvbkNsb3NlJykgcHVibGljIGZsYXRwaWNrck9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0LyoqXG5cdCAqIG9uT3BlbiBnZXRzIHRyaWdnZXJlZCB3aGVuIHRoZSBjYWxlbmRhciBpcyBvcGVuZWQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRAT3V0cHV0KCdvbk9wZW4nKSBwdWJsaWMgZmxhdHBpY2tyT25PcGVuOiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdC8qKlxuXHQgKiBvblJlYWR5IGdldHMgdHJpZ2dlcmVkIG9uY2UgdGhlIGNhbGVuZGFyIGlzIGluIGEgcmVhZHkgc3RhdGUuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRAT3V0cHV0KCdvblJlYWR5JykgcHVibGljIGZsYXRwaWNrck9uUmVhZHk6IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0LyoqIEFsbG93IGRvdWJsZS1jbGlja2luZyBvbiB0aGUgY29udHJvbCB0byBvcGVuL2Nsb3NlIGl0LiAqL1xuXHRASG9zdExpc3RlbmVyKCdkYmxjbGljaycpXG5cdHB1YmxpYyBvbkNsaWNrKCkge1xuXHRcdHRoaXMuZmxhdHBpY2tyLnRvZ2dsZSgpO1xuXHR9XG5cblx0cHJvdGVjdGVkIGdsb2JhbE9uQ2hhbmdlOiBGdW5jdGlvbjtcblx0cHJvdGVjdGVkIGdsb2JhbE9uQ2xvc2U6IEZ1bmN0aW9uO1xuXHRwcm90ZWN0ZWQgZ2xvYmFsT25PcGVuOiBGdW5jdGlvbjtcblx0cHJvdGVjdGVkIGdsb2JhbE9uUmVhZHk6IEZ1bmN0aW9uO1xuXG5cdHByb3RlY3RlZCBmbGF0cGlja3I6IEZsYXRwaWNrckluc3RhbmNlO1xuXHRwcm90ZWN0ZWQgZm9ybUNvbnRyb2xMaXN0ZW5lcjogU3Vic2NyaXB0aW9uO1xuXG5cdC8qKiBBbGxvdyBhY2Nlc3MgcHJvcGVydGllcyB1c2luZyBpbmRleCBub3RhdGlvbiAqL1xuXHRba2V5OiBzdHJpbmddOiBhbnk7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHJvdGVjdGVkIHBhcmVudDogQ29udHJvbENvbnRhaW5lcixcblx0XHRwcm90ZWN0ZWQgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG5cdFx0cHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG5cdFx0cHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjJcblx0KSB7IH1cblxuXHRnZXQgY29udHJvbCgpOiBGb3JtQ29udHJvbCB7XG5cdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZm9ybURpcmVjdGl2ZS5nZXRDb250cm9sKHRoaXMubmdDb250cm9sKSA6IG51bGw7XG5cdH1cblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0LyoqIFdlIGNhbm5vdCBpbml0aWFsaXplIHRoZSBmbGF0cGlja3IgaW5zdGFuY2UgaW4gbmdPbkluaXQoKTsgaXQgd2lsbFxuXHRcdFx0cmFuZG9taXplIHRoZSBkYXRlIHdoZW4gdGhlIGZvcm0gY29udHJvbCBpbml0aWFsaXplcy4gKi9cblx0XHRsZXQgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG5cdFx0aWYgKHR5cGVvZiBuYXRpdmVFbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCBuYXRpdmVFbGVtZW50ID09PSBudWxsKSB7XG5cdFx0XHR0aHJvdyAnRXJyb3I6IGludmFsaWQgaW5wdXQgZWxlbWVudCBzcGVjaWZpZWQnO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmZsYXRwaWNrck9wdGlvbnMud3JhcCkge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdkYXRhLWlucHV0JywgJycpO1xuXHRcdFx0bmF0aXZlRWxlbWVudCA9IG5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZTtcblx0XHR9XG5cblx0XHR0aGlzLmZsYXRwaWNrciA9IDxGbGF0cGlja3JJbnN0YW5jZT5uYXRpdmVFbGVtZW50LmZsYXRwaWNrcih0aGlzLmZsYXRwaWNrck9wdGlvbnMpO1xuXHR9XG5cblx0bmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuXHRcdGlmICh0aGlzLmZsYXRwaWNrclxuXHRcdFx0JiYgdGhpcy5mbGF0cGlja3JBbHRJbnB1dFxuXHRcdFx0JiYgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgncGxhY2Vob2xkZXInKVxuXHRcdFx0JiYgY2hhbmdlc1sncGxhY2Vob2xkZXInXS5jdXJyZW50VmFsdWUpIHtcblx0XHRcdHRoaXMuZmxhdHBpY2tyLmFsdElucHV0LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBjaGFuZ2VzWydwbGFjZWhvbGRlciddLmN1cnJlbnRWYWx1ZSk7XG5cdFx0fVxuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0aWYgKHRoaXMuZmxhdHBpY2tyKSB7XG5cdFx0XHR0aGlzLmZsYXRwaWNrci5kZXN0cm95KCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuZm9ybUNvbnRyb2xMaXN0ZW5lcikge1xuXHRcdFx0dGhpcy5mb3JtQ29udHJvbExpc3RlbmVyLnVuc3Vic2NyaWJlKCk7XG5cdFx0XHR0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0dGhpcy5mbGF0cGlja3JPbkNoYW5nZSA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLmZsYXRwaWNrck9uQ2xvc2UgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5mbGF0cGlja3JPbk9wZW4gPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5mbGF0cGlja3JPblJlYWR5ID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5nbG9iYWxPbkNoYW5nZSA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vbkNoYW5nZTtcblx0XHR0aGlzLmdsb2JhbE9uQ2xvc2UgPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25DbG9zZTtcblx0XHR0aGlzLmdsb2JhbE9uT3BlbiA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vbk9wZW47XG5cdFx0dGhpcy5nbG9iYWxPblJlYWR5ID0gdGhpcy5mbGF0cGlja3JPcHRpb25zLm9uUmVhZHk7XG5cblx0XHR0aGlzLmZsYXRwaWNrck9wdGlvbnMgPSB7XG5cdFx0XHRhbHRGb3JtYXQ6IHRoaXMuZ2V0T3B0aW9uKCdhbHRGb3JtYXQnKSxcblx0XHRcdGFsdElucHV0OiB0aGlzLmdldE9wdGlvbignYWx0SW5wdXQnKSxcblx0XHRcdGFsdElucHV0Q2xhc3M6IHRoaXMuZ2V0T3B0aW9uKCdhbHRJbnB1dENsYXNzJyksXG5cdFx0XHRhbGxvd0lucHV0OiB0aGlzLmdldE9wdGlvbignYWxsb3dJbnB1dCcpLFxuXHRcdFx0YXBwZW5kVG86IHRoaXMuZ2V0T3B0aW9uKCdhcHBlbmRUbycpLFxuXHRcdFx0Y2xpY2tPcGVuczogdGhpcy5nZXRPcHRpb24oJ2NsaWNrT3BlbnMnLCB0cnVlKSxcblx0XHRcdGRhdGVGb3JtYXQ6IHRoaXMuZ2V0T3B0aW9uKCdkYXRlRm9ybWF0JyksXG5cdFx0XHRkZWZhdWx0RGF0ZTogdGhpcy5nZXRPcHRpb24oJ2RlZmF1bHREYXRlJyksXG5cdFx0XHRkaXNhYmxlOiB0aGlzLmdldE9wdGlvbignZGlzYWJsZScpLFxuXHRcdFx0ZGlzYWJsZU1vYmlsZTogdGhpcy5nZXRPcHRpb24oJ2Rpc2FibGVNb2JpbGUnKSxcblx0XHRcdGVuYWJsZTogdGhpcy5nZXRPcHRpb24oJ2VuYWJsZScpLFxuXHRcdFx0ZW5hYmxlVGltZTogdGhpcy5nZXRPcHRpb24oJ2VuYWJsZVRpbWUnKSxcblx0XHRcdGVuYWJsZVNlY29uZHM6IHRoaXMuZ2V0T3B0aW9uKCdlbmFibGVTZWNvbmRzJyksXG5cdFx0XHRob3VySW5jcmVtZW50OiB0aGlzLmdldE9wdGlvbignaG91ckluY3JlbWVudCcpLFxuXHRcdFx0aW5saW5lOiB0aGlzLmdldE9wdGlvbignaW5saW5lJyksXG5cdFx0XHRsb2NhbGU6IHRoaXMuZ2V0T3B0aW9uKCdsb2NhbGUnKSxcblx0XHRcdG1heERhdGU6IHRoaXMuZ2V0T3B0aW9uKCdtYXhEYXRlJyksXG5cdFx0XHRtaW5EYXRlOiB0aGlzLmdldE9wdGlvbignbWluRGF0ZScpLFxuXHRcdFx0bWludXRlSW5jcmVtZW50OiB0aGlzLmdldE9wdGlvbignbWludXRlSW5jcmVtZW50JyksXG5cdFx0XHRtb2RlOiB0aGlzLmdldE9wdGlvbignbW9kZScpLFxuXHRcdFx0bmV4dEFycm93OiB0aGlzLmdldE9wdGlvbignbmV4dEFycm93JyksXG5cdFx0XHRub0NhbGVuZGFyOiB0aGlzLmdldE9wdGlvbignbm9DYWxlbmRhcicpLFxuXHRcdFx0b25DaGFuZ2U6IHRoaXMuZXZlbnRPbkNoYW5nZS5iaW5kKHRoaXMpLFxuXHRcdFx0b25DbG9zZTogdGhpcy5ldmVudE9uQ2xvc2UuYmluZCh0aGlzKSxcblx0XHRcdG9uT3BlbjogdGhpcy5ldmVudE9uT3Blbi5iaW5kKHRoaXMpLFxuXHRcdFx0b25SZWFkeTogdGhpcy5ldmVudE9uUmVhZHkuYmluZCh0aGlzKSxcblx0XHRcdHBhcnNlRGF0ZTogdGhpcy5nZXRPcHRpb24oJ3BhcnNlRGF0ZScpLFxuXHRcdFx0cHJldkFycm93OiB0aGlzLmdldE9wdGlvbigncHJldkFycm93JyksXG5cdFx0XHRzaG9ydGhhbmRDdXJyZW50TW9udGg6IHRoaXMuZ2V0T3B0aW9uKCdzaG9ydGhhbmRDdXJyZW50TW9udGgnKSxcblx0XHRcdHN0YXRpYzogdGhpcy5nZXRPcHRpb24oJ3N0YXRpYycpLFxuXHRcdFx0dGltZV8yNGhyOiB0aGlzLmdldE9wdGlvbigndGltZV8yNGhyJyksXG5cdFx0XHR1dGM6IHRoaXMuZ2V0T3B0aW9uKCd1dGMnKSxcblx0XHRcdHdlZWtOdW1iZXJzOiB0aGlzLmdldE9wdGlvbignd2Vla051bWJlcnMnKSxcblx0XHRcdHdyYXA6IHRoaXMuZ2V0T3B0aW9uKCd3cmFwJywgdHJ1ZSksXG5cdFx0fTtcblxuXHRcdC8vIFJlbW92ZSB1bnNldCBwcm9wZXJ0aWVzXG5cdFx0T2JqZWN0LmtleXModGhpcy5mbGF0cGlja3JPcHRpb25zKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuXHRcdFx0KHRoaXMuZmxhdHBpY2tyT3B0aW9uc1trZXldID09PSB1bmRlZmluZWQpICYmXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLmZsYXRwaWNrck9wdGlvbnNba2V5XTtcblx0XHR9KTtcblxuXHRcdGlmICh0aGlzLmNvbnRyb2wpIHtcblx0XHRcdHRoaXMuZm9ybUNvbnRyb2xMaXN0ZW5lciA9IHRoaXMuY29udHJvbC52YWx1ZUNoYW5nZXNcblx0XHRcdFx0LnN1YnNjcmliZSgodmFsdWU6IGFueSkgPT4ge1xuXHRcdFx0XHRcdGlmICghKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkpIHtcblx0XHRcdFx0XHRcdC8vIFF1aWV0bHkgdXBkYXRlIHRoZSB2YWx1ZSBvZiB0aGUgZm9ybSBjb250cm9sIHRvIGJlIGFcblx0XHRcdFx0XHRcdC8vIERhdGUgb2JqZWN0LiBUaGlzIGF2b2lkcyBhbnkgZXh0ZXJuYWwgc3Vic2NyaWJlcnNcblx0XHRcdFx0XHRcdC8vIGZyb20gYmVpbmcgbm90aWZpZWQgYSBzZWNvbmQgdGltZSAob25jZSBmb3IgdGhlIHVzZXJcblx0XHRcdFx0XHRcdC8vIGluaXRpYXRlZCBldmVudCwgYW5kIG9uY2UgZm9yIG91ciBjb252ZXJzaW9uIHRvXG5cdFx0XHRcdFx0XHQvLyBEYXRlKCkpLlxuXHRcdFx0XHRcdFx0dGhpcy5jb250cm9sLnNldFZhbHVlKG5ldyBEYXRlKCcnICsgdmFsdWUpLCB7XG5cdFx0XHRcdFx0XHRcdG9ubHlTZWxmOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRlbWl0RXZlbnQ6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRlbWl0Vmlld1RvTW9kZWxDaGFuZ2U6IGZhbHNlXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGaXJlIG9mZiB0aGUgZXZlbnQgZW1pdHRlciBmb3IgdGhlIGRpcmVjdGl2ZSBlbGVtZW50LCBhbmQgYWxzbyBmb3IgdGhlXG5cdCAqIGdsb2JhbCBvbkNoYW5nZSBjYWxsYmFjaywgaWYgZGVmaW5lZC5cblx0ICovXG5cdHByb3RlY3RlZCBldmVudE9uQ2hhbmdlKHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0KTogdm9pZCB7XG5cdFx0bGV0IGV2ZW50OiBGbGF0cGlja3JFdmVudCA9IHtcblx0XHRcdHNlbGVjdGVkRGF0ZXM6IHNlbGVjdGVkRGF0ZXMsXG5cdFx0XHRkYXRlU3RyOiBkYXRlU3RyLFxuXHRcdFx0aW5zdGFuY2U6IGluc3RhbmNlXG5cdFx0fTtcblx0XHRpZiAodGhpcy5mbGF0cGlja3JPbkNoYW5nZSkge1xuXHRcdFx0dGhpcy5mbGF0cGlja3JPbkNoYW5nZS5lbWl0KGV2ZW50KTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2xvYmFsT25DaGFuZ2UpIHtcblx0XHRcdHRoaXMuZ2xvYmFsT25DaGFuZ2UoZXZlbnQpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGaXJlIG9mZiB0aGUgZXZlbnQgZW1pdHRlciBmb3IgdGhlIGRpcmVjdGl2ZSBlbGVtZW50LCBhbmQgYWxzbyBmb3IgdGhlXG5cdCAqIGdsb2JhbCBvbkNsb3NlIGNhbGxiYWNrLCBpZiBkZWZpbmVkLlxuXHQgKi9cblx0cHJvdGVjdGVkIGV2ZW50T25DbG9zZShzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCk6IHZvaWQge1xuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XG5cdFx0XHRzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxuXHRcdFx0ZGF0ZVN0cjogZGF0ZVN0cixcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxuXHRcdH07XG5cdFx0aWYgKHRoaXMuZmxhdHBpY2tyT25DbG9zZSkge1xuXHRcdFx0dGhpcy5mbGF0cGlja3JPbkNsb3NlLmVtaXQoZXZlbnQpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5nbG9iYWxPbkNsb3NlKSB7XG5cdFx0XHR0aGlzLmdsb2JhbE9uQ2xvc2UoZXZlbnQpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGaXJlIG9mZiB0aGUgZXZlbnQgZW1pdHRlciBmb3IgdGhlIGRpcmVjdGl2ZSBlbGVtZW50LCBhbmQgYWxzbyBmb3IgdGhlXG5cdCAqIGdsb2JhbCBvbk9wZW4gY2FsbGJhY2ssIGlmIGRlZmluZWQuXG5cdCAqL1xuXHRwcm90ZWN0ZWQgZXZlbnRPbk9wZW4oc2VsZWN0ZWREYXRlczogRGF0ZVtdLCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBPYmplY3QpOiB2b2lkIHtcblx0XHRsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xuXHRcdFx0c2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcblx0XHRcdGRhdGVTdHI6IGRhdGVTdHIsXG5cdFx0XHRpbnN0YW5jZTogaW5zdGFuY2Vcblx0XHR9O1xuXHRcdGlmICh0aGlzLmZsYXRwaWNrck9uT3Blbikge1xuXHRcdFx0dGhpcy5mbGF0cGlja3JPbk9wZW4uZW1pdChldmVudCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdsb2JhbE9uT3Blbikge1xuXHRcdFx0dGhpcy5nbG9iYWxPbk9wZW4oZXZlbnQpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGaXJlIG9mZiB0aGUgZXZlbnQgZW1pdHRlciBmb3IgdGhlIGRpcmVjdGl2ZSBlbGVtZW50LCBhbmQgYWxzbyBmb3IgdGhlXG5cdCAqIGdsb2JhbCBvblJlYWR5IGNhbGxiYWNrLCBpZiBkZWZpbmVkLlxuXHQgKi9cblx0cHJvdGVjdGVkIGV2ZW50T25SZWFkeShzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCk6IHZvaWQge1xuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XG5cdFx0XHRzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxuXHRcdFx0ZGF0ZVN0cjogZGF0ZVN0cixcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxuXHRcdH07XG5cdFx0aWYgKHRoaXMuZmxhdHBpY2tyT25SZWFkeSkge1xuXHRcdFx0dGhpcy5mbGF0cGlja3JPblJlYWR5LmVtaXQoZXZlbnQpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5nbG9iYWxPblJlYWR5KSB7XG5cdFx0XHR0aGlzLmdsb2JhbE9uUmVhZHkoZXZlbnQpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gdGhlIGNvbmZpZ3VyYXRpb24gdmFsdWUgZm9yIG9wdGlvbiB7b3B0aW9ufSwgb3Ige2RlZmF1bHRWYWx1ZX0gaWYgaXRcblx0ICogZG9lc24ndCBleGlzdC5cblx0ICovXG5cdHByb3RlY3RlZCBnZXRPcHRpb24ob3B0aW9uOiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IGFueSk6IGFueSB7XG5cdFx0bGV0IGxvY2FsTmFtZSA9ICdmbGF0cGlja3InICsgb3B0aW9uLnN1YnN0cmluZygwLCAxKS50b1VwcGVyQ2FzZSgpXG5cdFx0XHQrIG9wdGlvbi5zdWJzdHJpbmcoMSk7XG5cblx0XHRpZiAodHlwZW9mIHRoaXNbbG9jYWxOYW1lXSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHJldHVybiB0aGlzW2xvY2FsTmFtZV07XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgdGhpcy5mbGF0cGlja3JPcHRpb25zW29wdGlvbl0gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5mbGF0cGlja3JPcHRpb25zW29wdGlvbl07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdFx0fVxuXHR9XG59XG4iXX0=