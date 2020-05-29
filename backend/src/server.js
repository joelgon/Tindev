const express = require('express');
const server = express();
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')

mongoose.connect('mongodb+srv://semana:semana@cluster0-vl3nx.mongodb.net/tindev?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);