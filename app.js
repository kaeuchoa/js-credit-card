const cardFactory = (function(){
    const _card = {};

    function initCard(cardElement) {
        _card.element = cardElement;
        _card.element.addEventListener('click', flipCard);
        _card.back = cardElement.querySelector(".js-card-back");
        _card.front = cardElement.querySelector(".js-card-front");
        return _card;
    }

    function flipCard(){
        _card.element.classList.toggle('is-flipped');
    }

    return {
        flipCard: flipCard,
        init: initCard
    }
})();


const app = (function(){
    let _cards = [];
    function initApp() {
        let cardsElements = Array.from(document.querySelectorAll(".js-card"));
        _cards = cardsElements.map(cardElement => cardFactory.init(cardElement));
    }

    return {
        init: initApp
    }
})(cardFactory);


app.init();
