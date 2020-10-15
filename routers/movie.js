var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        Movie.find({})
        .populate('actors')
        .exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            if (!movies) return res.status(404).json();
            res.json(movies);
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addActor: function (req, res) {
        Movie.findOne({ _id: req.params.mid }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: req.params.aid }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                });
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
    getMoviesBetween: function (req, res) {
        let year1 = req.params.year1;
        let year2 = req.params.year2;

        Movie.find({year:{$lt:year1, $gt:year2}}).
        populate('actors').
        exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    removeActor: function(req,res){
        Movie.findOne({ _id: req.params.mId }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: req.params.aId }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                let pos=0;
                for(i=0;i<movie.actors.length;i++){
                    if(movie.actors[i]._id==req.params.aId){
                        pos=i;
                        console.log(movie.actors[i]._id);
                        console.log("inside"+pos);
                    }
                }
                console.log(pos);
                movie.actors.splice(pos,1);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
    deleteMoviesBetween: function (req, res) {
        let year1 = req.body.year1;
        let year2 = req.body.year2;
        console.log(year1);
        Movie.deleteMany(
            {"year":{$gt:year1, $lt:year2}} ,function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    getActorByYear: function (req, res) {
        let yearInput = req.params.yearInput;
        Movie.find({year: yearInput},'actors').
        populate('actors').
        exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    deleteMoviesBefore: function (req, res) {
        let year1 = req.params.year;
        Movie.deleteMany(
            {"year":{$lt:year1}} ,function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    }
};