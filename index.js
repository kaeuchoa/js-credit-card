const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const port = process.env.PORT || "8000";
const creditCardType = require("credit-card-type");

app.listen(port, () => {
    console.log('server running on http://localhost:' + port);
});

app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req, res) => {
    res.sendFile("index.html");
});

app.post('/card', (req, res) => {
    let cardNumber = req.body.cardNumber;
    let [cardData] = creditCardType(cardNumber);
    res.send(cardData);
});