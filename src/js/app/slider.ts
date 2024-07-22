import Swiper from "swiper";
import {Autoplay, Navigation, Pagination} from "swiper/modules";

class Slider {
    el;
    sliderType;
    buttonPrev;
    buttonNext;
    slidesCount;
    pagination;
    desktopOnly;
    media;

    constructor(el: Element) {
        this.el = el;
        this.sliderType = this.el.getAttribute('data-slider');
        this.slidesCount = this.el.getAttribute('data-slides')

        this.buttonPrev = this.el.querySelector('.slider__btn--prev');
        this.buttonNext = this.el.querySelector('.slider__btn--next');
        this.pagination = this.el.querySelector('.swiper-pagination');

        this.media = matchMedia('(max-width: 1199px)');
        this.desktopOnly = this.el.hasAttribute('data-desktop-only');

        this.init()
    }

    init() {
        switch (this.sliderType) {
            case 'default':
                this.initDefaultSlider();
                break;
            case 'infinite':
                this.initInfiniteSlider();
                break;
        }
    }

    initDefaultSlider() {
        const slider = this.el.querySelector('.swiper');
        const swiperOptions = {
            modules: [Navigation],
            slidesPerView: 'auto',
            spaceBetween: 30,
            navigation: {
                prevEl: this.buttonPrev,
                nextEl: this.buttonNext,
                disabledClass: 'slider__btn--disabled'
            },
            breakpoints: {
                1199: {
                    slidesPerView: this.slidesCount ? this.slidesCount : 1,
                }
            }
        }

        // Проверяем на наличие атрибута desktopOnly, если есть, тогда проверяем попадает ли в разрешение, если нет, просто инитим слайдер
        let swiperSlider = this.desktopOnly ? !this.media.matches ? new Swiper(slider, swiperOptions) : null : new Swiper(slider, swiperOptions);

        this.media.addEventListener('change', (event) => {
            const {matches} = event;

            if (matches && this.desktopOnly) {
                swiperSlider.destroy(true, true)
            } else {
                swiperSlider = new Swiper(slider, swiperOptions)
            }
        })
    }

    initInfiniteSlider() {
        const slider = this.el.querySelector('.swiper');

        new Swiper(slider, {
            modules: [Autoplay],
            spaceBetween: 40,
            centeredSlides: true,
            speed: 5000,
            autoplay: {
                delay: 1,
                reverseDirection: this.el.hasAttribute('data-reverse')
            },
            loop: true,
            slidesPerView:'auto',
            allowTouchMove: false,
            disableOnInteraction: true,
            updateOnImagesReady: true,
        });
    }
}

export default Slider