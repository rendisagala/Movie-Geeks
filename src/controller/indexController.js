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

var temp = [];

var title;
exports.index = async (req, res) => {
  title = `Movie Geeks`;

  var page = 1;

  var trendingMovie = [];
  var trendingMovieTitle = [];
  var trendingMovieImage = [];
  var trendingMovieGenre = [];
  var trendingMovieOverview = [];

  await trending.movie(page, async (result) => {
    for (let i = 0; i < result.length; i++) {
      trendingMovieTitle.push(result[i].title);
      trendingMovieOverview.push(result[i].overview);
      trendingMovie.push(result[i].id);
      if (result[i].poster_path === null) {
        trendingMovieImage.push(`https://http.cat/404`);
      } else {
        trendingMovieImage.push(`${process.env.IMAGE}${result[i].poster_path}`);
      }
      await movie.details(result[i].id, async (data) => {
        temp.push(data.genres.map(Object.values));
      });
    }
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp[i].length; j++) {
        temp[i][j].shift();
      }
      trendingMovieGenre.push(temp[i].flat());
    }
  });

  var popularMovie = [];
  var popularMovieTitle = [];
  var popularMovieImage = [];
  var popularMovieGenre = [];

  var popularMovieVoteAverage = [];

  await movie.popular(page, async (result) => {
    var temp = [];
    for (let i = 0; i < result.length; i++) {
      popularMovieTitle.push(result[i].title);
      popularMovieVoteAverage.push(result[i].vote_average);
      popularMovie.push(result[i].id);
      if (result[i].poster_path === null) {
        popularMovieImage.push(`https://http.cat/404`);
      } else {
        popularMovieImage.push(`${process.env.IMAGE}${result[i].poster_path}`);
      }
      await movie.details(result[i].id, async (data) => {
        temp.push(data.genres.map(Object.values));
      });
    }
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp[i].length; j++) {
        temp[i][j].shift();
      }
      popularMovieGenre.push(temp[i].flat());
    }
  });

  var popularTV = [];
  var popularTVTitle = [];
  var popularTVImage = [];
  var popularTVGenre = [];
  var popularTVVoteAverage = [];

  await tv.popular(page, async (result) => {
    var temp = [];
    for (let i = 0; i < result.length; i++) {
      popularTVTitle.push(result[i].name);
      popularTVVoteAverage.push(result[i].vote_average);
      popularTV.push(result[i].id);
      if (result[i].poster_path === null) {
        popularTVImage.push(`https://http.cat/404`);
      } else {
        popularTVImage.push(`${process.env.IMAGE}${result[i].poster_path}`);
      }
      await tv.details(result[i].id, async (data) => {
        temp.push(data.genres.map(Object.values));
      });
    }
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp[i].length; j++) {
        temp[i][j].shift();
      }
      popularTVGenre.push(temp[i].flat());
    }
  });

  var topRatedMovie = [];
  var topRatedMovieTitle = [];
  var topRatedMovieImage = [];
  var topRatedMovieVoteAverage = [];

  await movie.topRated(page, async (result) => {
    for (let i = 0; i < result.length; i++) {
      topRatedMovieTitle.push(result[i].title);
      topRatedMovieVoteAverage.push(result[i].vote_average);
      topRatedMovie.push(result[i].id);
      if (result[i].poster_path === null) {
        topRatedMovieImage.push(`https://http.cat/404`);
      } else {
        topRatedMovieImage.push(`${process.env.IMAGE}${result[i].poster_path}`);
      }
    }
  });

  var topRatedTV = [];
  var topRatedTVTitle = [];
  var topRatedTVImage = [];
  var topRatedTVGenre = [];
  var topRatedTVOverview = [];
  var topRatedTVVoteAverage = [];

  await tv.topRated(page, async (result) => {
    var temp = [];
    for (let i = 0; i < result.length; i++) {
      topRatedTVTitle.push(result[i].name);
      topRatedTVVoteAverage.push(result[i].vote_average);
      topRatedTVOverview.push(result[i].overview);
      topRatedTV.push(result[i].id);
      if (result[i].poster_path === null) {
        topRatedTVImage.push(`https://http.cat/404`);
      } else {
        topRatedTVImage.push(`${process.env.IMAGE}${result[i].poster_path}`);
      }
      await tv.details(result[i].id, async (data) => {
        temp.push(data.genres.map(Object.values));
      });
    }
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp[i].length; j++) {
        temp[i][j].shift();
      }
      topRatedTVGenre.push(temp[i].flat());
    }
  });

  res.render("pages/index", {
    title: title,
    trendingMovie: trendingMovie,
    trendingMovieTitle: trendingMovieTitle,
    trendingMovieImage: trendingMovieImage,
    trendingMovieGenre: trendingMovieGenre,
    trendingMovieOverview: trendingMovieOverview,
    popularMovie: popularMovie,
    popularMovieTitle: popularMovieTitle,
    popularMovieImage: popularMovieImage,
    popularMovieGenre: popularMovieGenre,
    popularMovieVoteAverage: popularMovieVoteAverage,
    popularTV: popularTV,
    popularTVTitle: popularTVTitle,
    popularTVImage: popularTVImage,
    popularTVGenre: popularTVGenre,
    popularTVVoteAverage: popularTVVoteAverage,
    topRatedMovie: topRatedMovie,
    topRatedMovieTitle: topRatedMovieTitle,
    topRatedMovieImage: topRatedMovieImage,
    topRatedMovieVoteAverage: topRatedMovieVoteAverage,
    topRatedTV: topRatedTV,
    topRatedTVTitle: topRatedTVTitle,
    topRatedTVImage: topRatedTVImage,
    topRatedTVGenre: topRatedTVGenre,
    topRatedTVVoteAverage: topRatedTVVoteAverage,
    topRatedTVOverview: topRatedTVOverview,
  });
};
