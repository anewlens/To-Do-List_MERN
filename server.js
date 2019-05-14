const express = require('express')
const mongoose = require('mongoose')
const items = require('./routes/api/items')
const path = require('path')

const app = express()

//Parsing Middleware
app.use(express.json())

//DB Config 
const db = require('./config/keys').mongoURI

//Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

//Use Routes
app.use('/api/items', items)

//Serve Static assets if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 4050;

app.listen(port, () => console.log(`Server started on port ${port}`))

