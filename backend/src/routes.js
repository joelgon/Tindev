const express = require('express');
const DevController = require('./controllers/DevController')
const LikeController = require('./controllers/LikeController')
const Dislikes = require('./controllers/DislikesController')
const routes = express.Router();

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', Dislikes.store);

module.exports = routes;