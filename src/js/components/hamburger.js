import $ from 'jquery';

import Component from './component';

import { getDuration } from '../utils/dom';

const title = 'Hamburger';

const defaults = {};

export default class extends Component {
    constructor(...args) {
        super(title, defaults, ...args);

        const spanEl = this.target[0].querySelector('span');

        const duration = getDuration(spanEl, 'transform');

        this.duration = duration;

        this.init();
    };

    init() {
        const { toggle, onResize } = this;

        super.init((el, options) => {
            $(el).on('click', e => {
                e.preventDefault();
                e.stopPropagation();

                toggle();
            });
        });

        $(window).resize(onResize);
    };

    onResize() {
        if (window.matchMedia('(min-width: 992px)').matches) {
            $('body').removeClass('menu-opened menu-opening menu-closing');
        };
    };

    open = () => {
        const { duration } = this;

        $('body').addClass('menu-opening menu-opened');

        setTimeout(() => {
            $('body').removeClass('menu-opening');
        }, duration);
    };

    close = () => {
        const { duration } = this;

        $('body').removeClass('menu-opened').addClass('menu-closing');

        setTimeout(() => {
            $('body').removeClass('menu-closing');
        }, duration);
    };

    toggle = () => {
        const { open, close } = this;

        if ($('body').hasClass('menu-opened')) {
            close();
        } else {
            open();
        };
    };
};
