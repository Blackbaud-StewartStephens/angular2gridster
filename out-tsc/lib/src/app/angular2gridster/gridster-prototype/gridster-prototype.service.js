import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, switchMap, map, scan, filter, share, tap } from 'rxjs/operators';
import { utils } from '../utils/utils';
let GridsterPrototypeService = class GridsterPrototypeService {
    constructor() {
        this.isDragging = false;
        this.dragSubject = new Subject();
        this.dragStartSubject = new Subject();
        this.dragStopSubject = new Subject();
    }
    observeDropOver(gridster) {
        return this.dragStopSubject.pipe(filter((data) => {
            const gridsterEl = gridster.gridsterComponent.$element;
            const isOverNestedGridster = [].slice.call(gridsterEl.querySelectorAll('gridster'))
                .reduce((isOverGridster, nestedGridsterEl) => {
                return isOverGridster ||
                    this.isOverGridster(data.item, nestedGridsterEl, data.event, gridster.options);
            }, false);
            if (isOverNestedGridster) {
                return false;
            }
            return this.isOverGridster(data.item, gridsterEl, data.event, gridster.options);
        }), tap((data) => {
            // TODO: what we should provide as a param?
            // prototype.drop.emit({item: prototype.item});
            data.item.onDrop(gridster);
        }));
    }
    observeDropOut(gridster) {
        return this.dragStopSubject.pipe(filter((data) => {
            const gridsterEl = gridster.gridsterComponent.$element;
            return !this.isOverGridster(data.item, gridsterEl, data.event, gridster.options);
        }), tap((data) => {
            // TODO: what we should provide as a param?
            data.item.onCancel();
        }));
    }
    observeDragOver(gridster) {
        const over = this.dragSubject.pipe(map((data) => {
            const gridsterEl = gridster.gridsterComponent.$element;
            return {
                item: data.item,
                event: data.event,
                isOver: this.isOverGridster(data.item, gridsterEl, data.event, gridster.options),
                isDrop: false
            };
        }));
        const drop = this.dragStopSubject.pipe(map((data) => {
            const gridsterEl = gridster.gridsterComponent.$element;
            return {
                item: data.item,
                event: data.event,
                isOver: this.isOverGridster(data.item, gridsterEl, data.event, gridster.options),
                isDrop: true
            };
        }));
        const dragExt = Observable.merge(
        // dragStartSubject is connected in case when item prototype is placed above gridster
        // and drag enter is not fired
        this.dragStartSubject.pipe(map(() => ({ item: null, isOver: false, isDrop: false }))), over, drop).pipe(scan((prev, next) => {
            return {
                item: next.item,
                event: next.event,
                isOver: next.isOver,
                isEnter: prev.isOver === false && next.isOver === true,
                isOut: prev.isOver === true && next.isOver === false && !prev.isDrop,
                isDrop: next.isDrop
            };
        }), filter((data) => {
            return !data.isDrop;
        }), share());
        const dragEnter = this.createDragEnterObservable(dragExt, gridster);
        const dragOut = this.createDragOutObservable(dragExt, gridster);
        const dragOver = dragEnter
            .pipe(switchMap(() => this.dragSubject.pipe(takeUntil(dragOut))), map((data) => data.item));
        return { dragEnter, dragOut, dragOver };
    }
    dragItemStart(item, event) {
        this.isDragging = true;
        this.dragStartSubject.next({ item, event });
    }
    dragItemStop(item, event) {
        this.isDragging = false;
        this.dragStopSubject.next({ item, event });
    }
    updatePrototypePosition(item, event) {
        this.dragSubject.next({ item, event });
    }
    /**
     * Creates observable that is fired on dragging over gridster container.
     */
    createDragOverObservable(dragIsOver, gridster) {
        return dragIsOver.pipe(filter((data) => data.isOver && !data.isEnter && !data.isOut), map((data) => data.item), tap((item) => item.onOver(gridster)));
    }
    /**
     * Creates observable that is fired on drag enter gridster container.
     */
    createDragEnterObservable(dragIsOver, gridster) {
        return dragIsOver.pipe(filter((data) => data.isEnter), map((data) => data.item), tap((item) => item.onEnter(gridster)));
    }
    /**
     * Creates observable that is fired on drag out gridster container.
     */
    createDragOutObservable(dragIsOver, gridster) {
        return dragIsOver.pipe(filter((data) => data.isOut), map((data) => data.item), tap((item) => item.onOut(gridster)));
    }
    /**
     * Checks whether "element" position fits inside "containerEl" position.
     * It checks if "element" is totally covered by "containerEl" area.
     */
    isOverGridster(item, gridsterEl, event, options) {
        const el = item.$element;
        const parentItem = gridsterEl.parentElement &&
            gridsterEl.parentElement.closest('gridster-item');
        if (parentItem) {
            return this.isOverGridster(item, parentItem, event, options);
        }
        switch (options.tolerance) {
            case 'fit':
                return utils.isElementFitContainer(el, gridsterEl);
            case 'intersect':
                return utils.isElementIntersectContainer(el, gridsterEl);
            case 'touch':
                return utils.isElementTouchContainer(el, gridsterEl);
            default:
                return utils.isCursorAboveElement(event, gridsterEl);
        }
    }
};
GridsterPrototypeService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], GridsterPrototypeService);
export { GridsterPrototypeService };
//# sourceMappingURL=gridster-prototype.service.js.map