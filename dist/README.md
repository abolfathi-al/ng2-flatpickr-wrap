# ng2-flatpickr-wrap

> This project is based on [`ng2-flatpickr`](https://github.com/mezoistvan/ng2-flatpickr), which combined with [`native-date-adapter`](https://www.npmjs.com/package/native-date-adapter), now it contains lunar and jalali calenders.
>
ng2-flatpickr-wrap is a lightweight Angular wrapper for flatpickr-wrap, which is usable in reactive forms inside Angular.

```javascript
npm install --save flatpickr-wrap ng2-flatpickr-wrap
yarn add flatpickr-wrap ng2-flatpickr-wrap
```

# How to use:

Import the Ng2FlatpickrModule to your NgModule:

```javascript
import { Ng2FlatpickrModule } from 'ng2-flatpickr-wrap';

@NgModule({
  imports: [
    Ng2FlatpickrModule
    ...
```

Example usage in a form component html template:

```javascript
<ng2-flatpickr-wrap formControlName="formControlName"></ng2-flatpickr-wrap>
```

Overwrite the default flatpickr properties by inputting any of the flatpickr options: https://chmln.github.io/flatpickr/options/

```javascript
import { FlatpickrOptions } from 'ng2-flatpickr-wrap';

let exampleOptions: FlatpickrOptions = {
  defaultDate: '2017-03-15'
};

<ng2-flatpickr-wrap [config]="exampleOptions" formControlName="formControlName"></ng2-flatpickr-wrap>
```

Add locale to the options

```javascript
import { FlatpickrOptions } from 'ng2-flatpickr-wrap';
import Persian from 'flatpickr-wrap/dist/l10n/fa.js';

let exampleOptions: FlatpickrOptions = {
  locale: Persian.ru,
  ...
};

<ng2-flatpickr-wrap [config]="exampleOptions" formControlName="formControlName"></ng2-flatpickr-wrap>
```

Set a placeholder for the input:

```javascript
<ng2-flatpickr-wrap placeholder="Pick a date!" formControlName="formControlName"></ng2-flatpickr-wrap>
```

Set a date using a string or a date object:

```javascript
let randomDateString = '1988-09-19';
let randomDateObject = new Date( 1234567891011 );

<ng2-flatpickr-wrap [setDate]="randomDateString" formControlName="formControlName"></ng2-flatpickr-wrap>
<ng2-flatpickr-wrap [setDate]="randomDateObject" formControlName="formControlName"></ng2-flatpickr-wrap>

```

Flatpickr css needs to be loaded separately. when using `@angular/cli`, load it in `angular.json`.

```javascript
"styles": [
  "node_modules/flatpickr-wrap/dist/flatpickr.min.css"
]
```
