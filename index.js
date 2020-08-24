const express = require('express');
const app = express();
const port = process.env.PORT || "8000";

app.listen(port, () => {
    console.log('server running on http://localhost:' + port);
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendStatus(200);
})