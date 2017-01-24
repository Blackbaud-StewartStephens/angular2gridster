# angular2gridster
[![npm version](https://badge.fury.io/js/angular2gridster.svg)](https://badge.fury.io/js/angular2gridster)

Angular 2 implementation of well known Gridster (no jQuery, no external libraries, only Angular2 and Rx.js). [Demo](https://swiety85.github.io/angular2gridster/).

## Installation
```shell
npm install angular2gridster
```  
Once installed you need to import our module:
```js
    import {GridsterModule} from 'angular2gridster';

    @NgModule({
      declarations: [AppComponent, ...],
      imports: [GridsterModule, ...],  
      bootstrap: [AppComponent]
    })
    export class AppModule {
    }
```
## Example usage

```html
    <gridster [options]="gridsterConfig">
        <gridster-item *ngFor="let widget of widgets" [x]="widget.x" [y]="widget.y" [w]="widget.w" [h]="widget.h">
            ...
        </gridster-item>
    </gridster>
```

```js
gridsterConfig:IGridsterOptions = {
    lanes: 5,
    direction: 'vertical',
    dragAndDrop: true
};
```

## Demo

Clone or download this repository. Next run:

```shell
    npm install
    npm run server
```

Go to: http://localhost:3000/

## Issues

If the current behavior is a bug or you can illustrate your feature request better with an example, 
please provide the steps to reproduce and if possible a minimal demo of the problem via plnkr (http://plnkr.co/edit/4pGyURZVVrL6MONXc8A0?p=preview)