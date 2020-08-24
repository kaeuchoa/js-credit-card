const app = (function(){
    let cardService = new CardFlagService();
    function initApp() {
        let cardView = CardView();
        let card = Bind(CardModel(), cardView, 
                        "number", 
                        "holder", 
                        "securityNumber", 
                        "expirationMonth", 
                        "expirationYear");

        const cardForm = CardFormView(card);
        cardForm.inputNumber.on("focus", cardView.moveFocusBox);
        cardForm.inputNumber.on("blur", () => {
            cardService.getFlag();
        });
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
