import $ from 'jquery';
import './polyfills';
import Preload from './components/preload';
import Fancybox from './components/fancybox';
import LazyLoad from './components/lazyLoad';
import Swiper from './components/swiper';
import Phone from './components/phone';
import Datepicker from './components/datepicker';
import Select from './components/select';
import Topper from './components/topper';
import YandexMap from "./components/yandexMap";
// import Hamburger from './components/hamburger';
// import buildNavbarLayout from './dom/navbar';

import { renderTemplate, loadTemplate } from './utils/template';

import buildDropdownMove from './dom/dropdown';

window.$ = window.jQuery = $;

$(function() {
    buildDropdownMove();
    // buildNavbarLayout();

    const preload = new Preload('[data-preload]');

    const fancybox = new Fancybox('[data-fancybox]');

    const lazyLoad = new LazyLoad('[data-src], [data-background-image]');

    // const hamburger = new Hamburger("[data-hamburger]");

    const swiper = new Swiper('[data-swiper]', {
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            992: {
                slidesPerView: 2
            },
            1200: {
                slidesPerView: 3
            }
        }
    });

    const phone = new Phone('[data-phone]');

    const datepicker = new Datepicker('[data-datepicker]');

    const select = new Select('[data-select]');

    const topper = new Topper('[data-topper]', {
        direction: 'up'
    });

    const map = new YandexMap("[data-map]", {
        markers: {
            render: (id, object) => {
                const isActiveMarker = object.active;

                if (id === "location") {
                    return `<div class="marker${isActiveMarker ? " is-active" : ""}" data-marker></div>`;
                }
            },
            click: async (e) => {
                const marker = e.get("target");
                const id = marker.options.get("id");
                const map = marker.options.get("map");
                const object = marker.options.get("object");
                const target = e.get("domEvent").get("target");

                const $map = $(target).closest("[data-map]");
                const $caption = $map.find("[data-map-caption]");
                const $target = $(target);

                $map.find("[data-marker]").removeClass("is-active");
                $target.addClass("is-active");

                if (id === "location") {
                    // await loadTemplate(id);
                    // const html = renderTemplate("location", object);

                    // console.log('🚀 html →', html);

                    const title = object.title;
                    const phones = object.phones;

                    $('.address__title').html(object.title);

                    const phonesHtml = phones.map(function(phone) {
                        return `
                            <li>${phone}</li>
                        `
                    })

                    $('.address__list').html(phonesHtml.join(''))


                    // $caption.removeClass("is-hidden").html(html);

                    $caption
                        .find("[data-src], [data-background-image]")
                        .each((i, el) => new LazyLoad(el));
                    $caption
                        .find("[data-preview]")
                        .each((i, el) => new Preview(el));
                }
            },
        }
    });

    window.filters = {};

    document.querySelector('select')?.addEventListener('change', (e) => {
        const value = e.target.value;

        window.filters.location = {
            city: value
        }

        map.render();
    })



    // window.data.location = window.data.location.filter(item => item.city === 'Москва')

    // console.log('🚀 map →', map.render('location'));

    // var addressSwiperMain = new Swiper(".address__slider-main", {
    //     spaceBetween: 10,
    //     thumbs: {
    //         swiper: addressSwiperThumbs,
    //     },
    // });

    // var addressSwiperThumbs = new Swiper(".address__slider-thumbs", {
    //     spaceBetween: 10,
    //     slidesPerView: 4,
    //     freeMode: true,
    //     watchSlidesProgress: true,
    // });
});
