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
        cardForm.inputNumber.on("blur", updateCardFlag);
        cardForm.inputHolder.onFocus(cardView.moveFocusBox);
        cardForm.selectMonth.onFocus(cardView.moveFocusBox);
        cardForm.selectYear.onFocus(cardView.moveFocusBox);
        cardForm.inputSecNum.onFocus(cardView.flipCard, cardView.moveFocusBox);
        cardForm.inputSecNum.onBlur(cardView.flipCard);
    }

    const updateCardFlag = () => {
        // load state to flag
        cardService.getFlag().then(data => {
            let path = "/imgs/";
            switch (data.type) {
                case "VISA":
                    path += "visa_logo.svg";
                    break;
                case "MASTER":
                    path += "master_logo.svg";
                    break;
            }
            cardView.updateFlagImg(path);
        });
    }

    return {
        init: initApp
    }
})();

app.init();
