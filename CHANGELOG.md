<a name="0.5.3"></a>
# [0.5.3]((https://github.com/swiety85/angular2gridster/compare/0.5.2...0.5.3)) (2017-05-16)


### Bug Fixes

* **drag-drop:** DnD ngOnInit gridster-item bug fix
* **api:** AOT fix for mismatching signature call

### Features

* **config:** Dynamic widthHeightRatio option change



<a name="0.5.2"></a>
# [0.5.2]((https://github.com/swiety85/angular2gridster/compare/0.5.1...0.5.2)) (2017-04-30)


### Bug Fixes

* **drag-drop:** item dragging position fix

### Features

* **doc** add System.js installation steps
* **demo** add polyfills to support older IE



<a name="0.5.1"></a>
# [0.5.1]((https://github.com/swiety85/angular2gridster/compare/0.5.0...0.5.1)) (2017-04-18)


### Bug Fixes

* **api:** fix two way binding and change event for "x", "y", "w", "h"


### Features

* **performance** Prevent detectChanges to be invoked while dragging
* **performance** Prevent detectChanges to be invoked while scrolling



<a name="0.5.0"></a>
# [0.5.0]((https://github.com/swiety85/angular2gridster/compare/0.4.1...0.5.0)) (2017-04-12)


### Bug Fixes

* **api:** fix two way binding and change event for "x" and "y"


### Features

* **resize** provide way to resize widgets by drag by every edge or corner
* **api** generate most suitable widget positions (x, y) if not given
* **api** provide two way binding and change event for "w" and "h"
* **config:** enable/disable drag n drop
* **config:** enable/disable resize
* **demo:** update demo to show resize
* **demo:** update demo to disable/enable dragging and resizing
* **demo:** update demo to push new widget without defined position



<a name="0.4.1"></a>
# [0.4.1]((https://github.com/swiety85/angular2gridster/compare/0.4.0...0.4.1)) (2017-04-01)


### Bug Fixes

* **api:** add missing dependecies


### Features

* **deps:** Add support for Angular 4



<a name="0.4.0"></a>
# [0.4.0]((https://github.com/swiety85/angular2gridster/compare/0.3.1...0.4.0)) (2017-03-20)


### Bug Fixes

* **css:** fix problem with drag and scroll on touch devieces
* **build:** recreate build env from scratch


### Features

* **drag-drop** provide directive that allows to add new widget to dashboard by dragging from outside
* **demo:** create Angular CLI demo 
* **demo:** extend demo to show drag widgets from outside
* **drag-drop:** reimplement drag n drop engine
* **api:** refactor API of gridster.service
* **api:** refactor API of gridster.component
* **api:** refactor API of gridser.item.component



<a name="0.3.1"></a>
# [0.3.1]((https://github.com/swiety85/angular2gridster/compare/0.3.0...0.3.1)) (2017-01-24)


### Bug Fixes

* **api** move IGridsterOptions and IGridsterDraggableOptions to separate files, closes [#9](https://github.com/swiety85/angular2gridster/issues/9)


<a name="0.3.0"></a>
# [0.3.0]((https://github.com/swiety85/angular2gridster/compare/0.2.3...0.3.0)) (2017-01-24)


### Bug Fixes

* **css:** move css of position-highlight outside of gridster component
* **css:** move inner item styles outside of gridster components
* **css:** fix position-highlight styles
* **demo:** fix demo styles
* **drag-drop:** fix problem of wrong mouse position when dragging and scrolling at once
* **api:** replace IGridListItem with GridsterItemComponent
* **api:** add isDragging property to GridsterItemComponent with class binding in template, instead of manipulating DOM
* **api:** remove GridList cloneItems method

### Features

* **config:** add possibility to set gridster draggable options from outside
* **config:** gridsterPositionChange Event Emmiter
* **config:** gridster item x,y two way databind
* **config:** add/remove gridster item
* **css:** set dynamic gridster container width and height set by service



<a name="0.2.3"></a>
# [0.2.3]((https://github.com/swiety85/angular2gridster/compare/0.2.2...0.2.3)) (2016-12-21)


### Bug Fixes

* **build:** fix demo - webpack server reload
* **deps:** fix issue with IGridsterOptions not found (https://github.com/swiety85/angular2gridster/issues/4)
* **config:** fix gridster item resize after position change



<a name="0.2.2"></a>
# [0.2.2](https://github.com/swiety85/angular2gridster/compare/0.2.0...0.2.2) (2016-12-11)


### Bug Fixes

* **build:** remove old Angular CLI dependencies in package.json
* **build:** fixes for build process

### Features

* **config:** add possibility to dynamically change gridster item size
* **config:** add possibility to dynamically change gridster configuration
* **demo:** add option to change size of gridster items
* **demo:** add option to change gridster direction (floating): vertical/horizontal
* **demo:** add option to change amount of gridster lines



<a name="0.2.0"></a>
# 0.2.0 (2016-12-03)


### Features

* **build:** Angular CLI build was replaced with custom webpack build
* **demo:** create demo app component 