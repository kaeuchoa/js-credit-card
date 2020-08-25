const CardFlagService = function(){
    let data = new FormData()
    function getFlag (cardNumber) {
        let options = {
            method: "POST",
            headers: new Headers({
                'Accept': 'application/json',
            'Content-Type': 'application/json'
            }),
            body: JSON.stringify({"cardNumber": cardNumber}) // replace with actual data
        };
        return fetch("/card", options)
            .then(response => response.json());
    }

    return {
        getFlag
    }
}