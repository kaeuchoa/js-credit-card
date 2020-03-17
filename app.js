const CardView = (function(){
    let _view = {
        init: function() {
            this.element = document.querySelector(".js-card");
            this.focusBox = this.element.querySelector(".js-focusBox");
            return this;
        },

        bindModel: function (cardModel) {
            // como manter o contexto do this nesse caso??
            let handler = {
                set(target, property, value) {
                    target[property] = value;
                    let field = _view.element.querySelector(`[data-input-bind="${property}"]`);
                    field.innerHTML = value;
                    return true;
                }
            };
            return new Proxy(cardModel, handler);
        },

        flipCard: function(){
            _view.element.classList.toggle('is-flipped');
        },

        moveFocusBox: function(){
            let field = event.target || event.srcElement,
                fieldName = field.getAttribute("name");

            let focusTarget = document.querySelector(`[data-focus-target="${fieldName}"]`);

            this.focusBox.style.display = "block";
            this.focusBox.style.width = `${focusTarget.offsetWidth + 10}px`;
            this.focusBox.style.height = `${focusTarget.offsetHeight + 10}px`;
            this.focusBox.style.top = `${focusTarget.offsetTop - 5}px`;
            this.focusBox.style.left = `${focusTarget.offsetLeft - 5}px`;

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

        inputNumber.addEventListener("focus", function(){
            cardView.moveFocusBox();
        });

        inputHolder.addEventListener("focus", function(){
            cardView.moveFocusBox();
        });

        selectMonth.addEventListener("focus", function(){
            cardView.moveFocusBox();
        });

        selectYear.addEventListener("focus", function(){
            cardView.moveFocusBox();
        });

        inputSecurityNumber.addEventListener("focus", function() {
            cardView.flipCard();
            cardView.moveFocusBox();
        });
        inputSecurityNumber.addEventListener("blur", cardView.flipCard);
    }

    return {
        init: initApp
    }
})(CardView);

// TODO, criar init form baseado no input type, fazer add event listener com as ações

app.init();
