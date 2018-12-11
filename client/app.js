require('dotenv-safe').config({
    allowEmptyValues: true
})

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const port = process.env.PORT

const location = require("../routes/api/location");

const app = express()

app.use(express.static(path.join(__dirname, 'public')));
// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index.html')
})

app.get('/myplaces', (req, res) => {
    res.render('myPlaces.html')
})

app.use("api/location", location);

app.listen(port, () => console.log(`Blockchain Tracking App on port ${port}!`))