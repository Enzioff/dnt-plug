import Slider from "./slider";
import Form from "./form";
import inputmask from "inputmask";

class App {
    constructor() {
        this.init();
    }

    init = () => {
        this.createSlider()
        this.createRequest()
        this.createMask()
        this.createQR()
    }

    createSlider = () => {
        const sliders = document.querySelectorAll('[data-slider]')
        if (!sliders) return
        sliders.forEach(slider => {
            new Slider(slider)
        })
    }

    createRequest = () => {
        const forms = document.querySelectorAll('[data-form]');
        if (!forms) return

        forms.forEach(form => {
            new Form(form)
        })
    }

    createMask = () => {
        const inputs = document.querySelectorAll('input');

        inputs.forEach(input => {
            if (input.type === 'tel') {
                inputmask({"mask": "+7 (999) 999-99-99"}).mask(input);
            }
        })
    }

    createQR = () => {
        const qr = document.querySelector('.qr');
        if (!qr) return;

        const qrClose = qr.querySelector('.qr__close')

        setTimeout(() => {
            qr.classList.add('active')
        }, 2000)

        qrClose.addEventListener('click', (evt) => {
            evt.preventDefault();
            if (qr.classList.contains('active')) {
                qr.classList.remove('active')
            }
        })
    }
}

export {App};

