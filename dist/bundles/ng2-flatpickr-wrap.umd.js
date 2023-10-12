(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('flatpickr-wrap')) :
    typeof define === 'function' && define.amd ? define('ng2-flatpickr-wrap', ['exports', '@angular/core', '@angular/forms', '@angular/common', 'flatpickr-wrap'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["ng2-flatpickr-wrap"] = {}, global.ng.core, global.ng.forms, global.ng.common));
})(this, (function (exports, core, forms, common) { 'use strict';

    if (typeof window !== 'undefined') {
        require('flatpickr-wrap');
    }
    var Ng2FlatpickrComponent = /** @class */ (function () {
        function Ng2FlatpickrComponent() {
            var _this = this;
            this._tabindex = 0;
            this.onTouchedFn = function () { };
            this.defaultFlatpickrOptions = {
                wrap: true,
                clickOpens: true,
                onChange: function (selectedDates) { _this.writeValue(selectedDates); }
            };
            this.placeholder = "";
            this.addClass = "";
            this.hideButton = false;
            this.propagateChange = function (_) { };
        }
        Object.defineProperty(Ng2FlatpickrComponent.prototype, "tabindex", {
            get: function () { return this._tabindex; },
            set: function (ti) { this._tabindex = Number(ti); },
            enumerable: false,
            configurable: true
        });
        ///////////////////////////////////
        Ng2FlatpickrComponent.prototype.writeValue = function (value) {
            this.propagateChange(value);
        };
        Ng2FlatpickrComponent.prototype.registerOnChange = function (fn) {
            this.propagateChange = fn;
        };
        Ng2FlatpickrComponent.prototype.registerOnTouched = function (fn) {
            this.onTouchedFn = fn;
        };
        ///////////////////////////////////
        Ng2FlatpickrComponent.prototype.setDateFromInput = function (date) {
            this.flatpickrElement.nativeElement._flatpickr.setDate(date, true);
        };
        Ng2FlatpickrComponent.prototype.setAltInputPlaceholder = function (placeholder) {
            this.flatpickrElement.nativeElement._flatpickr.altInput.setAttribute('placeholder', placeholder);
        };
        Ng2FlatpickrComponent.prototype.ngAfterViewInit = function () {
            if (this.config) {
                Object.assign(this.defaultFlatpickrOptions, this.config);
            }
            if (this.flatpickrElement.nativeElement.flatpickr) {
                this.flatpickr = this.flatpickrElement.nativeElement.flatpickr(this.defaultFlatpickrOptions);
            }
            if (this.setDate) {
                this.setDateFromInput(this.setDate);
            }
        };
        Ng2FlatpickrComponent.prototype.ngOnChanges = function (changes) {
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
        };
        Ng2FlatpickrComponent.prototype.onFocus = function (event) {
            this.onTouchedFn();
        };
        return Ng2FlatpickrComponent;
    }());
    Ng2FlatpickrComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ng2-flatpickr',
                    template: "\n\t\t<div class=\"ng2-flatpickr-input-container\" #flatpickr>\n\t\t\t<input *ngIf=\"!hideButton\" class=\"ng2-flatpickr-input {{ addClass }}\" [placeholder]=\"placeholder\" [tabindex]=\"tabindex\" type=\"text\" (focus)=\"onFocus($event)\" data-input>\n\t\t\t<ng-content></ng-content>\n\t\t</div>\n\t\t",
                    providers: [
                        {
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: core.forwardRef(function () { return Ng2FlatpickrComponent; }),
                            multi: true
                        }
                    ]
                },] }
    ];
    Ng2FlatpickrComponent.propDecorators = {
        flatpickrElement: [{ type: core.ViewChild, args: ['flatpickr', {
                        static: true
                    },] }],
        config: [{ type: core.Input }],
        placeholder: [{ type: core.Input }],
        addClass: [{ type: core.Input }],
        setDate: [{ type: core.Input }],
        tabindex: [{ type: core.Input }],
        hideButton: [{ type: core.Input }]
    };

    var Ng2FlatpickrDirective = /** @class */ (function () {
        function Ng2FlatpickrDirective(parent, ngControl, element, renderer) {
            this.parent = parent;
            this.ngControl = ngControl;
            this.element = element;
            this.renderer = renderer;
            /**
             * onChange gets triggered when the user selects a date, or changes the time on a selected date.
             *
             * Default:  null
             */
            this.flatpickrOnChange = new core.EventEmitter();
            /**
             * onClose gets triggered when the calendar is closed.
             *
             * Default:  null
             */
            this.flatpickrOnClose = new core.EventEmitter();
            /**
             * onOpen gets triggered when the calendar is opened.
             *
             * Default:  null
             */
            this.flatpickrOnOpen = new core.EventEmitter();
            /**
             * onReady gets triggered once the calendar is in a ready state.
             *
             * Default:  null
             */
            this.flatpickrOnReady = new core.EventEmitter();
        }
        /** Allow double-clicking on the control to open/close it. */
        Ng2FlatpickrDirective.prototype.onClick = function () {
            this.flatpickr.toggle();
        };
        Object.defineProperty(Ng2FlatpickrDirective.prototype, "control", {
            get: function () {
                return this.parent ? this.parent.formDirective.getControl(this.ngControl) : null;
            },
            enumerable: false,
            configurable: true
        });
        Ng2FlatpickrDirective.prototype.ngAfterViewInit = function () {
            /** We cannot initialize the flatpickr instance in ngOnInit(); it will
                randomize the date when the form control initializes. */
            var nativeElement = this.element.nativeElement;
            if (typeof nativeElement === 'undefined' || nativeElement === null) {
                throw 'Error: invalid input element specified';
            }
            if (this.flatpickrOptions.wrap) {
                this.renderer.setAttribute(this.element.nativeElement, 'data-input', '');
                nativeElement = nativeElement.parentNode;
            }
            this.flatpickr = nativeElement.flatpickr(this.flatpickrOptions);
        };
        Ng2FlatpickrDirective.prototype.ngOnChanges = function (changes) {
            if (this.flatpickr
                && this.flatpickrAltInput
                && changes.hasOwnProperty('placeholder')
                && changes['placeholder'].currentValue) {
                this.flatpickr.altInput.setAttribute('placeholder', changes['placeholder'].currentValue);
            }
        };
        Ng2FlatpickrDirective.prototype.ngOnDestroy = function () {
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
        };
        Ng2FlatpickrDirective.prototype.ngOnInit = function () {
            var _this = this;
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
            Object.keys(this.flatpickrOptions).forEach(function (key) {
                (_this.flatpickrOptions[key] === undefined) &&
                    delete _this.flatpickrOptions[key];
            });
            if (this.control) {
                this.formControlListener = this.control.valueChanges
                    .subscribe(function (value) {
                    if (!(value instanceof Date)) {
                        // Quietly update the value of the form control to be a
                        // Date object. This avoids any external subscribers
                        // from being notified a second time (once for the user
                        // initiated event, and once for our conversion to
                        // Date()).
                        _this.control.setValue(new Date('' + value), {
                            onlySelf: true,
                            emitEvent: false,
                            emitModelToViewChange: false,
                            emitViewToModelChange: false
                        });
                    }
                });
            }
        };
        /**
         * Fire off the event emitter for the directive element, and also for the
         * global onChange callback, if defined.
         */
        Ng2FlatpickrDirective.prototype.eventOnChange = function (selectedDates, dateStr, instance) {
            var event = {
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
        };
        /**
         * Fire off the event emitter for the directive element, and also for the
         * global onClose callback, if defined.
         */
        Ng2FlatpickrDirective.prototype.eventOnClose = function (selectedDates, dateStr, instance) {
            var event = {
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
        };
        /**
         * Fire off the event emitter for the directive element, and also for the
         * global onOpen callback, if defined.
         */
        Ng2FlatpickrDirective.prototype.eventOnOpen = function (selectedDates, dateStr, instance) {
            var event = {
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
        };
        /**
         * Fire off the event emitter for the directive element, and also for the
         * global onReady callback, if defined.
         */
        Ng2FlatpickrDirective.prototype.eventOnReady = function (selectedDates, dateStr, instance) {
            var event = {
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
        };
        /**
         * Return the configuration value for option {option}, or {defaultValue} if it
         * doesn't exist.
         */
        Ng2FlatpickrDirective.prototype.getOption = function (option, defaultValue) {
            var localName = 'flatpickr' + option.substring(0, 1).toUpperCase()
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
        };
        return Ng2FlatpickrDirective;
    }());
    Ng2FlatpickrDirective.decorators = [
        { type: core.Directive, args: [{ selector: '[flatpickr]', exportAs: 'ng2-flatpickr' },] }
    ];
    Ng2FlatpickrDirective.ctorParameters = function () { return [
        { type: forms.ControlContainer },
        { type: forms.NgControl },
        { type: core.ElementRef },
        { type: core.Renderer2 }
    ]; };
    Ng2FlatpickrDirective.propDecorators = {
        flatpickrOptions: [{ type: core.Input, args: ['flatpickr',] }],
        placeholder: [{ type: core.Input, args: ['placeholder',] }],
        flatpickrAltFormat: [{ type: core.Input, args: ['altFormat',] }],
        flatpickrAltInput: [{ type: core.Input, args: ['altInput',] }],
        flatpickrAltInputClass: [{ type: core.Input, args: ['altInputClass',] }],
        flatpickrAllowInput: [{ type: core.Input, args: ['allowInput',] }],
        flatpickrAppendTo: [{ type: core.Input, args: ['appendTo',] }],
        flatpickrClickOpens: [{ type: core.Input, args: ['clickOpens',] }],
        flatpickrDateFormat: [{ type: core.Input, args: ['dateFormat',] }],
        flatpickrDefaultDate: [{ type: core.Input, args: ['defaultDate',] }],
        flatpickrDisable: [{ type: core.Input, args: ['disable',] }],
        flatpickrDisableMobile: [{ type: core.Input, args: ['disableMobile',] }],
        flatpickrEnable: [{ type: core.Input, args: ['enable',] }],
        flatpickrEnableTime: [{ type: core.Input, args: ['enableTime',] }],
        flatpickrEnableSeconds: [{ type: core.Input, args: ['enableSeconds',] }],
        flatpickrHourIncrement: [{ type: core.Input, args: ['hourIncrement',] }],
        flatpickrInline: [{ type: core.Input, args: ['inline',] }],
        flatpickrLocale: [{ type: core.Input, args: ['locale',] }],
        flatpickrMaxDate: [{ type: core.Input, args: ['maxDate',] }],
        flatpickrMinDate: [{ type: core.Input, args: ['minDate',] }],
        flatpickrMinuteIncrement: [{ type: core.Input, args: ['minuteIncrement',] }],
        flatpickrMode: [{ type: core.Input, args: ['mode',] }],
        flatpickrNextArrow: [{ type: core.Input, args: ['nextArrow',] }],
        flatpickrNoCalendar: [{ type: core.Input, args: ['noCalendar',] }],
        flatpickrParseDate: [{ type: core.Input, args: ['parseDate',] }],
        flatpickrPrevArrow: [{ type: core.Input, args: ['prevArrow',] }],
        flatpickrShorthandCurrentMonth: [{ type: core.Input, args: ['shorthandCurrentMonth',] }],
        flatpickrStatic: [{ type: core.Input, args: ['static',] }],
        flatpickrTime_24hr: [{ type: core.Input, args: ['time_24hr',] }],
        flatpickrUtc: [{ type: core.Input, args: ['utc',] }],
        flatpickrWeekNumbers: [{ type: core.Input, args: ['weekNumbers',] }],
        flatpickrWrap: [{ type: core.Input, args: ['wrap',] }],
        flatpickrOnChange: [{ type: core.Output, args: ['onChange',] }],
        flatpickrOnClose: [{ type: core.Output, args: ['onClose',] }],
        flatpickrOnOpen: [{ type: core.Output, args: ['onOpen',] }],
        flatpickrOnReady: [{ type: core.Output, args: ['onReady',] }],
        onClick: [{ type: core.HostListener, args: ['dblclick',] }]
    };

    var Ng2FlatpickrModule = /** @class */ (function () {
        function Ng2FlatpickrModule() {
        }
        return Ng2FlatpickrModule;
    }());
    Ng2FlatpickrModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
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

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Ng2FlatpickrComponent = Ng2FlatpickrComponent;
    exports.Ng2FlatpickrDirective = Ng2FlatpickrDirective;
    exports.Ng2FlatpickrModule = Ng2FlatpickrModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ng2-flatpickr-wrap.umd.js.map
