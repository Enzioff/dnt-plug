import axios from "axios";

class Form {
    el;
    submit;
    agreeCheckbox: HTMLInputElement;
    url;
    inputs;
    items;
    modal;

    constructor(el: Element) {
        this.el = el;
        this.submit = this.el.querySelector('button[type="submit"]');
        this.agreeCheckbox = this.el.querySelector('.checkbox');
        this.url = this.el.getAttribute('action')
        this.items = this.el.querySelectorAll('.form__item');
        this.inputs = [...Array.from(this.el.querySelectorAll('input')),
            ...Array.from(this.el.querySelectorAll('textarea'))]
        this.modal = document.querySelector('[data-modal]')

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
        let error = false;

        this.items.forEach(item => {
            const input = item.querySelector('input');
            const errorMsg = item.querySelector('.form__error');

            console.log(input.inputmask)
            if (input.value.length < 3) {
                error = true
                errorMsg.classList.add('active');
            } else if (input.inputmask && !input.inputmask.isComplete()) {
                error = true
                errorMsg.classList.add('active');
            } else {
                errorMsg.classList.remove('active');
            }
        })

        if (!error) {
            this.sendData();
        }
    }

    getData() {
        const data = new FormData();

        this.inputs.forEach(input => {
            data.append(input.name, input.value)
        })

        return data;
    }

    sendData() {
        axios.post(this.url, this.getData())
            .then(response => response.data)
            .then(data => {
                this.inputs.forEach(input => {
                    input.value = '';
                })
                this.modal.classList.add('active')
                setTimeout(() => {
                    this.modal.classList.remove('active')
                }, 3000)
            })
            .catch(e => {
                console.error(e)
            });
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