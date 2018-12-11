require('dotenv-safe').config()
const path = require('path')
const app = express()

const port = process.env.PORT

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index.html')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))