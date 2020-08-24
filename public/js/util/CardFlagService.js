const CardFlagService = function(){
    let data = new FormData()
    data.append("json", JSON.stringify({cardNumber: 374245}));
    function getFlag () {
        let options = {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: data
        };
        return fetch("/card", options)
            .then(response => response.json());
    }

    return {
        getFlag
    }
}