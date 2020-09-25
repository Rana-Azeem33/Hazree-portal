//Server-Side.


require('./src/DB');  //this connects to your database 
const router = require('./routes/user.route')
const express = require('express');
const bodyParser = require('body-parser');

const PORT = '3000';
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use(express.static('public'));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.use('/', router);)
// })

app.listen(PORT, () =>
    console.log(`Listening on port ${PORT}`));

