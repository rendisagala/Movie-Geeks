const movie = require("../models/movie");
const tv = require("../models/tv");
const tvSeason = require("../models/tvSeason");
const tvEpisode = require("../models/tvEpisode");
const search = require("../models/search");
const genre = require("../models/genre");
const keyword = require("../models/keyword");
const trending = require("../models/trending");
const person = require("../models/person");
const review = require("../models/review");

exports.testController = (req, res) => {
  const id = req.body.id;
  const requested = req.body.requested;
  const page = req.body.page;
  const season = req.body.season;
  movie.details(id, (result) => {
    res.json(result);
  });
};

// exports.testController = (req, res) => {
//   const id = req.body.id;
//   const requested = req.body.requested;
//   const page = req.body.page;
//   const season = req.body.season;
//   tv.images(id, ( result) => {
//
//     res.json(result);
//   });
// };

// exports.testController = (req, res) => {
//   const id = req.body.id;
//   const requested = req.body.requested;
//   const page = req.body.page;
//   const season = req.body.season;
//   tvSeason.videos(id, season, ( result) => {
//
//     res.json(result);
//   });
// };

// exports.testController = (req, res) => {
//   const id = req.body.id;
//   const requested = req.body.requested;
//   const page = req.body.page;
//   const season = req.body.season;
//   const episode = req.body.episode;
//   tvEpisode.details(id, season, episode, ( result) => {
//
//     res.json(result);
//   });
// };

// exports.testController = (req, res) => {
//   const id = req.body.id;
//   const requested = req.body.requested;
//   const page = req.body.page;
//   const season = req.body.season;
//   const episode = req.body.episode;
//   const query = req.body.query;
//   search.tv(query, ( result) => {
//
//     res.json(result);
//   });
// };

// exports.testController = (req, res) => {
//   const id = req.body.id;
//   const requested = req.body.requested;
//   const page = req.body.page;
//   const season = req.body.season;
//   genre.tv(( result) => {
//
//     res.json(result);
//   });
// };

// exports.testController = (req, res) => {
//   const id = req.body.id;
//   const requested = req.body.requested;
//   const page = req.body.page;
//   const season = req.body.season;
//   keyword.movies(id, ( result) => {
//
//     res.json(result);
//   });
// };

// exports.testController = (req, res) => {
//   const id = req.body.id;
//   const requested = req.body.requested;
//   const page = req.body.page;
//   const season = req.body.season;
//   trending.person(id, ( result) => {
//
//     res.json(result);
//   });
// };

// exports.testController = (req, res) => {
//   const id = req.body.id;
//   const requested = req.body.requested;
//   const page = req.body.page;
//   const season = req.body.season;
//   person.tv(id, ( result) => {
//
//     res.json(result);
//   });
// };

// exports.testController = (req, res) => {
//   const id = req.body.id;
//   const requested = req.body.requested;
//   const page = req.body.page;
//   const season = req.body.season;
//   review.details(id, (result) => {
//     res.json(result);
//   });
// };
