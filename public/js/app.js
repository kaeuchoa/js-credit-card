const app = (function(){
    let cardService = new CardFlagService();
    let cardView = CardView();
    function initApp() {
        let card = Bind(CardModel(), cardView, 
                        "number", 
                        "holder", 
                        "securityNumber", 
                        "expirationMonth", 
                        "expirationYear");

        const cardForm = CardFormView(card);
        cardForm.inputNumber.on("focus", cardView.moveFocusBox);
        cardForm.inputNumber.on("keyup", () => {
            updateCardFlag(cardForm.inputNumber.value());
        });
        cardForm.inputHolder.onFocus(cardView.moveFocusBox);
        cardForm.selectMonth.onFocus(cardView.moveFocusBox);
        cardForm.selectYear.onFocus(cardView.moveFocusBox);
        cardForm.inputSecNum.onFocus(cardView.flipCard, cardView.moveFocusBox);
        cardForm.inputSecNum.onBlur(cardView.flipCard);
    }

    const updateCardFlag = (cardNumber) => {
        // bins credit cards https://gist.github.com/erikhenrique/5931368
        if (cardNumber.length >= 4) {
            cardService.getFlag(cardNumber).then(data => {
                let path = "/imgs/";
                switch (data.type) {
                    case "visa":
                        path += "visa_logo.svg";
                        break;
                    case "mastercard":
                        path += "master_logo.svg";
                        break;
                }
                cardView.updateFlagImg(path);
            });
        }
    }

    return {
        init: initApp
    }
})();

document.addEventListener("DOMContentLoaded", app.init);
