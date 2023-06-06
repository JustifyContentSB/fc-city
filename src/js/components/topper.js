import $ from 'jquery';
import throttle from '../utils/throttle';

import Component from './component';

const title = 'Topper';

const defaults = {
    breakpoint: 0,
    duration: 800,
    throttle: 300,
    direction: null,
    onShow: null,
    onHide: null,
};

export default class Topper extends Component {
    constructor(...args) {
        super(title, defaults, ...args);

        if (Topper.instance) {
            return Topper.instance;
        };

        Topper.instance = this;

        this.top = 0;
        this.lastScrollTop = 0;

        this.init();
    }

    init() {
        const {
            target: el,
            clickListeners,
            scrollListeners,
            options,
            options: { breakpoint },
        } = this;

        $(el).click(clickListeners.bind(this)).hide();

        setTimeout(() => {
            $(window).scroll(
                throttle((e) => {
                    this.top = $(e.currentTarget).scrollTop();
                    this.breakpoint =
                        typeof breakpoint === 'function'
                            ? breakpoint()
                            : breakpoint;
                    this.direction =
                        this.top > this.lastScrollTop
                            ? 'down'
                            : this.top < this.lastScrollTop
                            ? 'up'
                            : null;

                    scrollListeners.call(this);

                    this.lastScrollTop = this.top <= 0 ? 0 : this.top;
                }, options.throttle)
            );
        }, options.throttle);
    }

    show() {
        const {
            direction,
            options: { onShow },
            target: el,
            top,
        } = this;

        if (typeof onShow === 'function') {
            onShow(el, direction, top);
        } else {
            $(el).fadeIn();
        }
    }

    hide() {
        const {
            options: { direction, onHide },
            target: el,
            top,
        } = this;

        if (typeof onHide === 'function') {
            onHide(el, direction, top);
        } else {
            $(el).fadeOut();
        }
    }

    clickListeners() {
        const {
            options: { duration },
        } = this;

        $('body, html').animate(
            {
                scrollTop: 0,
            },
            duration,
            'swing'
        );
    }

    scrollListeners() {
        const {
            options: { breakpoint, direction },
            target: el,
            hide,
            show,
        } = this;

        if (this.top > breakpoint) {
            if (direction !== this.direction) {
                hide.call(this);
            } else {
                show.call(this);
            }
        } else {
            hide.call(this);
        }
    }
}
