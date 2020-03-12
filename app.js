const CardView = (function(){
    let _view = {
        init: function() {
            this.element = document.querySelector(".js-card");
            return this;
        },

        bindModel: function (cardModel) {
            let view = this;
            let handler = {
                set(target, property, value) {
                    target[property] = value;
                    let field = view.element.querySelector(`[data-input-bind="${property}"]`);
                    field.innerHTML = value;
                    return true;
                }
            };
            return new Proxy(cardModel, handler);
        },

        flipCard: function(){
            _view.element.classList.toggle('is-flipped');
        }

    };

    return _view;
})();


const app = (function(){
    let card = {
        number: "####-####-####-####",
        holder: "",
        securityNumber: "",
        expirationMonth: "MM",
        expirationYear: "YYYY"
    };

    let cardView = {};

    function initApp() {
        cardView = CardView.init();
        card = cardView.bindModel(card);

        let inputNumber = document.querySelector("#card-number");
        inputNumber.addEventListener("keyup", function(){
            card.number = inputNumber.value;
        });

        let inputHolder = document.querySelector("#card-holder");
        inputHolder.addEventListener("keyup", function(){
            card.holder = inputHolder.value;
        });

        let selectMonth = document.querySelector("#expiration-date-month");
        selectMonth.addEventListener("change", function(){
            card.expirationMonth = selectMonth.value;
        });

        let selectYear = document.querySelector("#expiration-date-year");
        selectYear.addEventListener("change", function(){
            card.expirationYear = selectYear.value;
        });

        let inputSecurityNumber = document.querySelector("#security-number");
        inputSecurityNumber.addEventListener("keyup", function(){
            card.securityNumber = inputSecurityNumber.value;
        });

        inputSecurityNumber.addEventListener("focus", cardView.flipCard);
        inputSecurityNumber.addEventListener("blur", cardView.flipCard);
    }

    return {
        init: initApp
    }
})(CardView);


app.init();
