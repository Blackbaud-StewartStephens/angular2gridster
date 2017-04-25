# angular2gridster
[![npm version](https://badge.fury.io/js/angular2gridster.svg)](https://badge.fury.io/js/angular2gridster)

Angular 2 implementation of well known Gridster (no jQuery, no external libraries, only Angular2 and Rx.js). [Demo](https://swiety85.github.io/angular2gridster/).

1. [Getting started](https://github.com/swiety85/angular2gridster/wiki/Getting-started)
2. [What is Angular2gridster and why to use it?](https://github.com/swiety85/angular2gridster/wiki) 
3. [API Documentation](https://github.com/swiety85/angular2gridster/wiki/API-Documentation)
4. [Roadmap](https://github.com/swiety85/angular2gridster/wiki/Roadmap)

More comprehensive documentation is available in [Wiki](https://github.com/swiety85/angular2gridster/wiki).

## Installation
```shell
npm install angular2gridster
```
Once installed you need to import our module:

```js
...
import { GridsterModule } from 'angular2gridster';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...
    GridsterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
The example it imports in AppModule, but it could also be imported in any other module - depends where you want to use it.

## Example usage

```html
<gridster [options]="gridsterOptions" [draggableOptions]="{ handlerClass: 'panel-heading' }">

  <gridster-item *ngFor="let widget of widgets" 
                 [(x)]="widget.x" [(y)]="widget.y" [(w)]="widget.w" [(h)]="widget.h">
      <!--some content-->
  </gridster-item>

</gridster>
```

```js
widgets: Array<any> = [...];
gridsterOptions = {
  lanes: 5, // how many lines (grid cells) dashboard has
  direction: 'vertical', // items floating direction: vertical/horizontal
  dragAndDrop: true, // possible to change items position by drag n drop
  resizable: true // possible to resize items by drag n drop by item edge/corner
};
```

## Demo

Clone or download this repository. Demo folder is dedicated nester project build on Angular CLI. To run:

```shell
    cd demo
    npm install
    ng serve
```

Go to: http://localhost:4200/

## Compilation problems
If somebody will have compilation problems please add an issue (if not yet created). I will try to fix it as soon as possible.
Angular compiler has still some issues opened that can be a problem to you this module in your project. If so please,
as a temporary solution copy files from /src folder to dedicated folder in your project.

## Issues

If the current behavior is a bug or you can illustrate your feature request better with an example, 
please provide the steps to reproduce and if possible a minimal demo of the problem via plnkr (http://plnkr.co/edit/4pGyURZVVrL6MONXc8A0?p=preview).
The project is in development so don't hesitate to writte any questions or suggestion on issue list.
I look forward to get response from you.

## Origin

This project was created on idea of [GridList](https://github.com/hootsuite/grid). Great alternative for Gridster.