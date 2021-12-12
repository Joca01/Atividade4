const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(cors({
    'origin': '*',
    "methods": 'GET, POST',

}))

require('./routes/routes.js')(app)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/Html/index.html'))
})

// app.get('/sciencenews', (req, res) => {
//     //res.sendFile(path.join(__dirname + '/public/Html/sciencenews.html'))
// })

// app.get('/astronomy-com', (req, res) => {
//     res.json()
// })

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));