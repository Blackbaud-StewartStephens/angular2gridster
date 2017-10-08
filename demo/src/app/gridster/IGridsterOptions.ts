export interface IGridsterOptions {
    direction?: string;
    lanes?: number;
    widthHeightRatio?: number;
    heightToFontSizeRatio?: number;
    dragAndDrop?: boolean;
    itemSelector?: string;
    resizable?: boolean;
    shrink?: boolean;
    floating?: boolean;
    responsiveView?: boolean;
    responsiveDebounce?: number;
    breakpoint?: string;
    minWidth?: number;
    useCSSTransforms?: boolean;
    responsiveOptions?: Array<IGridsterOptions>;
}
