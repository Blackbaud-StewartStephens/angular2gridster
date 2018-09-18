export class GridListItem {
    constructor() { }
    get $element() {
        return this.getItem().$element;
    }
    get x() {
        const item = this.getItem();
        const breakpoint = item.gridster ? item.gridster.options.breakpoint : null;
        return this.getValueX(breakpoint);
    }
    set x(value) {
        const item = this.getItem();
        const breakpoint = item.gridster ? item.gridster.options.breakpoint : null;
        this.setValueX(value, breakpoint);
    }
    get y() {
        const item = this.getItem();
        const breakpoint = item.gridster ? item.gridster.options.breakpoint : null;
        return this.getValueY(breakpoint);
    }
    set y(value) {
        const item = this.getItem();
        const breakpoint = item.gridster ? item.gridster.options.breakpoint : null;
        this.setValueY(value, breakpoint);
    }
    get w() {
        const item = this.getItem();
        const breakpoint = item.gridster ? item.gridster.options.breakpoint : null;
        return this.getValueW(breakpoint);
    }
    set w(value) {
        const item = this.getItem();
        const breakpoint = item.gridster ? item.gridster.options.breakpoint : null;
        this.setValueW(value, breakpoint);
    }
    get h() {
        const item = this.getItem();
        const breakpoint = item.gridster ? item.gridster.options.breakpoint : null;
        return this.getValueH(breakpoint);
    }
    set h(value) {
        const item = this.getItem();
        const breakpoint = item.gridster ? item.gridster.options.breakpoint : null;
        this.setValueH(value, breakpoint);
    }
    get autoSize() {
        return this.getItem().autoSize;
    }
    set autoSize(value) {
        this.getItem().autoSize = value;
    }
    get dragAndDrop() {
        return !!this.getItem().dragAndDrop;
    }
    get resizable() {
        return !!this.getItem().resizable;
    }
    get positionX() {
        const item = this.itemComponent || this.itemPrototype;
        if (!item) {
            return null;
        }
        return item.positionX;
    }
    get positionY() {
        const item = this.itemComponent || this.itemPrototype;
        if (!item) {
            return null;
        }
        return item.positionY;
    }
    get variableHeight() {
        return this.getItem().variableHeight;
    }
    get contentHeight() {
        const contentHeight = this.itemComponent.contentWrapper.nativeElement.offsetheight || 0;
        const childHeight = this.$element.firstChild.offsetHeight || 0;
        return Math.max(contentHeight, childHeight);
    }
    setFromGridsterItem(item) {
        if (this.isItemSet()) {
            throw new Error('GridListItem is already set.');
        }
        this.itemComponent = item;
        return this;
    }
    setFromGridsterItemPrototype(item) {
        if (this.isItemSet()) {
            throw new Error('GridListItem is already set.');
        }
        this.itemPrototype = item;
        return this;
    }
    setFromObjectLiteral(item) {
        if (this.isItemSet()) {
            throw new Error('GridListItem is already set.');
        }
        this.itemObject = item;
        return this;
    }
    copy() {
        const itemCopy = new GridListItem();
        return itemCopy.setFromObjectLiteral({
            $element: this.$element,
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
            autoSize: this.autoSize,
            dragAndDrop: this.dragAndDrop,
            resizable: this.resizable
        });
    }
    copyForBreakpoint(breakpoint) {
        const itemCopy = new GridListItem();
        return itemCopy.setFromObjectLiteral({
            $element: this.$element,
            x: this.getValueX(breakpoint),
            y: this.getValueY(breakpoint),
            w: this.getValueW(breakpoint),
            h: this.getValueH(breakpoint),
            autoSize: this.autoSize,
            dragAndDrop: this.dragAndDrop,
            resizable: this.resizable
        });
    }
    getValueX(breakpoint) {
        const item = this.getItem();
        return item[this.getXProperty(breakpoint)];
    }
    getValueY(breakpoint) {
        const item = this.getItem();
        return item[this.getYProperty(breakpoint)];
    }
    getValueW(breakpoint) {
        const item = this.getItem();
        return item[this.getWProperty(breakpoint)] || 1;
    }
    getValueH(breakpoint) {
        const item = this.getItem();
        return item[this.getHProperty(breakpoint)] || 1;
    }
    setValueX(value, breakpoint) {
        const item = this.getItem();
        item[this.getXProperty(breakpoint)] = value;
    }
    setValueY(value, breakpoint) {
        const item = this.getItem();
        item[this.getYProperty(breakpoint)] = value;
    }
    setValueW(value, breakpoint) {
        const item = this.getItem();
        item[this.getWProperty(breakpoint)] = value;
    }
    setValueH(value, breakpoint) {
        const item = this.getItem();
        item[this.getHProperty(breakpoint)] = value;
    }
    triggerChangeX(breakpoint) {
        const item = this.itemComponent;
        if (item) {
            item[this.getXProperty(breakpoint) + 'Change'].emit(this.getValueX(breakpoint));
        }
    }
    triggerChangeY(breakpoint) {
        const item = this.itemComponent;
        if (item) {
            item[this.getYProperty(breakpoint) + 'Change'].emit(this.getValueY(breakpoint));
        }
    }
    triggerChangeW(breakpoint) {
        const item = this.itemComponent;
        if (item) {
            item[this.getWProperty(breakpoint) + 'Change'].emit(this.getValueW(breakpoint));
        }
    }
    triggerChangeH(breakpoint) {
        const item = this.itemComponent;
        if (item) {
            item[this.getHProperty(breakpoint) + 'Change'].emit(this.getValueH(breakpoint));
        }
    }
    hasPositions(breakpoint) {
        const x = this.getValueX(breakpoint);
        const y = this.getValueY(breakpoint);
        return (x || x === 0) && (y || y === 0);
    }
    applyPosition(gridster) {
        const position = this.calculatePosition(gridster);
        this.itemComponent.positionX = position.left;
        this.itemComponent.positionY = position.top;
        this.itemComponent.updateElemenetPosition();
    }
    calculatePosition(gridster) {
        if (!gridster && !this.itemComponent) {
            return { left: 0, top: 0 };
        }
        gridster = gridster || this.itemComponent.gridster;
        let top;
        if (gridster.gridList) {
            const rowHeights = gridster.getRowHeights();
            const rowTops = gridster.getRowTops(rowHeights);
            top = rowTops[this.y];
        }
        else {
            top = this.y * gridster.cellHeight;
        }
        return {
            left: this.x * gridster.cellWidth,
            top: top
        };
    }
    applySize(gridster) {
        const size = this.calculateSize(gridster);
        this.$element.style.width = size.width + 'px';
        this.$element.style.height = size.height + 'px';
    }
    calculateSize(gridster) {
        if (!gridster && !this.itemComponent) {
            return { width: 0, height: 0 };
        }
        gridster = gridster || this.itemComponent.gridster;
        let rowHeights, rowTops;
        if (gridster.gridList) {
            rowHeights = gridster.getRowHeights();
            rowTops = gridster.getRowTops(rowHeights);
        }
        let width = this.w;
        let height = this.h;
        if (gridster.options.direction === 'vertical') {
            width = Math.min(width, gridster.options.lanes);
        }
        if (gridster.options.direction === 'horizontal') {
            height = Math.min(height, gridster.options.lanes);
        }
        let pixelHeight;
        if (rowHeights) {
            pixelHeight = 0;
            for (let i = this.y; i < this.y + height; i++) {
                pixelHeight += rowHeights[i];
            }
        }
        else {
            pixelHeight = height * gridster.cellHeight;
        }
        return {
            width: width * gridster.cellWidth,
            height: pixelHeight
        };
    }
    getXProperty(breakpoint) {
        if (breakpoint && this.itemComponent) {
            return GridListItem.X_PROPERTY_MAP[breakpoint];
        }
        else {
            return 'x';
        }
    }
    getYProperty(breakpoint) {
        if (breakpoint && this.itemComponent) {
            return GridListItem.Y_PROPERTY_MAP[breakpoint];
        }
        else {
            return 'y';
        }
    }
    getWProperty(breakpoint) {
        if (this.itemPrototype) {
            return this.itemPrototype[GridListItem.W_PROPERTY_MAP[breakpoint]] ?
                GridListItem.W_PROPERTY_MAP[breakpoint] : 'w';
        }
        const item = this.getItem();
        const responsiveSizes = item.gridster && item.gridster.options.responsiveSizes;
        if (breakpoint && responsiveSizes) {
            return GridListItem.W_PROPERTY_MAP[breakpoint];
        }
        else {
            return 'w';
        }
    }
    getHProperty(breakpoint) {
        if (this.itemPrototype) {
            return this.itemPrototype[GridListItem.H_PROPERTY_MAP[breakpoint]] ?
                GridListItem.H_PROPERTY_MAP[breakpoint] : 'w';
        }
        const item = this.getItem();
        const responsiveSizes = item.gridster && item.gridster.options.responsiveSizes;
        if (breakpoint && responsiveSizes) {
            return GridListItem.H_PROPERTY_MAP[breakpoint];
        }
        else {
            return 'h';
        }
    }
    getItem() {
        const item = this.itemComponent || this.itemPrototype || this.itemObject;
        if (!item) {
            throw new Error('GridListItem is not set.');
        }
        return item;
    }
    isItemSet() {
        return this.itemComponent || this.itemPrototype || this.itemObject;
    }
}
GridListItem.BREAKPOINTS = ['sm', 'md', 'lg', 'xl'];
GridListItem.X_PROPERTY_MAP = {
    sm: 'xSm',
    md: 'xMd',
    lg: 'xLg',
    xl: 'xXl'
};
GridListItem.Y_PROPERTY_MAP = {
    sm: 'ySm',
    md: 'yMd',
    lg: 'yLg',
    xl: 'yXl'
};
GridListItem.W_PROPERTY_MAP = {
    sm: 'wSm',
    md: 'wMd',
    lg: 'wLg',
    xl: 'wXl'
};
GridListItem.H_PROPERTY_MAP = {
    sm: 'hSm',
    md: 'hMd',
    lg: 'hLg',
    xl: 'hXl'
};
//# sourceMappingURL=GridListItem.js.map