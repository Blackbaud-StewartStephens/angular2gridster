import { Observable } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
export class GridsterOptions {
    constructor(config) {
        this.defaults = {
            lanes: 5,
            direction: 'horizontal',
            widthHeightRatio: 1,
            shrink: false,
            responsiveView: true,
            responsiveSizes: false,
            dragAndDrop: true,
            resizable: false,
            useCSSTransforms: false,
            floating: true,
            tolerance: 'pointer'
        };
        this.responsiveOptions = [];
        this.breakpointsMap = {
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200 // Extra large
        };
        this.basicOptions = config;
        this.responsiveOptions = this.extendResponsiveOptions(config.responsiveOptions || []);
        this.change = Observable.merge(Observable.of(this.getOptionsByWidth(document.documentElement.clientWidth)), Observable.fromEvent(window, 'resize').pipe(debounceTime(config.responsiveDebounce || 0), map((event) => this.getOptionsByWidth(document.documentElement.clientWidth)))).pipe(distinctUntilChanged(null, (options) => options.minWidth));
    }
    getOptionsByWidth(width) {
        let i = 0;
        let options = Object.assign({}, this.defaults, this.basicOptions);
        while (this.responsiveOptions[i]) {
            if (this.responsiveOptions[i].minWidth <= width) {
                options = this.responsiveOptions[i];
            }
            i++;
        }
        return options;
    }
    extendResponsiveOptions(responsiveOptions) {
        return responsiveOptions
            .filter(options => options.breakpoint)
            .map((options) => {
            return Object.assign({
                minWidth: this.breakpointsMap[options.breakpoint] || 0
            }, options);
        })
            .sort((curr, next) => curr.minWidth - next.minWidth)
            .map((options) => Object.assign({}, this.defaults, this.basicOptions, options));
    }
}
//# sourceMappingURL=GridsterOptions.js.map