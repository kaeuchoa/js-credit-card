const CardView = (function(){
    let _view = {
        init: function() {
            this.element = document.querySelector(".js-card");
            this.element.addEventListener('click', flipCard);
            return this;
        },

        bindModel: function (cardModel) {
            let view = this;
            return new Proxy(cardModel, {
                set(target, property, value) {
                    target[property] = value;
                    let field = view.element.querySelector(`[data-input-bind="${property}"]`);
                    field.innerHTML = value;
                    return true;
                }
            });
        }

    };

    function flipCard(){
        _view.element.classList.toggle('is-flipped');
    }

    return _view;
})();


const app = (function(){
    let card = {
        number: "####-####-####-####",
        holder: "",
        securityNumber: "",
        expirationDate: "MM/YYYY"
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

    }

    return {
        init: initApp
    }
})(CardView);


app.init();
