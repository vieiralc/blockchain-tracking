require('dotenv').config({
    allowEmptyValues: true
});

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const location = require("./routes/api/location");

const app = express();

app.use(express.static(path.join(__dirname, '/client/public')));
app.set('views', path.join(__dirname, '/client/views'));
app.set('view engine', 'pug');

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index', {title: 'Blockchain Tracking', message: 'Hello World'});
})

app.get('/myplaces', (req, res) => {
    res.render('./routes/myplaces');
})

app.use("api/location", location);

app.listen(process.env.PORT, () => console.log(`Blockchain Tracking App on port ${process.env.PORT}!`));