require("dotenv").config();
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

exports.testController = async (req, res) => {
  var genres;
  var temp = [];
  var trendingMovie = [];
  var trendingMovieTitle = [];
  var trendingMovieImage = [];
  var trendingMovieGenre = [];
  var trendingMovieOverview = [];
  await genre.movie((result) => {
    genres = result;
  });

  await trending.movie(async (result) => {
    for (let i = 0; i < result.length; i++) {
      await trendingMovieTitle.push(result[i].title);
      await trendingMovieOverview.push(result[i].overview);
      await trendingMovie.push(result[i].id);
      await trendingMovieImage.push(
        `${process.env.IMAGE}${result[i].poster_path}`
      );
      await movie.details(result[i].id, async (data) => {
        await temp.push(data.genres.map(Object.values));
      });
    }
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp[i].length; j++) {
        temp[i][j].shift();
      }
      await trendingMovieGenre.push(temp[i].flat());
    }
  });

  // res.json(trendingMovieGenre);
  res.render("pages/index", {
    genres: genres,
    trendingMovie: trendingMovie,
    trendingMovieTitle: trendingMovieTitle,
    trendingMovieImage: trendingMovieImage,
    trendingMovieGenre: trendingMovieGenre,
    trendingMovieOverview: trendingMovieOverview,
  });
};
