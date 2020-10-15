//https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
let path = require('path');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const app = express();
app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname,"dist/movieAng")));
mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/movies/:id', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actorsnmovies/:id',actors.deleteActorMovies);
app.put('/actors/:aId/:mId',actors.removeMovie);
app.get('/actorsafter/:year', actors.getActorsAfter);
//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id', movies.deleteOne);
app.post('/movies/actors/:mid/:aid', movies.addActor);
app.get('/movies/:year1/:year2', movies.getMoviesBetween);
app.put('/movies/:mId/:aId',movies.removeActor);
app.delete('/movies', movies.deleteMoviesBetween);
app.get('/actorsbyyear/:yearInput', movies.getActorByYear);
app.delete('/deletemovies/:year', movies.deleteMoviesBefore);