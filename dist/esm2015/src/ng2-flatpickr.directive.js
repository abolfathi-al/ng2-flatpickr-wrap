import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ControlContainer, NgControl } from '@angular/forms';
export class Ng2FlatpickrDirective {
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
}
Ng2FlatpickrDirective.decorators = [
    { type: Directive, args: [{ selector: '[flatpickr]', exportAs: 'ng2-flatpickr' },] }
];
Ng2FlatpickrDirective.ctorParameters = () => [
    { type: ControlContainer },
    { type: NgControl },
    { type: ElementRef },
    { type: Renderer2 }
];
Ng2FlatpickrDirective.propDecorators = {
    flatpickrOptions: [{ type: Input, args: ['flatpickr',] }],
    placeholder: [{ type: Input, args: ['placeholder',] }],
    flatpickrAltFormat: [{ type: Input, args: ['altFormat',] }],
    flatpickrAltInput: [{ type: Input, args: ['altInput',] }],
    flatpickrAltInputClass: [{ type: Input, args: ['altInputClass',] }],
    flatpickrAllowInput: [{ type: Input, args: ['allowInput',] }],
    flatpickrAppendTo: [{ type: Input, args: ['appendTo',] }],
    flatpickrClickOpens: [{ type: Input, args: ['clickOpens',] }],
    flatpickrDateFormat: [{ type: Input, args: ['dateFormat',] }],
    flatpickrDefaultDate: [{ type: Input, args: ['defaultDate',] }],
    flatpickrDisable: [{ type: Input, args: ['disable',] }],
    flatpickrDisableMobile: [{ type: Input, args: ['disableMobile',] }],
    flatpickrEnable: [{ type: Input, args: ['enable',] }],
    flatpickrEnableTime: [{ type: Input, args: ['enableTime',] }],
    flatpickrEnableSeconds: [{ type: Input, args: ['enableSeconds',] }],
    flatpickrHourIncrement: [{ type: Input, args: ['hourIncrement',] }],
    flatpickrInline: [{ type: Input, args: ['inline',] }],
    flatpickrLocale: [{ type: Input, args: ['locale',] }],
    flatpickrMaxDate: [{ type: Input, args: ['maxDate',] }],
    flatpickrMinDate: [{ type: Input, args: ['minDate',] }],
    flatpickrMinuteIncrement: [{ type: Input, args: ['minuteIncrement',] }],
    flatpickrMode: [{ type: Input, args: ['mode',] }],
    flatpickrNextArrow: [{ type: Input, args: ['nextArrow',] }],
    flatpickrNoCalendar: [{ type: Input, args: ['noCalendar',] }],
    flatpickrParseDate: [{ type: Input, args: ['parseDate',] }],
    flatpickrPrevArrow: [{ type: Input, args: ['prevArrow',] }],
    flatpickrShorthandCurrentMonth: [{ type: Input, args: ['shorthandCurrentMonth',] }],
    flatpickrStatic: [{ type: Input, args: ['static',] }],
    flatpickrTime_24hr: [{ type: Input, args: ['time_24hr',] }],
    flatpickrUtc: [{ type: Input, args: ['utc',] }],
    flatpickrWeekNumbers: [{ type: Input, args: ['weekNumbers',] }],
    flatpickrWrap: [{ type: Input, args: ['wrap',] }],
    flatpickrOnChange: [{ type: Output, args: ['onChange',] }],
    flatpickrOnClose: [{ type: Output, args: ['onClose',] }],
    flatpickrOnOpen: [{ type: Output, args: ['onOpen',] }],
    flatpickrOnReady: [{ type: Output, args: ['onReady',] }],
    onClick: [{ type: HostListener, args: ['dblclick',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbmcyLWZsYXRwaWNrci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNTLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQ3BELE1BQU0sRUFBRSxTQUFTLEVBQ3BDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBZSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU8xRSxNQUFNLE9BQU8scUJBQXFCO0lBMlJqQyxZQUNXLE1BQXdCLEVBQ3hCLFNBQW9CLEVBQ3BCLE9BQW1CLEVBQ25CLFFBQW1CO1FBSG5CLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBakQ5Qjs7OztXQUlHO1FBQ3dCLHNCQUFpQixHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhHOzs7O1dBSUc7UUFDdUIscUJBQWdCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFOUY7Ozs7V0FJRztRQUNzQixvQkFBZSxHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTVGOzs7O1dBSUc7UUFDdUIscUJBQWdCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7SUF3QjFGLENBQUM7SUF0QkwsNkRBQTZEO0lBRXRELE9BQU87UUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFvQkQsSUFBSSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFD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WSxTQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuXHRBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCxcblx0T25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgUmVuZGVyZXIyLCBTaW1wbGVDaGFuZ2VzLCBPbkNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sQ29udGFpbmVyLCBGb3JtQ29udHJvbCwgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGbGF0cGlja3JFdmVudCB9IGZyb20gJy4vZmxhdHBpY2tyLWV2ZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBGbGF0cGlja3JJbnN0YW5jZSB9IGZyb20gJy4vZmxhdHBpY2tyLWluc3RhbmNlJztcbmltcG9ydCB7IEZsYXRwaWNrck9wdGlvbnMgfSBmcm9tICcuL2ZsYXRwaWNrci1vcHRpb25zLmludGVyZmFjZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tmbGF0cGlja3JdJywgZXhwb3J0QXM6ICduZzItZmxhdHBpY2tyJyB9KVxuZXhwb3J0IGNsYXNzIE5nMkZsYXRwaWNrckRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25Jbml0LCBPbkNoYW5nZXMge1xuXHQvKipcblx0ICogVGhlIGZsYXRwaWNrciBjb25maWd1cmF0aW9uIGFzIGEgc2luZ2xlIG9iamVjdCBvZiB2YWx1ZXMuXG5cdCAqXG5cdCAqIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3Ivb3B0aW9ucy8gZm9yIGZ1bGwgbGlzdC5cblx0ICovXG5cdEBJbnB1dCgnZmxhdHBpY2tyJykgcHVibGljIGZsYXRwaWNrck9wdGlvbnM6IEZsYXRwaWNrck9wdGlvbnM7XG5cblx0LyoqXG5cdCAqIFBsYWNlaG9sZGVyIGZvciBpbnB1dCBmaWVsZC5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBJbnB1dCgncGxhY2Vob2xkZXInKSBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuXHQvKipcblx0ICogRXhhY3RseSB0aGUgc2FtZSBhcyBkYXRlIGZvcm1hdCwgYnV0IGZvciB0aGUgYWx0SW5wdXQgZmllbGQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcIkYgaiwgWVwiXG5cdCAqL1xuXHRASW5wdXQoJ2FsdEZvcm1hdCcpIHB1YmxpYyBmbGF0cGlja3JBbHRGb3JtYXQ6IHN0cmluZztcblxuXHQvKipcblx0ICogU2hvdyB0aGUgdXNlciBhIHJlYWRhYmxlIGRhdGUgKGFzIHBlciBhbHRGb3JtYXQpLCBidXQgcmV0dXJuIHNvbWV0aGluZ1xuXHQgKiB0b3RhbGx5IGRpZmZlcmVudCB0byB0aGUgc2VydmVyLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCgnYWx0SW5wdXQnKSBwdWJsaWMgZmxhdHBpY2tyQWx0SW5wdXQ6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFRoaXMgY2xhc3Mgd2lsbCBiZSBhZGRlZCB0byB0aGUgaW5wdXQgZWxlbWVudCBjcmVhdGVkIGJ5IHRoZSBhbHRJbnB1dFxuXHQgKiBvcHRpb24uXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcIlwiXG5cdCAqL1xuXHRASW5wdXQoJ2FsdElucHV0Q2xhc3MnKSBwdWJsaWMgZmxhdHBpY2tyQWx0SW5wdXRDbGFzczogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBBbGxvd3MgdGhlIHVzZXIgdG8gZW50ZXIgYSBkYXRlIGRpcmVjdGx5IGlucHV0IHRoZSBpbnB1dCBmaWVsZC4gQnlcblx0ICogZGVmYXVsdCwgZGlyZWN0IGVudHJ5IGlzIGRpc2FibGVkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCgnYWxsb3dJbnB1dCcpIHB1YmxpYyBmbGF0cGlja3JBbGxvd0lucHV0OiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBJbnN0ZWFkIG9mIGJvZHksIGFwcGVuZHMgdGhlIGNhbGVuZGFyIHRvIHRoZSBzcGVjaWZpZWQgbm9kZSBpbnN0ZWFkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QElucHV0KCdhcHBlbmRUbycpIHB1YmxpYyBmbGF0cGlja3JBcHBlbmRUbzogYW55OyAvLyBIVE1MRWxlbWVudFxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIGNsaWNraW5nIG9uIHRoZSBpbnB1dCBzaG91bGQgb3BlbiB0aGUgcGlja2VyLlxuXHQgKiBZb3UgY291bGQgZGlzYWJsZSB0aGlzIGlmIHlvdSB3aXNoIHRvIG9wZW4gdGhlIGNhbGVuZGFyIG1hbnVhbGx5XG5cdCAqIHdpdGgub3BlbigpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgdHJ1ZVxuXHQgKi9cblx0QElucHV0KCdjbGlja09wZW5zJykgcHVibGljIGZsYXRwaWNrckNsaWNrT3BlbnM6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEEgc3RyaW5nIG9mIGNoYXJhY3RlcnMgd2hpY2ggYXJlIHVzZWQgdG8gZGVmaW5lIGhvdyB0aGUgZGF0ZSB3aWxsIGJlXG5cdCAqIGRpc3BsYXllZCBpbiB0aGUgaW5wdXQgYm94LlxuXHQgKiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2Zvcm1hdHRpbmcvIGZvciBzdXBwb3J0ZWQgdG9rZW5zLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgXCJZLW0tZFwiXG5cdCAqL1xuXHRASW5wdXQoJ2RhdGVGb3JtYXQnKSBwdWJsaWMgZmxhdHBpY2tyRGF0ZUZvcm1hdDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSBpbml0aWFsIHNlbGVjdGVkIGRhdGUocykuXG5cdCAqXG5cdCAqIElmIHlvdSdyZSB1c2luZyB7bW9kZTogXCJtdWx0aXBsZVwifSBvciBhIHJhbmdlIGNhbGVuZGFyIHN1cHBseSBhbiBBcnJheSBvZlxuXHQgKiBEYXRlIG9iamVjdHMgb3IgYW4gQXJyYXkgb2YgZGF0ZSBzdHJpbmdzIHdoaWNoIGZvbGxvdyB5b3VyIGRhdGVGb3JtYXQuXG5cdCAqXG5cdCAqIE90aGVyd2lzZSwgeW91IGNhbiBzdXBwbHkgYSBzaW5nbGUgRGF0ZSBvYmplY3Qgb3IgYSBkYXRlIHN0cmluZy5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBJbnB1dCgnZGVmYXVsdERhdGUnKSBwdWJsaWMgZmxhdHBpY2tyRGVmYXVsdERhdGU6IHN0cmluZyB8IERhdGU7XG5cblx0LyoqXG5cdCAqIERpc2FibGUgYW4gYXJyYXkgb2Ygc3BlY2lmaWMgZGF0ZXMsIGRhdGUgcmFuZ2VzLCBvciBmdW5jdGlvbnMgdG8gZGlzYWJsZVxuXHQgKiBkYXRlcy4gU2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9leGFtcGxlcy8jZGlzYWJsaW5nLXNwZWNpZmljLWRhdGVzXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBbXVxuXHQgKi9cblx0QElucHV0KCdkaXNhYmxlJykgcHVibGljIGZsYXRwaWNrckRpc2FibGU6IHN0cmluZ1tdIHwgRGF0ZVtdO1xuXG5cdC8qKlxuXHQgKiBTZXQgZGlzYWJsZU1vYmlsZSB0byB0cnVlIHRvIGFsd2F5cyB1c2UgdGhlIG5vbi1uYXRpdmUgcGlja2VyLiBCeVxuXHQgKiBkZWZhdWx0LCBGbGF0cGlja3IgdXRpbGl6ZXMgbmF0aXZlIGRhdGV0aW1lIHdpZGdldHMgdW5sZXNzIGNlcnRhaW5cblx0ICogb3B0aW9ucyAoZS5nLiBkaXNhYmxlKSBhcmUgdXNlZC5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoJ2Rpc2FibGVNb2JpbGUnKSBwdWJsaWMgZmxhdHBpY2tyRGlzYWJsZU1vYmlsZTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRW5hYmxlIGFuIGFycmF5IG9mIHNwZWNpZmljIGRhdGVzLCBkYXRlIHJhbmdlcywgb3IgZnVuY3Rpb25zIHRvIGVuYWJsZVxuXHQgKiBkYXRlcy4gU2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9leGFtcGxlcy8jZGlzYWJsaW5nLWFsbC1kYXRlcy1leGNlcHQtc2VsZWN0LWZld1xuXHQgKlxuXHQgKiBEZWZhdWx0OiAgW11cblx0ICovXG5cdEBJbnB1dCgnZW5hYmxlJykgcHVibGljIGZsYXRwaWNrckVuYWJsZTogc3RyaW5nW10gfCBEYXRlW107XG5cblx0LyoqXG5cdCAqIEVuYWJsZXMgdGltZSBwaWNrZXIuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCdlbmFibGVUaW1lJykgcHVibGljIGZsYXRwaWNrckVuYWJsZVRpbWU6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEVuYWJsZXMgc2Vjb25kcyBpbiB0aGUgdGltZSBwaWNrZXIuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCdlbmFibGVTZWNvbmRzJykgcHVibGljIGZsYXRwaWNrckVuYWJsZVNlY29uZHM6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEFkanVzdHMgdGhlIHN0ZXAgZm9yIHRoZSBob3VyIGlucHV0IChpbmNsLiBzY3JvbGxpbmcpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgMVxuXHQgKi9cblx0QElucHV0KCdob3VySW5jcmVtZW50JykgcHVibGljIGZsYXRwaWNrckhvdXJJbmNyZW1lbnQ6IG51bWJlcjtcblxuXHQvKipcblx0ICogRGlzcGxheXMgdGhlIGNhbGVuZGFyIGlubGluZS5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoJ2lubGluZScpIHB1YmxpYyBmbGF0cGlja3JJbmxpbmU6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFVzZSBhIHNwZWNpZmljIGxvY2FsZSBmb3IgdGhlIGZsYXRwaWNrciBpbnN0YW5jZS5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBJbnB1dCgnbG9jYWxlJykgcHVibGljIGZsYXRwaWNrckxvY2FsZTogT2JqZWN0O1xuXG5cdC8qKlxuXHQgKiBUaGUgbWF4aW11bSBkYXRlIHRoYXQgYSB1c2VyIGNhbiBwaWNrIHRvIChpbmNsdXNpdmUpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QElucHV0KCdtYXhEYXRlJykgcHVibGljIGZsYXRwaWNrck1heERhdGU6IHN0cmluZyB8IERhdGU7XG5cblx0LyoqXG5cdCAqIFRoZSBtaW5pbXVtIGRhdGUgdGhhdCBhIHVzZXIgY2FuIHN0YXJ0IHBpY2tpbmcgZnJvbSAoaW5jbHVzaXZlKS5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBJbnB1dCgnbWluRGF0ZScpIHB1YmxpYyBmbGF0cGlja3JNaW5EYXRlOiBzdHJpbmcgfCBEYXRlO1xuXG5cdC8qKlxuXHQgKiBBZGp1c3RzIHRoZSBzdGVwIGZvciB0aGUgbWludXRlIGlucHV0IChpbmNsLiBzY3JvbGxpbmcpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgNVxuXHQgKi9cblx0QElucHV0KCdtaW51dGVJbmNyZW1lbnQnKSBwdWJsaWMgZmxhdHBpY2tyTWludXRlSW5jcmVtZW50OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFwic2luZ2xlXCIsIFwibXVsdGlwbGVcIiwgb3IgXCJyYW5nZVwiXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcInNpbmdsZVwiXG5cdCAqL1xuXHRASW5wdXQoJ21vZGUnKSBwdWJsaWMgZmxhdHBpY2tyTW9kZTogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBIVE1MIGZvciB0aGUgYXJyb3cgaWNvbiwgdXNlZCB0byBzd2l0Y2ggbW9udGhzLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgXCI+XCJcblx0ICovXG5cdEBJbnB1dCgnbmV4dEFycm93JykgcHVibGljIGZsYXRwaWNrck5leHRBcnJvdzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBIaWRlcyB0aGUgZGF5IHNlbGVjdGlvbiBpbiBjYWxlbmRhci4gVXNlIGl0IGFsb25nIHdpdGggZW5hYmxlVGltZSB0b1xuXHQgKiBjcmVhdGUgYSB0aW1lIHBpY2tlci5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoJ25vQ2FsZW5kYXInKSBwdWJsaWMgZmxhdHBpY2tyTm9DYWxlbmRhcjogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRnVuY3Rpb24gdGhhdCBleHBlY3RzIGEgZGF0ZSBzdHJpbmcgYW5kIG11c3QgcmV0dXJuIGEgRGF0ZSBvYmplY3QuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCdwYXJzZURhdGUnKSBwdWJsaWMgZmxhdHBpY2tyUGFyc2VEYXRlOiBGdW5jdGlvbjtcblxuXHQvKipcblx0ICogSFRNTCBmb3IgdGhlIGxlZnQgYXJyb3cgaWNvbi5cblx0ICpcblx0ICogRGVmYXVsdDogIFwiPFwiXG5cdCAqL1xuXHRASW5wdXQoJ3ByZXZBcnJvdycpIHB1YmxpYyBmbGF0cGlja3JQcmV2QXJyb3c6IHN0cmluZztcblxuXHQvKipcblx0ICogU2hvdyB0aGUgbW9udGggdXNpbmcgdGhlIHNob3J0aGFuZCB2ZXJzaW9uIChpZSwgU2VwIGluc3RlYWQgb2YgU2VwdGVtYmVyKS5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoJ3Nob3J0aGFuZEN1cnJlbnRNb250aCcpIHB1YmxpYyBmbGF0cGlja3JTaG9ydGhhbmRDdXJyZW50TW9udGg6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFBvc2l0aW9uIHRoZSBjYWxlbmRhciBpbnNpZGUgdGhlIHdyYXBwZXIgYW5kIG5leHQgdG8gdGhlIGlucHV0IGVsZW1lbnRcblx0ICogKExlYXZlIGZhbHNlIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSdyZSBkb2luZykuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCdzdGF0aWMnKSBwdWJsaWMgZmxhdHBpY2tyU3RhdGljOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBEaXNwbGF5cyB0aW1lIHBpY2tlciBpbiAyNCBob3VyIG1vZGUgd2l0aG91dCBBTS9QTSBzZWxlY3Rpb24gd2hlbiBlbmFibGVkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCgndGltZV8yNGhyJykgcHVibGljIGZsYXRwaWNrclRpbWVfMjRocjogYm9vbGVhbjtcblxuXHRASW5wdXQoJ3V0YycpIHB1YmxpYyBmbGF0cGlja3JVdGM6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEVuYWJsZXMgZGlzcGxheSBvZiB3ZWVrIG51bWJlcnMgaW4gY2FsZW5kYXIuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCd3ZWVrTnVtYmVycycpIHB1YmxpYyBmbGF0cGlja3JXZWVrTnVtYmVyczogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQ3VzdG9tIGVsZW1lbnRzIGFuZCBpbnB1dCBncm91cHMuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCd3cmFwJykgcHVibGljIGZsYXRwaWNrcldyYXA6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIG9uQ2hhbmdlIGdldHMgdHJpZ2dlcmVkIHdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhIGRhdGUsIG9yIGNoYW5nZXMgdGhlIHRpbWUgb24gYSBzZWxlY3RlZCBkYXRlLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QE91dHB1dCgnb25DaGFuZ2UnKSBwdWJsaWMgZmxhdHBpY2tyT25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0LyoqXG5cdCAqIG9uQ2xvc2UgZ2V0cyB0cmlnZ2VyZWQgd2hlbiB0aGUgY2FsZW5kYXIgaXMgY2xvc2VkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QE91dHB1dCgnb25DbG9zZScpIHB1YmxpYyBmbGF0cGlja3JPbkNsb3NlOiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdC8qKlxuXHQgKiBvbk9wZW4gZ2V0cyB0cmlnZ2VyZWQgd2hlbiB0aGUgY2FsZW5kYXIgaXMgb3BlbmVkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QE91dHB1dCgnb25PcGVuJykgcHVibGljIGZsYXRwaWNrck9uT3BlbjogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHQvKipcblx0ICogb25SZWFkeSBnZXRzIHRyaWdnZXJlZCBvbmNlIHRoZSBjYWxlbmRhciBpcyBpbiBhIHJlYWR5IHN0YXRlLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QE91dHB1dCgnb25SZWFkeScpIHB1YmxpYyBmbGF0cGlja3JPblJlYWR5OiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdC8qKiBBbGxvdyBkb3VibGUtY2xpY2tpbmcgb24gdGhlIGNvbnRyb2wgdG8gb3Blbi9jbG9zZSBpdC4gKi9cblx0QEhvc3RMaXN0ZW5lcignZGJsY2xpY2snKVxuXHRwdWJsaWMgb25DbGljaygpIHtcblx0XHR0aGlzLmZsYXRwaWNrci50b2dnbGUoKTtcblx0fVxuXG5cdHByb3RlY3RlZCBnbG9iYWxPbkNoYW5nZTogRnVuY3Rpb247XG5cdHByb3RlY3RlZCBnbG9iYWxPbkNsb3NlOiBGdW5jdGlvbjtcblx0cHJvdGVjdGVkIGdsb2JhbE9uT3BlbjogRnVuY3Rpb247XG5cdHByb3RlY3RlZCBnbG9iYWxPblJlYWR5OiBGdW5jdGlvbjtcblxuXHRwcm90ZWN0ZWQgZmxhdHBpY2tyOiBGbGF0cGlja3JJbnN0YW5jZTtcblx0cHJvdGVjdGVkIGZvcm1Db250cm9sTGlzdGVuZXI6IFN1YnNjcmlwdGlvbjtcblxuXHQvKiogQWxsb3cgYWNjZXNzIHByb3BlcnRpZXMgdXNpbmcgaW5kZXggbm90YXRpb24gKi9cblx0W2tleTogc3RyaW5nXTogYW55O1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByb3RlY3RlZCBwYXJlbnQ6IENvbnRyb2xDb250YWluZXIsXG5cdFx0cHJvdGVjdGVkIG5nQ29udHJvbDogTmdDb250cm9sLFxuXHRcdHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmLFxuXHRcdHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyXG5cdCkgeyB9XG5cblx0Z2V0IGNvbnRyb2woKTogRm9ybUNvbnRyb2wge1xuXHRcdHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmZvcm1EaXJlY3RpdmUuZ2V0Q29udHJvbCh0aGlzLm5nQ29udHJvbCkgOiBudWxsO1xuXHR9XG5cblx0bmdBZnRlclZpZXdJbml0KCkge1xuXHRcdC8qKiBXZSBjYW5ub3QgaW5pdGlhbGl6ZSB0aGUgZmxhdHBpY2tyIGluc3RhbmNlIGluIG5nT25Jbml0KCk7IGl0IHdpbGxcblx0XHRcdHJhbmRvbWl6ZSB0aGUgZGF0ZSB3aGVuIHRoZSBmb3JtIGNvbnRyb2wgaW5pdGlhbGl6ZXMuICovXG5cdFx0bGV0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcblxuXHRcdGlmICh0eXBlb2YgbmF0aXZlRWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgbmF0aXZlRWxlbWVudCA9PT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgJ0Vycm9yOiBpbnZhbGlkIGlucHV0IGVsZW1lbnQgc3BlY2lmaWVkJztcblx0XHR9XG5cblx0XHRpZiAodGhpcy5mbGF0cGlja3JPcHRpb25zLndyYXApIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnZGF0YS1pbnB1dCcsICcnKTtcblx0XHRcdG5hdGl2ZUVsZW1lbnQgPSBuYXRpdmVFbGVtZW50LnBhcmVudE5vZGU7XG5cdFx0fVxuXG5cdFx0dGhpcy5mbGF0cGlja3IgPSA8RmxhdHBpY2tySW5zdGFuY2U+bmF0aXZlRWxlbWVudC5mbGF0cGlja3IodGhpcy5mbGF0cGlja3JPcHRpb25zKTtcblx0fVxuXG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblx0XHRpZiAodGhpcy5mbGF0cGlja3Jcblx0XHRcdCYmIHRoaXMuZmxhdHBpY2tyQWx0SW5wdXRcblx0XHRcdCYmIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3BsYWNlaG9sZGVyJylcblx0XHRcdCYmIGNoYW5nZXNbJ3BsYWNlaG9sZGVyJ10uY3VycmVudFZhbHVlKSB7XG5cdFx0XHR0aGlzLmZsYXRwaWNrci5hbHRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgY2hhbmdlc1sncGxhY2Vob2xkZXInXS5jdXJyZW50VmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdGlmICh0aGlzLmZsYXRwaWNrcikge1xuXHRcdFx0dGhpcy5mbGF0cGlja3IuZGVzdHJveSgpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIpIHtcblx0XHRcdHRoaXMuZm9ybUNvbnRyb2xMaXN0ZW5lci51bnN1YnNjcmliZSgpO1xuXHRcdFx0dGhpcy5mb3JtQ29udHJvbExpc3RlbmVyID0gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdHRoaXMuZmxhdHBpY2tyT25DaGFuZ2UgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5mbGF0cGlja3JPbkNsb3NlID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuZmxhdHBpY2tyT25PcGVuID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuZmxhdHBpY2tyT25SZWFkeSA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuZ2xvYmFsT25DaGFuZ2UgPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25DaGFuZ2U7XG5cdFx0dGhpcy5nbG9iYWxPbkNsb3NlID0gdGhpcy5mbGF0cGlja3JPcHRpb25zLm9uQ2xvc2U7XG5cdFx0dGhpcy5nbG9iYWxPbk9wZW4gPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25PcGVuO1xuXHRcdHRoaXMuZ2xvYmFsT25SZWFkeSA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vblJlYWR5O1xuXG5cdFx0dGhpcy5mbGF0cGlja3JPcHRpb25zID0ge1xuXHRcdFx0YWx0Rm9ybWF0OiB0aGlzLmdldE9wdGlvbignYWx0Rm9ybWF0JyksXG5cdFx0XHRhbHRJbnB1dDogdGhpcy5nZXRPcHRpb24oJ2FsdElucHV0JyksXG5cdFx0XHRhbHRJbnB1dENsYXNzOiB0aGlzLmdldE9wdGlvbignYWx0SW5wdXRDbGFzcycpLFxuXHRcdFx0YWxsb3dJbnB1dDogdGhpcy5nZXRPcHRpb24oJ2FsbG93SW5wdXQnKSxcblx0XHRcdGFwcGVuZFRvOiB0aGlzLmdldE9wdGlvbignYXBwZW5kVG8nKSxcblx0XHRcdGNsaWNrT3BlbnM6IHRoaXMuZ2V0T3B0aW9uKCdjbGlja09wZW5zJywgdHJ1ZSksXG5cdFx0XHRkYXRlRm9ybWF0OiB0aGlzLmdldE9wdGlvbignZGF0ZUZvcm1hdCcpLFxuXHRcdFx0ZGVmYXVsdERhdGU6IHRoaXMuZ2V0T3B0aW9uKCdkZWZhdWx0RGF0ZScpLFxuXHRcdFx0ZGlzYWJsZTogdGhpcy5nZXRPcHRpb24oJ2Rpc2FibGUnKSxcblx0XHRcdGRpc2FibGVNb2JpbGU6IHRoaXMuZ2V0T3B0aW9uKCdkaXNhYmxlTW9iaWxlJyksXG5cdFx0XHRlbmFibGU6IHRoaXMuZ2V0T3B0aW9uKCdlbmFibGUnKSxcblx0XHRcdGVuYWJsZVRpbWU6IHRoaXMuZ2V0T3B0aW9uKCdlbmFibGVUaW1lJyksXG5cdFx0XHRlbmFibGVTZWNvbmRzOiB0aGlzLmdldE9wdGlvbignZW5hYmxlU2Vjb25kcycpLFxuXHRcdFx0aG91ckluY3JlbWVudDogdGhpcy5nZXRPcHRpb24oJ2hvdXJJbmNyZW1lbnQnKSxcblx0XHRcdGlubGluZTogdGhpcy5nZXRPcHRpb24oJ2lubGluZScpLFxuXHRcdFx0bG9jYWxlOiB0aGlzLmdldE9wdGlvbignbG9jYWxlJyksXG5cdFx0XHRtYXhEYXRlOiB0aGlzLmdldE9wdGlvbignbWF4RGF0ZScpLFxuXHRcdFx0bWluRGF0ZTogdGhpcy5nZXRPcHRpb24oJ21pbkRhdGUnKSxcblx0XHRcdG1pbnV0ZUluY3JlbWVudDogdGhpcy5nZXRPcHRpb24oJ21pbnV0ZUluY3JlbWVudCcpLFxuXHRcdFx0bW9kZTogdGhpcy5nZXRPcHRpb24oJ21vZGUnKSxcblx0XHRcdG5leHRBcnJvdzogdGhpcy5nZXRPcHRpb24oJ25leHRBcnJvdycpLFxuXHRcdFx0bm9DYWxlbmRhcjogdGhpcy5nZXRPcHRpb24oJ25vQ2FsZW5kYXInKSxcblx0XHRcdG9uQ2hhbmdlOiB0aGlzLmV2ZW50T25DaGFuZ2UuYmluZCh0aGlzKSxcblx0XHRcdG9uQ2xvc2U6IHRoaXMuZXZlbnRPbkNsb3NlLmJpbmQodGhpcyksXG5cdFx0XHRvbk9wZW46IHRoaXMuZXZlbnRPbk9wZW4uYmluZCh0aGlzKSxcblx0XHRcdG9uUmVhZHk6IHRoaXMuZXZlbnRPblJlYWR5LmJpbmQodGhpcyksXG5cdFx0XHRwYXJzZURhdGU6IHRoaXMuZ2V0T3B0aW9uKCdwYXJzZURhdGUnKSxcblx0XHRcdHByZXZBcnJvdzogdGhpcy5nZXRPcHRpb24oJ3ByZXZBcnJvdycpLFxuXHRcdFx0c2hvcnRoYW5kQ3VycmVudE1vbnRoOiB0aGlzLmdldE9wdGlvbignc2hvcnRoYW5kQ3VycmVudE1vbnRoJyksXG5cdFx0XHRzdGF0aWM6IHRoaXMuZ2V0T3B0aW9uKCdzdGF0aWMnKSxcblx0XHRcdHRpbWVfMjRocjogdGhpcy5nZXRPcHRpb24oJ3RpbWVfMjRocicpLFxuXHRcdFx0dXRjOiB0aGlzLmdldE9wdGlvbigndXRjJyksXG5cdFx0XHR3ZWVrTnVtYmVyczogdGhpcy5nZXRPcHRpb24oJ3dlZWtOdW1iZXJzJyksXG5cdFx0XHR3cmFwOiB0aGlzLmdldE9wdGlvbignd3JhcCcsIHRydWUpLFxuXHRcdH07XG5cblx0XHQvLyBSZW1vdmUgdW5zZXQgcHJvcGVydGllc1xuXHRcdE9iamVjdC5rZXlzKHRoaXMuZmxhdHBpY2tyT3B0aW9ucykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcblx0XHRcdCh0aGlzLmZsYXRwaWNrck9wdGlvbnNba2V5XSA9PT0gdW5kZWZpbmVkKSAmJlxuXHRcdFx0XHRkZWxldGUgdGhpcy5mbGF0cGlja3JPcHRpb25zW2tleV07XG5cdFx0fSk7XG5cblx0XHRpZiAodGhpcy5jb250cm9sKSB7XG5cdFx0XHR0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIgPSB0aGlzLmNvbnRyb2wudmFsdWVDaGFuZ2VzXG5cdFx0XHRcdC5zdWJzY3JpYmUoKHZhbHVlOiBhbnkpID0+IHtcblx0XHRcdFx0XHRpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpKSB7XG5cdFx0XHRcdFx0XHQvLyBRdWlldGx5IHVwZGF0ZSB0aGUgdmFsdWUgb2YgdGhlIGZvcm0gY29udHJvbCB0byBiZSBhXG5cdFx0XHRcdFx0XHQvLyBEYXRlIG9iamVjdC4gVGhpcyBhdm9pZHMgYW55IGV4dGVybmFsIHN1YnNjcmliZXJzXG5cdFx0XHRcdFx0XHQvLyBmcm9tIGJlaW5nIG5vdGlmaWVkIGEgc2Vjb25kIHRpbWUgKG9uY2UgZm9yIHRoZSB1c2VyXG5cdFx0XHRcdFx0XHQvLyBpbml0aWF0ZWQgZXZlbnQsIGFuZCBvbmNlIGZvciBvdXIgY29udmVyc2lvbiB0b1xuXHRcdFx0XHRcdFx0Ly8gRGF0ZSgpKS5cblx0XHRcdFx0XHRcdHRoaXMuY29udHJvbC5zZXRWYWx1ZShuZXcgRGF0ZSgnJyArIHZhbHVlKSwge1xuXHRcdFx0XHRcdFx0XHRvbmx5U2VsZjogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0ZW1pdEV2ZW50OiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0ZW1pdE1vZGVsVG9WaWV3Q2hhbmdlOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0ZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuXHQgKiBnbG9iYWwgb25DaGFuZ2UgY2FsbGJhY2ssIGlmIGRlZmluZWQuXG5cdCAqL1xuXHRwcm90ZWN0ZWQgZXZlbnRPbkNoYW5nZShzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCk6IHZvaWQge1xuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XG5cdFx0XHRzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxuXHRcdFx0ZGF0ZVN0cjogZGF0ZVN0cixcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxuXHRcdH07XG5cdFx0aWYgKHRoaXMuZmxhdHBpY2tyT25DaGFuZ2UpIHtcblx0XHRcdHRoaXMuZmxhdHBpY2tyT25DaGFuZ2UuZW1pdChldmVudCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdsb2JhbE9uQ2hhbmdlKSB7XG5cdFx0XHR0aGlzLmdsb2JhbE9uQ2hhbmdlKGV2ZW50KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuXHQgKiBnbG9iYWwgb25DbG9zZSBjYWxsYmFjaywgaWYgZGVmaW5lZC5cblx0ICovXG5cdHByb3RlY3RlZCBldmVudE9uQ2xvc2Uoc2VsZWN0ZWREYXRlczogRGF0ZVtdLCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBPYmplY3QpOiB2b2lkIHtcblx0XHRsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xuXHRcdFx0c2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcblx0XHRcdGRhdGVTdHI6IGRhdGVTdHIsXG5cdFx0XHRpbnN0YW5jZTogaW5zdGFuY2Vcblx0XHR9O1xuXHRcdGlmICh0aGlzLmZsYXRwaWNrck9uQ2xvc2UpIHtcblx0XHRcdHRoaXMuZmxhdHBpY2tyT25DbG9zZS5lbWl0KGV2ZW50KTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2xvYmFsT25DbG9zZSkge1xuXHRcdFx0dGhpcy5nbG9iYWxPbkNsb3NlKGV2ZW50KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuXHQgKiBnbG9iYWwgb25PcGVuIGNhbGxiYWNrLCBpZiBkZWZpbmVkLlxuXHQgKi9cblx0cHJvdGVjdGVkIGV2ZW50T25PcGVuKHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0KTogdm9pZCB7XG5cdFx0bGV0IGV2ZW50OiBGbGF0cGlja3JFdmVudCA9IHtcblx0XHRcdHNlbGVjdGVkRGF0ZXM6IHNlbGVjdGVkRGF0ZXMsXG5cdFx0XHRkYXRlU3RyOiBkYXRlU3RyLFxuXHRcdFx0aW5zdGFuY2U6IGluc3RhbmNlXG5cdFx0fTtcblx0XHRpZiAodGhpcy5mbGF0cGlja3JPbk9wZW4pIHtcblx0XHRcdHRoaXMuZmxhdHBpY2tyT25PcGVuLmVtaXQoZXZlbnQpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5nbG9iYWxPbk9wZW4pIHtcblx0XHRcdHRoaXMuZ2xvYmFsT25PcGVuKGV2ZW50KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuXHQgKiBnbG9iYWwgb25SZWFkeSBjYWxsYmFjaywgaWYgZGVmaW5lZC5cblx0ICovXG5cdHByb3RlY3RlZCBldmVudE9uUmVhZHkoc2VsZWN0ZWREYXRlczogRGF0ZVtdLCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBPYmplY3QpOiB2b2lkIHtcblx0XHRsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xuXHRcdFx0c2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcblx0XHRcdGRhdGVTdHI6IGRhdGVTdHIsXG5cdFx0XHRpbnN0YW5jZTogaW5zdGFuY2Vcblx0XHR9O1xuXHRcdGlmICh0aGlzLmZsYXRwaWNrck9uUmVhZHkpIHtcblx0XHRcdHRoaXMuZmxhdHBpY2tyT25SZWFkeS5lbWl0KGV2ZW50KTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2xvYmFsT25SZWFkeSkge1xuXHRcdFx0dGhpcy5nbG9iYWxPblJlYWR5KGV2ZW50KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHRoZSBjb25maWd1cmF0aW9uIHZhbHVlIGZvciBvcHRpb24ge29wdGlvbn0sIG9yIHtkZWZhdWx0VmFsdWV9IGlmIGl0XG5cdCAqIGRvZXNuJ3QgZXhpc3QuXG5cdCAqL1xuXHRwcm90ZWN0ZWQgZ2V0T3B0aW9uKG9wdGlvbjogc3RyaW5nLCBkZWZhdWx0VmFsdWU/OiBhbnkpOiBhbnkge1xuXHRcdGxldCBsb2NhbE5hbWUgPSAnZmxhdHBpY2tyJyArIG9wdGlvbi5zdWJzdHJpbmcoMCwgMSkudG9VcHBlckNhc2UoKVxuXHRcdFx0KyBvcHRpb24uc3Vic3RyaW5nKDEpO1xuXG5cdFx0aWYgKHR5cGVvZiB0aGlzW2xvY2FsTmFtZV0gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gdGhpc1tsb2NhbE5hbWVdO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuZmxhdHBpY2tyT3B0aW9uc1tvcHRpb25dICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0cmV0dXJuIHRoaXMuZmxhdHBpY2tyT3B0aW9uc1tvcHRpb25dO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0fVxufVxuIl19