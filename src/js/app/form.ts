import axios from "axios";

class Form {
    el;
    submit;
    agreeCheckbox: HTMLInputElement;
    url;
    inputs;

    constructor(el: Element) {
        this.el = el;
        this.submit = this.el.querySelector('button[type="submit"]');
        this.agreeCheckbox = this.el.querySelector('.checkbox');
        this.url = this.el.getAttribute('action')
        this.inputs = [...Array.from(this.el.querySelectorAll('input')),
            ...Array.from(this.el.querySelectorAll('textarea'))]

        console.log(this.inputs)

        this.init()
    }

    init() {
        this.changeBtnStatus()
        this.toggleAgree()

        this.submit.addEventListener('click', (evt) => {
            evt.preventDefault()
            this.validate()
        });
    }

    validate() {
        let error = true;

        this.inputs.forEach(input => {
            if (input.value.length < 3 || !input.inputmask.isComplete()) {
                error = true
            }
        })

        console.log('ошибка')
        if (!error) {
            this.sendData();
        }
    }

    getData() {
        const data = new FormData();

    }

    sendData() {
        axios.post(this.url, this.getData())
            .then(response => response.data)
            .then(data => console.log(data))
            .catch(e => console.error(e));
    }

    changeBtnStatus() {
        if (this.agreeCheckbox) {
            if (this.agreeCheckbox.checked) {
                this.submit.removeAttribute('disabled')
            } else {
                this.submit.setAttribute('disabled', 'true')
            }
        }
    }

    toggleAgree() {
        if (this.agreeCheckbox) {
            this.agreeCheckbox.addEventListener('change', () => {
                this.changeBtnStatus()
            })
        }
    }
}

export default Form;