import { OnInit, ElementRef, EventEmitter, SimpleChanges, OnChanges, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { GridsterService } from '../gridster.service';
import { GridListItem } from '../gridList/GridListItem';
export declare class GridsterItemComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    private zone;
    x: number;
    xChange: EventEmitter<number>;
    y: number;
    yChange: EventEmitter<number>;
    xSm: number;
    xSmChange: EventEmitter<number>;
    ySm: number;
    ySmChange: EventEmitter<number>;
    xMd: number;
    xMdChange: EventEmitter<number>;
    yMd: number;
    yMdChange: EventEmitter<number>;
    xLg: number;
    xLgChange: EventEmitter<number>;
    yLg: number;
    yLgChange: EventEmitter<number>;
    xXl: number;
    xXlChange: EventEmitter<number>;
    yXl: number;
    yXlChange: EventEmitter<number>;
    w: number;
    wChange: EventEmitter<number>;
    h: number;
    hChange: EventEmitter<number>;
    wSm: number;
    wSmChange: EventEmitter<number>;
    hSm: number;
    hSmChange: EventEmitter<number>;
    wMd: number;
    wMdChange: EventEmitter<number>;
    hMd: number;
    hMdChange: EventEmitter<number>;
    wLg: number;
    wLgChange: EventEmitter<number>;
    hLg: number;
    hLgChange: EventEmitter<number>;
    wXl: number;
    wXlChange: EventEmitter<number>;
    hXl: number;
    hXlChange: EventEmitter<number>;
    change: EventEmitter<any>;
    start: EventEmitter<any>;
    end: EventEmitter<any>;
    dragAndDrop: boolean;
    resizable: boolean;
    options: any;
    variableHeight: boolean;
    contentWrapper: ElementRef;
    autoSize: boolean;
    isDragging: boolean;
    isResizing: boolean;
    $element: HTMLElement;
    elementRef: ElementRef;
    /**
     * Gridster provider service
     */
    gridster: GridsterService;
    item: GridListItem;
    set positionX(value: number);
    get positionX(): number;
    set positionY(value: number);
    get positionY(): number;
    private _positionX;
    private _positionY;
    private defaultOptions;
    private subscriptions;
    private dragSubscriptions;
    private resizeSubscriptions;
    constructor(zone: NgZone, elementRef: ElementRef, gridster: GridsterService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    updateElemenetPosition(): void;
    setPositionsOnItem(): void;
    enableResizable(): void;
    disableResizable(): void;
    enableDragDrop(): void;
    disableDraggable(): void;
    private getResizeHandlers;
    private getDraggableOptions;
    private getResizableOptions;
    private hasResizableHandle;
    private setPositionsForGrid;
    private findPosition;
    private createResizeStartObject;
    private onEnd;
    private onStart;
    /**
     * Assign class for short while to prevent animation of grid item component
     */
    private preventAnimation;
    private getResizeDirection;
    private resizeElement;
    private resizeToNorth;
    private resizeToWest;
    private resizeToEast;
    private resizeToSouth;
    private setMinHeight;
    private setMinWidth;
    private setMaxHeight;
    private setMaxWidth;
}
