import $ from 'jquery';

export default () => {
    const $navbarMenu = $('<nav class="menu menu--vertical menu--main"><ul class="menu__list"></ul></nav>');

    $('.footer .footer__nav-item').each(function() {
        $(this).clone().appendTo($navbarMenu.find('.menu__list'));
    });

    $navbarMenu.appendTo('.navbar__nav');
};
