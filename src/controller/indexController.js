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
exports.testController = async (req, res) => {
  var genres;
  await genre.movie((result) => {
    genres = result;
  });

  var trendingMovie = [];
  var trendingMovieTitle = [];
  var trendingMovieImage = [];
  var trendingMovieGenre = [];
  var trendingMovieOverview = [];

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

  var popularMovie = [];
  var popularMovieTitle = [];
  var popularMovieImage = [];
  var popularMovieGenre = [];
  var popularMovieOverview = [];
  var popularMovieVoteAverage = [];

  await movie.popular(async (result) => {
    var temp = [];
    for (let i = 0; i < result.length; i++) {
      await popularMovieTitle.push(result[i].title);
      await popularMovieOverview.push(result[i].overview);
      await popularMovieVoteAverage.push(result[i].vote_average);
      await popularMovie.push(result[i].id);
      await popularMovieImage.push(
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
      await popularMovieGenre.push(temp[i].flat());
    }
  });

  var popularTV = [];
  var popularTVTitle = [];
  var popularTVImage = [];
  var popularTVGenre = [];
  var popularTVOverview = [];
  var popularTVVoteAverage = [];

  await tv.popular(async (result) => {
    var temp = [];
    for (let i = 0; i < result.length; i++) {
      await popularTVTitle.push(result[i].name);
      await popularTVOverview.push(result[i].overview);
      await popularTVVoteAverage.push(result[i].vote_average);
      await popularTV.push(result[i].id);
      await popularTVImage.push(`${process.env.IMAGE}${result[i].poster_path}`);
      await tv.details(result[i].id, async (data) => {
        await temp.push(data.genres.map(Object.values));
      });
    }
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp[i].length; j++) {
        temp[i][j].shift();
      }
      await popularTVGenre.push(temp[i].flat());
    }
  });

  var topRatedMovie = [];
  var topRatedMovieTitle = [];
  var topRatedMovieImage = [];

  var topRatedMovieVoteAverage = [];

  await movie.topRated(async (result) => {
    var temp = [];
    for (let i = 0; i < result.length; i++) {
      await topRatedMovieTitle.push(result[i].title);

      await topRatedMovieVoteAverage.push(result[i].vote_average);
      await topRatedMovie.push(result[i].id);
      await topRatedMovieImage.push(
        `${process.env.IMAGE}${result[i].poster_path}`
      );
    }
  });

  var topRatedTV = [];
  var topRatedTVTitle = [];
  var topRatedTVImage = [];
  var topRatedTVGenre = [];
  var topRatedTVOverview = [];
  var topRatedTVVoteAverage = [];

  await tv.topRated(async (result) => {
    var temp = [];
    for (let i = 0; i < result.length; i++) {
      await topRatedTVTitle.push(result[i].name);
      await topRatedTVVoteAverage.push(result[i].vote_average);
      await topRatedTVOverview.push(result[i].overview);
      await topRatedTV.push(result[i].id);
      await topRatedTVImage.push(
        `${process.env.IMAGE}${result[i].poster_path}`
      );
      await tv.details(result[i].id, async (data) => {
        await temp.push(data.genres.map(Object.values));
      });
    }
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp[i].length; j++) {
        temp[i][j].shift();
      }
      await topRatedTVGenre.push(temp[i].flat());
    }
  });

  // console.log(topRatedTVGenre);
  // res.json(trendingMovieGenre);
  res.render("pages/index", {
    genres: genres,
    trendingMovie: trendingMovie,
    trendingMovieTitle: trendingMovieTitle,
    trendingMovieImage: trendingMovieImage,
    trendingMovieGenre: trendingMovieGenre,
    trendingMovieOverview: trendingMovieOverview,
    popularMovie: popularMovie,
    popularMovieTitle: popularMovieTitle,
    popularMovieImage: popularMovieImage,
    popularMovieGenre: popularMovieGenre,
    popularMovieOverview: popularMovieOverview,
    popularMovieVoteAverage: popularMovieVoteAverage,
    popularTV: popularTV,
    popularTVTitle: popularTVTitle,
    popularTVImage: popularTVImage,
    popularTVGenre: popularTVGenre,
    popularTVOverview: popularTVOverview,
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
