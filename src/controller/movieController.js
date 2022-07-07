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
exports.movie = async (req, res) => {
  title = `Movie - List`;

  page = Number(req.params.page);
  if (page < 1) {
    page = 1;
  }

  var trendingMovie = [];
  var trendingMovieTitle = [];
  var trendingMovieImage = [];
  var trendingMovieGenre = [];
  var trendingMovieVoteAverage = [];

  await trending.movie(page, async (result) => {
    for (let i = 0; i < result.length; i++) {
      trendingMovieTitle.push(result[i].title);
      trendingMovie.push(result[i].id);
      trendingMovieVoteAverage.push(result[i].vote_average);
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

  var topRatedMovie = [];
  var topRatedMovieTitle = [];
  var topRatedMovieImage = [];
  var topRatedMovieGenre = [];
  var topRatedMovieVoteAverage = [];
  movie.topRated(page, async (result) => {
    await trending.movie(page, async (result) => {
      for (let i = 0; i < result.length; i++) {
        topRatedMovieTitle.push(result[i].title);
        topRatedMovie.push(result[i].id);
        topRatedMovieVoteAverage.push(result[i].vote_average);
        if (result[i].poster_path === null) {
          topRatedMovieImage.push(`https://http.cat/404`);
        } else {
          topRatedMovieImage.push(
            `${process.env.IMAGE}${result[i].poster_path}`
          );
        }
        await movie.details(result[i].id, async (data) => {
          temp.push(data.genres.map(Object.values));
        });
      }
      for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < temp[i].length; j++) {
          temp[i][j].shift();
        }
        topRatedMovieGenre.push(temp[i].flat());
      }
    });
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

  var upComingMovie = [];
  var upComingMovieTitle = [];
  var upComingMovieImage = [];
  var upComingMovieGenre = [];
  var upComingMovieVoteAverage = [];

  await movie.upcoming(page, async (result) => {
    var temp = [];
    for (let i = 0; i < result.length; i++) {
      upComingMovieTitle.push(result[i].title);
      upComingMovieVoteAverage.push(result[i].vote_average);
      upComingMovie.push(result[i].id);
      if (result[i].poster_path === null) {
        upComingMovieImage.push(`https://http.cat/404`);
      } else {
        upComingMovieImage.push(`${process.env.IMAGE}${result[i].poster_path}`);
      }
      await movie.details(result[i].id, async (data) => {
        temp.push(data.genres.map(Object.values));
      });
    }
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp[i].length; j++) {
        temp[i][j].shift();
      }
      upComingMovieGenre.push(temp[i].flat());
    }
  });

  var nowPlayingMovie = [];
  var nowPlayingMovieTitle = [];
  var nowPlayingMovieImage = [];

  var nowPlayingMovieVoteAverage = [];

  await movie.nowPlaying(1, async (result) => {
    for (let i = 0; i < result.length; i++) {
      nowPlayingMovieTitle.push(result[i].title);
      nowPlayingMovieVoteAverage.push(result[i].vote_average);
      nowPlayingMovie.push(result[i].id);
      if (result[i].poster_path === null) {
        nowPlayingMovieImage.push(`https://http.cat/404`);
      } else {
        nowPlayingMovieImage.push(
          `${process.env.IMAGE}${result[i].poster_path}`
        );
      }
    }
  });
  res.render("pages/movie", {
    title: title,
    page: page,
    trendingMovie: trendingMovie,
    trendingMovieTitle: trendingMovieTitle,
    trendingMovieImage: trendingMovieImage,
    trendingMovieGenre: trendingMovieGenre,
    trendingMovieVoteAverage: trendingMovieVoteAverage,
    topRatedMovie: topRatedMovie,
    topRatedMovieTitle: topRatedMovieTitle,
    topRatedMovieImage: topRatedMovieImage,
    topRatedMovieGenre: topRatedMovieGenre,
    topRatedMovieVoteAverage: topRatedMovieVoteAverage,
    popularMovie: popularMovie,
    popularMovieTitle: popularMovieTitle,
    popularMovieImage: popularMovieImage,
    popularMovieGenre: popularMovieGenre,
    popularMovieVoteAverage: popularMovieVoteAverage,
    upComingMovie: upComingMovie,
    upComingMovieTitle: upComingMovieTitle,
    upComingMovieImage: upComingMovieImage,
    upComingMovieGenre: upComingMovieGenre,
    upComingMovieVoteAverage: upComingMovieVoteAverage,
    nowPlayingMovie: nowPlayingMovie,
    nowPlayingMovieImage: nowPlayingMovieImage,
    nowPlayingMovieTitle: nowPlayingMovieTitle,
    nowPlayingMovieVoteAverage: nowPlayingMovieVoteAverage,
  });
};
