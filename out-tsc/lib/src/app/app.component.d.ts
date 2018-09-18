import { OnInit } from '@angular/core';
import { GridsterComponent } from './angular2gridster/gridster.component';
import { IGridsterOptions } from './angular2gridster/IGridsterOptions';
import { IGridsterDraggableOptions } from './angular2gridster/IGridsterDraggableOptions';
export declare class AppComponent implements OnInit {
    static X_PROPERTY_MAP: any;
    static Y_PROPERTY_MAP: any;
    static W_PROPERTY_MAP: any;
    static H_PROPERTY_MAP: any;
    gridster: GridsterComponent;
    itemOptions: {
        maxWidth: number;
        maxHeight: number;
    };
    gridsterOptions: IGridsterOptions;
    gridsterDraggableOptions: IGridsterDraggableOptions;
    title: string;
    widgetsCopy: any[];
    widgets: Array<any>;
    ngOnInit(): void;
    onReflow(event: any): void;
    removeLine(gridster: GridsterComponent): void;
    getTitle(): string;
    addLine(gridster: GridsterComponent): void;
    setWidth(widget: any, size: number, e: MouseEvent, gridster: any): boolean;
    setHeight(widget: any, size: number, e: MouseEvent, gridster: any): boolean;
    optionsChange(options: IGridsterOptions): void;
    swap(): void;
    addWidgetFromDrag(gridster: GridsterComponent, event: any): void;
    over(event: any): void;
    out(event: any): void;
    addWidgetWithoutData(): void;
    addWidget(gridster: GridsterComponent): void;
    remove($event: any, index: number, gridster: GridsterComponent): void;
    removeAllWidgets(): void;
    itemChange($event: any, gridster: any): void;
    resetWidgets(): void;
}
