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
var page;
var query;
exports.search = async (req, res) => {
  query = req.body.search;
  res.redirect(`/search/${query}/1`);
};

exports.result = async (req, res) => {
  query = req.params.query;
  page = Number(req.params.page);
  if (page < 1) {
    page = 1;
  }
  var genres;
  await genre.movie((result) => {
    genres = result;
  });
  title = `${query} - result`;
  var movieId = [];
  var movieTitle = [];
  var movieImage = [];
  var movieGenre = [];
  var movieOverview = [];
  var movieVoteAverage = [];
  await search.movie(query, page, async (result) => {
    var temp = [];
    for (let i = 0; i < result.length; i++) {
      movieTitle.push(result[i].title);
      movieOverview.push(result[i].overview);
      movieVoteAverage.push(result[i].vote_average);
      movieId.push(result[i].id);
      if (result[i].poster_path === null) {
        movieImage.push(`https://http.cat/404`);
      } else {
        movieImage.push(`${process.env.IMAGE}${result[i].poster_path}`);
      }
      await movie.details(result[i].id, async (data) => {
        temp.push(data.genres.map(Object.values));
      });
    }
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp[i].length; j++) {
        temp[i][j].shift();
      }
      movieGenre.push(temp[i].flat());
    }
  });

  var tvId = [];
  var tvTitle = [];
  var tvImage = [];
  var tvGenre = [];
  var tvOverview = [];
  var tvVoteAverage = [];
  await search.tv(query, page, async (result) => {
    var temp = [];
    for (let i = 0; i < result.length; i++) {
      tvTitle.push(result[i].name);
      tvOverview.push(result[i].overview);
      tvVoteAverage.push(result[i].vote_average);
      tvId.push(result[i].id);
      if (result[i].poster_path === null) {
        tvImage.push(`https://http.cat/404`);
      } else {
        tvImage.push(`${process.env.IMAGE}${result[i].poster_path}`);
      }
      await tv.details(result[i].id, async (data) => {
        temp.push(data.genres.map(Object.values));
      });
    }
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp[i].length; j++) {
        temp[i][j].shift();
      }
      tvGenre.push(temp[i].flat());
    }
  });

  var personId = [];
  var personName = [];
  var personImage = [];

  var personVoteAverage = [];

  await search.person(query, 1, async (result) => {
    for (let i = 0; i < result.length; i++) {
      personName.push(result[i].name);
      personVoteAverage.push(result[i].vote_average);
      personId.push(result[i].id);
      if (result[i].profile_path === null) {
        personImage.push(`https://http.cat/404`);
      } else {
        personImage.push(`${process.env.IMAGE}${result[i].profile_path}`);
      }
    }
  });

  //   console.log(tvImage);
  res.render("pages/search", {
    title: title,
    genres: genres,
    query: query,
    movieId: movieId,
    page: page,
    movieTitle: movieTitle,
    movieImage: movieImage,
    movieGenre: movieGenre,
    movieOverview: movieOverview,
    movieVoteAverage: movieVoteAverage,
    tvId: tvId,
    tvTitle: tvTitle,
    tvImage: tvImage,
    tvGenre: tvGenre,
    tvOverview: tvOverview,
    tvVoteAverage: tvVoteAverage,
    personId: personId,
    personImage: personImage,
    personName: personName,
  });
};
