import * as tslib_1 from "tslib";
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { GridsterComponent } from './angular2gridster/gridster.component';
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.itemOptions = {
            maxWidth: 3,
            maxHeight: 4
        };
        this.gridsterOptions = {
            // core configuration is default one - for smallest view. It has hidden minWidth: 0.
            lanes: 2,
            direction: 'vertical',
            floating: true,
            dragAndDrop: true,
            resizable: true,
            resizeHandles: {
                s: true,
                e: true,
                se: true
            },
            widthHeightRatio: 1,
            lines: {
                visible: true,
                color: '#afafaf',
                width: 2
            },
            shrink: true,
            useCSSTransforms: true,
            responsiveView: true,
            responsiveDebounce: 500,
            responsiveSizes: true,
            // List of different gridster configurations for different breakpoints.
            // Each breakpoint is defined by name stored in "breakpoint" property. There is fixed set of breakpoints
            // available to use with default minWidth assign to each.
            // - sm: 576 - Small devices
            // - md: 768 - Medium devices
            // - lg: 992 - Large devices
            // - xl: 1200 - Extra large
            // MinWidth for each breakpoint can be overwritten like it's visible below.
            // ResponsiveOptions can overwrite default configuration with any option available.
            responsiveOptions: [
                {
                    breakpoint: 'sm',
                    // minWidth: 480,
                    lanes: 3
                },
                {
                    breakpoint: 'md',
                    minWidth: 768,
                    lanes: 4
                },
                {
                    breakpoint: 'lg',
                    minWidth: 1250,
                    lanes: 6
                },
                {
                    breakpoint: 'xl',
                    minWidth: 1800,
                    lanes: 8
                }
            ]
        };
        this.gridsterDraggableOptions = {
            handlerClass: 'panel-heading'
        };
        this.title = 'Angular2Gridster';
        this.widgetsCopy = [];
        this.widgets = [
            {
                x: 0, y: 0,
                w: 1, h: 2,
                wSm: 1, hSm: 1,
                wMd: 1, hMd: 2,
                wLg: 1, hLg: 1,
                wXl: 2, hXl: 2,
                dragAndDrop: true,
                resizable: true,
                title: 'Basic form inputs 1',
                variableHeight: false,
                contents: []
            },
            {
                x: 1, y: 0,
                w: 1, h: 2,
                wSm: 2, hSm: 1,
                wMd: 2, hMd: 1,
                wLg: 3, hLg: 1,
                wXl: 3, hXl: 1,
                dragAndDrop: true,
                resizable: true,
                title: 'Basic form inputs 2',
                variableHeight: false,
                contents: []
            },
            {
                x: 1, y: 1,
                w: 2, h: 1,
                wSm: 1, hSm: 2,
                wMd: 1, hMd: 2,
                wLg: 2, hLg: 1,
                wXl: 3, hXl: 1,
                dragAndDrop: true,
                resizable: true,
                title: 'Basic form inputs 3',
                variableHeight: true,
                contents: []
            },
            {
                x: 3, y: 1,
                w: 1, h: 2,
                wSm: 1, hSm: 2,
                wMd: 1, hMd: 2,
                wLg: 3, hLg: 1,
                wXl: 3, hXl: 1,
                dragAndDrop: true,
                resizable: true,
                title: 'Basic form inputs 4',
                contents: []
            },
            {
                w: 1, h: 2,
                wSm: 1, hSm: 2,
                wMd: 1, hMd: 2,
                wLg: 3, hLg: 1,
                wXl: 3, hXl: 1,
                dragAndDrop: true,
                resizable: true,
                title: 'Basic form inputs x',
                contents: []
            }
        ];
    }
    AppComponent_1 = AppComponent;
    AppComponent.prototype.ngOnInit = function () {
        this.widgetsCopy = this.widgets.map(function (widget) { return (tslib_1.__assign({}, widget)); });
    };
    AppComponent.prototype.onReflow = function (event) {
        console.log('onReflow', event);
    };
    AppComponent.prototype.removeLine = function (gridster) {
        gridster.setOption('lanes', --this.gridsterOptions.lanes)
            .reload();
    };
    AppComponent.prototype.getTitle = function () {
        return this.title;
    };
    AppComponent.prototype.addLine = function (gridster) {
        gridster.setOption('lanes', ++this.gridsterOptions.lanes)
            .reload();
    };
    AppComponent.prototype.setWidth = function (widget, size, e, gridster) {
        e.stopPropagation();
        e.preventDefault();
        if (size < 1) {
            size = 1;
        }
        widget.w = size;
        gridster.reload();
        return false;
    };
    AppComponent.prototype.setHeight = function (widget, size, e, gridster) {
        e.stopPropagation();
        e.preventDefault();
        if (size < 1) {
            size = 1;
        }
        widget.h = size;
        gridster.reload();
        return false;
    };
    AppComponent.prototype.optionsChange = function (options) {
        this.gridsterOptions = options;
        console.log('options change:', options);
    };
    AppComponent.prototype.swap = function () {
        this.widgets[0].x = 3;
        this.widgets[3].x = 0;
    };
    AppComponent.prototype.addWidgetFromDrag = function (gridster, event) {
        var item = event.item;
        var breakpoint = gridster.options.breakpoint;
        var widget = {
            dragAndDrop: true,
            resizable: true,
            title: 'New widget'
        };
        widget[AppComponent_1.W_PROPERTY_MAP[breakpoint] || 'w'] = item.w;
        widget[AppComponent_1.H_PROPERTY_MAP[breakpoint] || 'h'] = item.h;
        widget[AppComponent_1.X_PROPERTY_MAP[breakpoint] || 'x'] = item.x;
        widget[AppComponent_1.Y_PROPERTY_MAP[breakpoint] || 'y'] = item.y;
        for (var _i = 0, _a = ['wSm', 'hSm', 'wMd', 'hMd', 'wLg', 'hLg', 'wXl', 'hXl']; _i < _a.length; _i++) {
            var rwdProp = _a[_i];
            if (event.item.itemPrototype.hasOwnProperty(rwdProp)) {
                widget[rwdProp] = event.item.itemPrototype[rwdProp];
            }
        }
        this.widgets.push(widget);
        console.log('add widget from drag to:', gridster);
    };
    AppComponent.prototype.over = function (event) {
        var size = event.item.calculateSize(event.gridster);
        event.item.itemPrototype.$element.querySelector('.gridster-item-inner').style.width = size.width + 'px';
        event.item.itemPrototype.$element.querySelector('.gridster-item-inner').style.height = size.height + 'px';
        event.item.itemPrototype.$element.classList.add('is-over');
    };
    AppComponent.prototype.out = function (event) {
        event.item.itemPrototype.$element.querySelector('.gridster-item-inner').style.width = '';
        event.item.itemPrototype.$element.querySelector('.gridster-item-inner').style.height = '';
        event.item.itemPrototype.$element.classList.remove('is-over');
    };
    AppComponent.prototype.addWidgetWithoutData = function () {
        this.widgets.push({
            title: 'Basic form inputs X',
            dragAndDrop: true,
            resizable: true,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' +
                'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' +
                'commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
                'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est ' +
                'laborum.'
        });
    };
    AppComponent.prototype.addWidget = function (gridster) {
        this.widgets.push({
            x: 4, y: 0, w: 1, h: 1,
            dragAndDrop: true,
            resizable: true,
            title: 'Basic form inputs 5',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' +
                'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' +
                'commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
                'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est ' +
                'laborum.'
        });
        console.log('widget push', this.widgets[this.widgets.length - 1]);
    };
    AppComponent.prototype.remove = function ($event, index, gridster) {
        $event.preventDefault();
        this.widgets.splice(index, 1);
        console.log('widget remove', index);
    };
    AppComponent.prototype.removeAllWidgets = function () {
        this.widgets = [];
    };
    AppComponent.prototype.itemChange = function ($event, gridster) {
        console.log('item change', $event);
    };
    AppComponent.prototype.resetWidgets = function () {
        this.widgets = this.widgetsCopy.map(function (widget) { return (tslib_1.__assign({}, widget)); });
    };
    AppComponent.X_PROPERTY_MAP = {
        sm: 'xSm',
        md: 'xMd',
        lg: 'xLg',
        xl: 'xXl'
    };
    AppComponent.Y_PROPERTY_MAP = {
        sm: 'ySm',
        md: 'yMd',
        lg: 'yLg',
        xl: 'yXl'
    };
    AppComponent.W_PROPERTY_MAP = {
        sm: 'wSm',
        md: 'wMd',
        lg: 'wLg',
        xl: 'wXl'
    };
    AppComponent.H_PROPERTY_MAP = {
        sm: 'hSm',
        md: 'hMd',
        lg: 'hLg',
        xl: 'hXl'
    };
    tslib_1.__decorate([
        ViewChild(GridsterComponent),
        tslib_1.__metadata("design:type", GridsterComponent)
    ], AppComponent.prototype, "gridster", void 0);
    AppComponent = AppComponent_1 = tslib_1.__decorate([
        Component({
            selector: 'demo-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            encapsulation: ViewEncapsulation.None
        })
    ], AppComponent);
    return AppComponent;
    var AppComponent_1;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map