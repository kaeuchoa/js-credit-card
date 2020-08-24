const CardFlagService = function(){
    const FLAG_URL = "127.0.0.1:3000/card";
    let data = new FormData()
    data.append("json", JSON.stringify({cardNumber: 374245}));
    function getFlag () {
        let options = {
            method: "POST",
            // mode: "no-cors",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: data
        };
        fetch(FLAG_URL, options)
        .then(response => console.log(response))
            .then(data => console.log(data));
    }

    return {
        getFlag
    }
}