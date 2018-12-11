require('dotenv-safe').config()
const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index.html')
})

app.get('/myplaces', (req, res) => {
    res.render('myPlaces.html')
})

app.listen(port, () => console.log(`Blockchain Tracking App on port ${port}!`))