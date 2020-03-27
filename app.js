const CardView = () => {
    let _view = {
        init: function() {
            this.element = document.querySelector(".js-card");
            this.focusBox = this.element.querySelector(".js-focusBox");
            return this;
        },

        update: function (property, value) {
            let field = this.element.querySelector(`[data-input-bind="${property}"]`);
            if (value === "") {
                field.innerHTML = field.dataset.placeHolder;
                field.classList.add("place-holder");
                return;
            }
            field.classList.remove("place-holder");
            field.innerHTML = value;
        },

        flipCard: function(){
            _view.element.classList.toggle('is-flipped');
        },

        moveFocusBox: function(){
            let field = event.target || event.srcElement,
                fieldName = field.getAttribute("name");

            let focusTarget = document.querySelector(`[data-focus-target="${fieldName}"]`);
            _view.focusBox.style.display = "block";
            _view.focusBox.style.width = `${focusTarget.offsetWidth + 10}px`;
            _view.focusBox.style.height = `${focusTarget.offsetHeight + 10}px`;
            _view.focusBox.style.top = `${focusTarget.offsetTop - 5}px`;
            _view.focusBox.style.left = `${focusTarget.offsetLeft - 5}px`;

        }

    };

    return _view.init();
};

const Bind = function(model, view, ...properties){

    const proxy = new Proxy(model, {
        set(target, prop, value, receiver) {
            const updated = Reflect.set(target, prop, value);
            if (properties.includes(prop)) {
                view.update(prop, value);
            }
            return updated;
        }
    })

    return proxy;

};

const CardModel = () => {
    const _card = {
        number: "",
        holder: "",
        securityNumber: "",
        expirationMonth: "",
        expirationYear: "",
    }
    return  _card;
}

const CardFormView = (cardModel) => {

    let _view = {
        initForm: function(cardModel) {
            this.cardModel = cardModel;
            this.form      = document.querySelector("#card-form");
        },
        initInputNumber: function(){
            this.inputNumber = document.querySelector("#card-number");
            this.inputNumber.addEventListener("keyup", () => {
                this.cardModel.number = this.inputNumber.value;
            });

            return {
                el: this.inputNumber,
                onFocus: function(...callbacks){
                    callbacks.forEach(callback => {
                        this.el.addEventListener("focus", callback);
                    });
                }
            }
        },

        initInputHolder: function(){
            this.inputHolder = document.querySelector("#card-holder"),
            this.inputHolder.addEventListener("keyup", () => {
                this.cardModel.holder = this.inputHolder.value;
            });

            return {
                el: this.inputHolder,
                onFocus: function(...callbacks){
                    callbacks.forEach(callback => {
                        this.el.addEventListener("focus", callback);
                    });
                }
            }
        },

        initSelectMonth: function(){
            this.selectMonth = document.querySelector("#expiration-date-month");
            let listOfMonths = {
                "Jan": "01", "Feb": "02", "Mar": "03",
                "Apr": "04", "May": "05", "Jun": "06", 
                "Jul": "07", "Aug": "08", "Sept": "09",
                "Oct": "10", "Nov": "11", "Dec": "12"
            };

            for(month in listOfMonths) {
                let newOption = document.createElement("option");
                newOption.text = month;
                newOption.value = listOfMonths[month];
                this.selectMonth.add(newOption);
            }

            this.selectMonth.addEventListener("change", () => {
                this.cardModel.selectMonth = this.selectMonth.value;
            });

            return {
                el: this.selectMonth,
                onFocus: function(...callbacks){
                    callbacks.forEach(callback => {
                        this.el.addEventListener("focus", callback);
                    });
                }
            }
        },

        initSelectYear: function(){
            this.selectYear = document.querySelector("#expiration-date-year");

            for(let i = 2020; i < 2031; i++ ) {
                let newOption = document.createElement("option");
                newOption.text = i;
                newOption.value = i;
                this.selectYear.add(newOption);
            }

            this.selectYear.addEventListener("change", () => {
                this.cardModel.selectYear = this.selectYear.value;
            });

            return {
                el: this.selectYear,
                onFocus: function(...callbacks){
                    callbacks.forEach(callback => {
                        this.el.addEventListener("focus", callback);
                    });
                }
            }
        },

        initInputSecNum: function(){
            this.inputSecNum = document.querySelector("#security-number");
            this.inputSecNum.addEventListener("keyup", () => {
                this.cardModel.securityNumber = this.inputSecNum.value;
            });

            return {
                el: this.inputSecNum,
                onFocus: function(...callbacks){
                    callbacks.forEach(callback => {
                        this.el.addEventListener("focus", callback);
                    });
                },
                onBlur: function(...callbacks){
                    callbacks.forEach(callback => {
                        this.el.addEventListener("blur", callback);
                    });
                }
            }
        },
    }

    _view.initForm(cardModel);
    return {
        form: _view.form,
        inputNumber: _view.initInputNumber(),
        inputHolder: _view.initInputHolder(),
        selectMonth: _view.initSelectMonth(),
        selectYear: _view.initSelectYear(),
        inputSecNum: _view.initInputSecNum(),
    };
};

const app = (function(){
    function initApp() {
        let cardView = CardView();
        let card = Bind(CardModel(), cardView, 
                        "number", 
                        "holder", 
                        "securityNumber", 
                        "expirationMonth", 
                        "expirationYear");

        const cardForm = CardFormView(card);
        cardForm.inputNumber.onFocus(cardView.moveFocusBox);
        cardForm.inputHolder.onFocus(cardView.moveFocusBox);
        cardForm.selectMonth.onFocus(cardView.moveFocusBox);
        cardForm.selectYear.onFocus(cardView.moveFocusBox);
        cardForm.inputSecNum.onFocus(cardView.flipCard, cardView.moveFocusBox);
        cardForm.inputSecNum.onBlur(cardView.flipCard);
    }

    return {
        init: initApp
    }
})();

app.init();
