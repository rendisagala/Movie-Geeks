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
exports.tv = async (req, res) => {
  title = `TV Series - List`;
  page = Number(req.params.page);
  if (page < 1) {
    page = 1;
  }

  var trendingTV = [];
  var trendingTVTitle = [];
  var trendingTVImage = [];
  var trendingTVGenre = [];
  var trendingTVOverview = [];
  var trendingTVVoteAverage = [];

  await trending.tv(page, async (result) => {
    for (let i = 0; i < result.length; i++) {
      trendingTVTitle.push(result[i].name);
      trendingTVOverview.push(result[i].overview);
      trendingTV.push(result[i].id);
      trendingTVVoteAverage.push(result[i].vote_average);
      if (result[i].poster_path === null) {
        trendingTVImage.push(`https://http.cat/404`);
      } else {
        trendingTVImage.push(`${process.env.IMAGE}${result[i].poster_path}`);
      }
      await tv.details(result[i].id, async (data) => {
        temp.push(data.genres.map(Object.values));
      });
    }
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp[i].length; j++) {
        temp[i][j].shift();
      }
      trendingTVGenre.push(temp[i].flat());
    }
  });

  var topRatedTV = [];
  var topRatedTVTitle = [];
  var topRatedTVImage = [];
  var topRatedTVGenre = [];
  var topRatedTVOverview = [];
  var topRatedTVVoteAverage = [];
  tv.topRated(page, async (result) => {
    await trending.tv(page, async (result) => {
      for (let i = 0; i < result.length; i++) {
        topRatedTVTitle.push(result[i].name);
        topRatedTVOverview.push(result[i].overview);
        topRatedTV.push(result[i].id);
        topRatedTVVoteAverage.push(result[i].vote_average);
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
  });

  var popularTV = [];
  var popularTVTitle = [];
  var popularTVImage = [];
  var popularTVGenre = [];
  var popularTVOverview = [];
  var popularTVVoteAverage = [];

  await tv.popular(page, async (result) => {
    var temp = [];
    for (let i = 0; i < result.length; i++) {
      popularTVTitle.push(result[i].name);
      popularTVOverview.push(result[i].overview);
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

  var onTheAirTV = [];
  var onTheAirTVTitle = [];
  var onTheAirTVImage = [];
  var onTheAirTVGenre = [];
  var onTheAirTVOverview = [];
  var onTheAirTVVoteAverage = [];

  await tv.onTheAir(page, async (result) => {
    var temp = [];
    for (let i = 0; i < result.length; i++) {
      onTheAirTVTitle.push(result[i].name);
      onTheAirTVOverview.push(result[i].overview);
      onTheAirTVVoteAverage.push(result[i].vote_average);
      onTheAirTV.push(result[i].id);
      if (result[i].poster_path === null) {
        onTheAirTVImage.push(`https://http.cat/404`);
      } else {
        onTheAirTVImage.push(`${process.env.IMAGE}${result[i].poster_path}`);
      }
      await tv.details(result[i].id, async (data) => {
        temp.push(data.genres.map(Object.values));
      });
    }
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp[i].length; j++) {
        temp[i][j].shift();
      }
      onTheAirTVGenre.push(temp[i].flat());
    }
  });

  var airingTodayTV = [];
  var airingTodayTVTitle = [];
  var airingTodayTVImage = [];

  var airingTodayTVVoteAverage = [];

  await tv.airingToday(page, async (result) => {
    for (let i = 0; i < result.length; i++) {
      airingTodayTVTitle.push(result[i].name);
      airingTodayTVVoteAverage.push(result[i].vote_average);
      airingTodayTV.push(result[i].id);
      if (result[i].poster_path === null) {
        airingTodayTVImage.push(`https://http.cat/404`);
      } else {
        airingTodayTVImage.push(`${process.env.IMAGE}${result[i].poster_path}`);
      }
    }
  });
  res.render("pages/tv", {
    title: title,
    page: page,
    trendingTV: trendingTV,
    trendingTVTitle: trendingTVTitle,
    trendingTVImage: trendingTVImage,
    trendingTVGenre: trendingTVGenre,
    trendingTVOverview: trendingTVOverview,
    trendingTVVoteAverage: trendingTVVoteAverage,
    topRatedTV: topRatedTV,
    topRatedTVTitle: topRatedTVTitle,
    topRatedTVImage: topRatedTVImage,
    topRatedTVGenre: topRatedTVGenre,
    topRatedTVOverview: topRatedTVOverview,
    topRatedTVVoteAverage: topRatedTVVoteAverage,
    popularTV: popularTV,
    popularTVTitle: popularTVTitle,
    popularTVImage: popularTVImage,
    popularTVGenre: popularTVGenre,
    popularTVOverview: popularTVOverview,
    popularTVVoteAverage: popularTVVoteAverage,
    onTheAirTV: onTheAirTV,
    onTheAirTVTitle: onTheAirTVTitle,
    onTheAirTVImage: onTheAirTVImage,
    onTheAirTVGenre: onTheAirTVGenre,
    onTheAirTVOverview: onTheAirTVOverview,
    onTheAirTVVoteAverage: onTheAirTVVoteAverage,
    airingTodayTV: airingTodayTV,
    airingTodayTVImage: airingTodayTVImage,
    airingTodayTVTitle: airingTodayTVTitle,
    airingTodayTVVoteAverage: airingTodayTVVoteAverage,
  });
};
