const CardView = () => {
    let _view = {
        init: function() {
            this.element = document.querySelector(".js-card");
            this.flag = document.querySelector(".js-cardFlag");
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

        },
        
        updateFlagImg: function(imgPath) {
            this.flag.style.background = `url(${imgPath}) no-repeat center center`;
            this.flag.style.backgroundSize = "100%";
        }

    };

    return _view.init();
};
