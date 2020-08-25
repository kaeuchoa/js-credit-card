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
                on: function(event, callback){
                    this.el.addEventListener(event, callback);
                },
                value: function() {
                    return this.el.value;
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
