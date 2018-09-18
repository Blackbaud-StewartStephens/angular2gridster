import { Observable } from 'rxjs';
import { share, map, filter, tap, switchMap, takeUntil, take, skip } from 'rxjs/operators';
import { DraggableEvent } from './DraggableEvent';
import { utils } from './utils';
export class Draggable {
    constructor(element, config = {}) {
        this.mousemove = Observable.merge(Observable.fromEvent(document, 'mousemove'), Observable.fromEvent(document, 'touchmove', { passive: false })).pipe(share());
        this.mouseup = Observable.merge(Observable.fromEvent(document, 'mouseup'), Observable.fromEvent(document, 'touchend'), Observable.fromEvent(document, 'touchcancel')).pipe(share());
        this.config = {
            handlerClass: null,
            scroll: true,
            scrollEdge: 36,
            scrollDirection: null
        };
        // reference to auto scrolling listeners
        this.autoScrollingInterval = [];
        this.element = element;
        this.mousedown = Observable.merge(Observable.fromEvent(element, 'mousedown'), Observable.fromEvent(element, 'touchstart')).pipe(share());
        this.config = Object.assign({}, this.config, config);
        this.dragStart = this.createDragStartObservable().pipe(share());
        this.dragMove = this.createDragMoveObservable(this.dragStart);
        this.dragStop = this.createDragStopObservable(this.dragStart);
        this.fixProblemWithDnDForIE(element);
        this.requestAnimationFrame = window.requestAnimationFrame || ((callback) => setTimeout(callback, 1000 / 60));
        this.cancelAnimationFrame = window.cancelAnimationFrame || ((cafID) => clearTimeout(cafID));
    }
    createDragStartObservable() {
        return this.mousedown.pipe(map(md => new DraggableEvent(md)), filter((event) => this.isDragingByHandler(event)), tap((e) => {
            if (!e.isTouchEvent()) {
                e.pauseEvent();
            }
            if (document.activeElement) {
                document.activeElement.blur();
            }
            // prevents rendering performance issues while dragging item with selection inside
            utils.clearSelection();
        }), switchMap((startEvent) => {
            return this.mousemove.pipe(map(mm => new DraggableEvent(mm)), filter((moveEvent) => this.inRange(startEvent, moveEvent, 5)), map(() => startEvent), takeUntil(this.mouseup), take(1));
        }));
    }
    createDragMoveObservable(dragStart) {
        return dragStart.pipe(tap((event) => {
            this.addTouchActionNone(event.target);
        }), switchMap((startEvent) => {
            return this.mousemove.pipe(skip(1), map(mm => new DraggableEvent(mm)), tap((event) => {
                event.pauseEvent();
                startEvent.pauseEvent();
            }), takeUntil(this.mouseup));
        }), filter(val => !!val), tap((event) => {
            if (this.config.scroll) {
                this.startScroll(this.element, event);
            }
        }));
    }
    createDragStopObservable(dragStart) {
        return dragStart.pipe(switchMap(() => {
            return this.mouseup.pipe(take(1));
        }), map(e => new DraggableEvent(e)), tap((e) => {
            this.removeTouchActionNone(e.target);
            this.autoScrollingInterval.forEach(raf => this.cancelAnimationFrame(raf));
        }));
    }
    startScroll(item, event) {
        const scrollContainer = this.getScrollContainer(item);
        this.autoScrollingInterval.forEach(raf => this.cancelAnimationFrame(raf));
        if (scrollContainer) {
            this.startScrollForContainer(event, scrollContainer);
        }
        else {
            this.startScrollForWindow(event);
        }
    }
    startScrollForContainer(event, scrollContainer) {
        if (!this.config.scrollDirection || this.config.scrollDirection === 'vertical') {
            this.startScrollVerticallyForContainer(event, scrollContainer);
        }
        if (!this.config.scrollDirection || this.config.scrollDirection === 'horizontal') {
            this.startScrollHorizontallyForContainer(event, scrollContainer);
        }
    }
    startScrollVerticallyForContainer(event, scrollContainer) {
        if (event.pageY - this.getOffset(scrollContainer).top < this.config.scrollEdge) {
            this.startAutoScrolling(scrollContainer, -Draggable.SCROLL_SPEED, 'scrollTop');
        }
        else if ((this.getOffset(scrollContainer).top + scrollContainer.getBoundingClientRect().height) -
            event.pageY < this.config.scrollEdge) {
            this.startAutoScrolling(scrollContainer, Draggable.SCROLL_SPEED, 'scrollTop');
        }
    }
    startScrollHorizontallyForContainer(event, scrollContainer) {
        if (event.pageX - scrollContainer.getBoundingClientRect().left < this.config.scrollEdge) {
            this.startAutoScrolling(scrollContainer, -Draggable.SCROLL_SPEED, 'scrollLeft');
        }
        else if ((this.getOffset(scrollContainer).left + scrollContainer.getBoundingClientRect().width) -
            event.pageX < this.config.scrollEdge) {
            this.startAutoScrolling(scrollContainer, Draggable.SCROLL_SPEED, 'scrollLeft');
        }
    }
    startScrollForWindow(event) {
        if (!this.config.scrollDirection || this.config.scrollDirection === 'vertical') {
            this.startScrollVerticallyForWindow(event);
        }
        if (!this.config.scrollDirection || this.config.scrollDirection === 'horizontal') {
            this.startScrollHorizontallyForWindow(event);
        }
    }
    startScrollVerticallyForWindow(event) {
        const scrollingElement = document.scrollingElement || document.documentElement || document.body;
        // NOTE: Using `window.pageYOffset` here because IE doesn't have `window.scrollY`.
        if ((event.pageY - window.pageYOffset) < this.config.scrollEdge) {
            this.startAutoScrolling(scrollingElement, -Draggable.SCROLL_SPEED, 'scrollTop');
        }
        else if ((window.innerHeight - (event.pageY - window.pageYOffset)) < this.config.scrollEdge) {
            this.startAutoScrolling(scrollingElement, Draggable.SCROLL_SPEED, 'scrollTop');
        }
    }
    startScrollHorizontallyForWindow(event) {
        const scrollingElement = document.scrollingElement || document.documentElement || document.body;
        // NOTE: Using `window.pageXOffset` here because IE doesn't have `window.scrollX`.
        if ((event.pageX - window.pageXOffset) < this.config.scrollEdge) {
            this.startAutoScrolling(scrollingElement, -Draggable.SCROLL_SPEED, 'scrollLeft');
        }
        else if ((window.innerWidth - (event.pageX - window.pageXOffset)) < this.config.scrollEdge) {
            this.startAutoScrolling(scrollingElement, Draggable.SCROLL_SPEED, 'scrollLeft');
        }
    }
    getScrollContainer(node) {
        const nodeOuterHeight = utils.getElementOuterHeight(node);
        if (node.scrollHeight > Math.ceil(nodeOuterHeight)) {
            return node;
        }
        if (!(new RegExp('(body|html)', 'i')).test(node.parentNode.tagName)) {
            return this.getScrollContainer(node.parentNode);
        }
        return null;
    }
    startAutoScrolling(node, amount, direction) {
        this.autoScrollingInterval.push(this.requestAnimationFrame(function () {
            this.startAutoScrolling(node, amount, direction);
        }.bind(this)));
        return node[direction] += (amount * 0.25);
    }
    getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + this.getScroll('scrollLeft', 'pageXOffset'),
            top: rect.top + this.getScroll('scrollTop', 'pageYOffset')
        };
    }
    getScroll(scrollProp, offsetProp) {
        if (typeof window[offsetProp] !== 'undefined') {
            return window[offsetProp];
        }
        if (document.documentElement.clientHeight) {
            return document.documentElement[scrollProp];
        }
        return document.body[scrollProp];
    }
    isDragingByHandler(event) {
        if (!this.isValidDragHandler(event.target)) {
            return false;
        }
        return !this.config.handlerClass ||
            (this.config.handlerClass && this.hasElementWithClass(this.config.handlerClass, event.target));
    }
    isValidDragHandler(targetEl) {
        return ['input', 'textarea'].indexOf(targetEl.tagName.toLowerCase()) === -1;
    }
    inRange(startEvent, moveEvent, range) {
        return Math.abs(moveEvent.clientX - startEvent.clientX) > range ||
            Math.abs(moveEvent.clientY - startEvent.clientY) > range;
    }
    hasElementWithClass(className, target) {
        while (target !== this.element) {
            if (target.classList.contains(className)) {
                return true;
            }
            target = target.parentElement;
        }
        return false;
    }
    pauseEvent(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.cancelBubble = true;
        e.returnValue = false;
    }
    fixProblemWithDnDForIE(element) {
        if (this.isTouchDevice() && this.isIEorEdge()) {
            element.style['touch-action'] = 'none';
        }
    }
    removeTouchActionNone(element) {
        element.style['touch-action'] = '';
    }
    addTouchActionNone(element) {
        element.style['touch-action'] = 'none';
    }
    isTouchDevice() {
        return 'ontouchstart' in window // works on most browsers
            || navigator.maxTouchPoints; // works on IE10/11 and Surface
    }
    isIEorEdge() {
        const ua = window.navigator.userAgent;
        const msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }
        const trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            const rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        const edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }
        // other browser
        return false;
    }
}
Draggable.SCROLL_SPEED = 20;
//# sourceMappingURL=draggable.js.map