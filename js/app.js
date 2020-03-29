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
