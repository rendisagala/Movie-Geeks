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
var type;
var title;

exports.movie = async (req, res) => {
  type = `Movie`;

  var genres;
  id = req.params.id;
  await genre.movie((result) => {
    genres = result;
  });

  var movieTitle;
  var movieStatus;
  var moviePoster;
  var movieOverview;
  var movieVoteAverage;
  var movieGenre = [];
  var movieVoteCount;
  var movieTagLine;
  var movieRevenue;
  var movieHomePage;
  var movieProductionCompanies = [];
  var moviePopularity;
  var movieLanguage;
  var movieRunTime;
  var movieReleaseDates;
  var movieTrailer;
  var moviePhotos = [];

  await movie.details(id, async (result) => {
    movieTitle = result.title;
    movieStatus = result.status;
    moviePoster = `${process.env.IMAGE}${result.poster_path}`;
    movieOverview = result.overview;
    movieVoteAverage = result.vote_average;
    for (let i = 0; i < result.genres.length; i++) {
      movieGenre.push(result.genres[i].name);
    }
    movieVoteCount = result.vote_count;
    movieTagLine = result.tagline;
    movieRevenue = result.revenue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    movieHomePage = result.homepage;
    for (let i = 0; i < result.production_companies.length; i++) {
      movieProductionCompanies.push(result.production_companies[i].name);
    }
    moviePopularity = result.popularity;
    for (let i = 0; i < result.original_language.length; i++) {}
    movieLanguage = result.original_language;
    movieRunTime = `${result.runtime} minutes`;
    movieReleaseDates = result.release_date;
    await movie.videos(id, (result) => {
      movieTrailer = result[0];
    });
    await movie.images(id, (result) => {
      moviePhotos.push(...result);
    });
  });
  title = `${movieTitle} - details`;
  var cast = [];

  var castName = [];
  await movie.cast(id, (result) => {
    for (let i = 0; i < result.length; i++) {
      cast.push(result[i].id);
      castName.push(result[i].name);
    }
  });

  var similarMovie = [];
  var similarMovieTitle = [];
  var similarMovieImage = [];
  var similarMovieVoteAverage = [];

  await movie.similar(id, async (result) => {
    for (let i = 0; i < result.length; i++) {
      similarMovieTitle.push(result[i].title);
      similarMovieVoteAverage.push(result[i].vote_average);
      similarMovie.push(result[i].id);
      similarMovieImage.push(`${process.env.IMAGE}${result[i].poster_path}`);
    }
  });
  // console.log(castName);
  res.render("pages/movieDetails", {
    type: type,
    title: title,
    genres: genres,
    movieTitle: movieTitle,
    movieStatus: movieStatus,
    moviePoster: moviePoster,
    movieOverview: movieOverview,
    movieVoteAverage: movieVoteAverage,
    movieGenre: movieGenre,
    movieVoteCount: movieVoteCount,
    movieTagLine: movieTagLine,
    movieRevenue: movieRevenue,
    movieHomePage: movieHomePage,
    movieProductionCompanies: movieProductionCompanies,
    moviePopularity: moviePopularity,
    movieLanguage: movieLanguage,
    movieRunTime: movieRunTime,
    movieReleaseDates: movieReleaseDates,
    movieTrailer: movieTrailer,
    moviePhotos: moviePhotos,
    cast: cast,
    castName: castName,
    similarMovie: similarMovie,
    similarMovieImage: similarMovieImage,
    similarMovieTitle: similarMovieTitle,
    similarMovieVoteAverage: similarMovieVoteAverage,
  });
};

exports.tv = async (req, res) => {
  type = `TV Series`;
  var id = req.params.id;
  await genre.movie((result) => {
    genres = result;
  });

  var tvTitle;
  var tvEpisodeRunTime;
  var tvFirstAirDate = [];
  var tvGenre = [];
  var tvHomePage;
  var tvInProduction;
  var tvLanguage;
  var tvLastAirDate;
  var tvLastEpisode;
  var tvNetworks = [];
  var tvTotalEpisode;
  var tvTotalSeason;
  var tvOverview;
  var tvPopularity;
  var tvPoster;
  var tvProductionCompanies = [];
  var tvSeasons = [];
  var tvStatus;
  var tvTagLine;
  var tvVoteAverage;
  var tvVoteCount;
  var tvTrailer;
  var tvPhotos = [];

  await tv.details(id, async (result) => {
    tvTitle = result.name;
    tvEpisodeRunTime = `${result.episode_run_time} minutes`;
    tvFirstAirDate = result.first_air_date;
    for (let i = 0; i < result.genres.length; i++) {
      tvGenre.push(result.genres[i].name);
    }
    tvHomePage = result.homepage;
    tvInProduction = result.in_production;
    tvLanguage = result.languages;
    tvLastAirDate = result.last_air_date;
    tvLastEpisode = result.last_episode_to_air;
    tvNetworks = result.networks[0].name;
    tvTotalEpisode = result.number_of_episodes;
    tvTotalSeason = result.number_of_seasons;
    tvOverview = result.overview;
    tvPopularity = result.popularity;
    tvPoster = `${process.env.IMAGE}${result.poster_path}`;
    for (let i = 0; i < result.production_companies.length; i++) {
      tvProductionCompanies.push(result.production_companies[i].name);
    }
    for (let i = 0; i < result.seasons.length; i++) {
      tvSeasons.push(result.seasons[i]);
    }
    await tv.videos(id, (result) => {
      tvTrailer = result[0];
    });
    await tv.images(id, (result) => {
      tvPhotos.push(...result);
    });
    tvStatus = result.status;
    tvTagLine = result.tagline;
    tvVoteAverage = result.vote_average;
    tvVoteCount = result.vote_count;
  });
  title = `${tvTitle} - details`;
  var cast = [];
  var castName = [];
  await tv.cast(id, (result) => {
    for (let i = 0; i < result.length; i++) {
      cast.push(result[i].id);
      castName.push(result[i].name);
    }
  });

  var similarTV = [];
  var similarTVTitle = [];
  var similarTVImage = [];
  var similarTVVoteAverage = [];

  await tv.similar(id, async (result) => {
    for (let i = 0; i < result.length; i++) {
      similarTVTitle.push(result[i].name);
      similarTVVoteAverage.push(result[i].vote_average);
      similarTV.push(result[i].id);
      similarTVImage.push(`${process.env.IMAGE}${result[i].poster_path}`);
    }
  });
  // console.log(tvTrailer);
  res.render("pages/tvDetails", {
    type: type,
    title: title,
    tvTitle: tvTitle,
    tvEpisodeRunTime: tvEpisodeRunTime,
    tvFirstAirDate: tvFirstAirDate,
    tvGenre: tvGenre,
    tvHomePage: tvHomePage,
    tvInProduction: tvInProduction,
    tvLanguage: tvLanguage,
    tvLastAirDate: tvLastAirDate,
    tvLastEpisode: tvLastEpisode,
    tvNetworks: tvNetworks,
    tvTotalEpisode: tvTotalEpisode,
    tvTotalSeason: tvTotalSeason,
    tvOverview: tvOverview,
    tvPopularity: tvPopularity,
    tvPoster: tvPoster,
    tvProductionCompanies: tvProductionCompanies,
    tvSeasons: tvSeasons,
    tvStatus: tvStatus,
    tvTagLine: tvTagLine,
    tvVoteAverage: tvVoteAverage,
    tvVoteCount: tvVoteCount,
    tvTrailer: tvTrailer,
    tvPhotos: tvPhotos,
    cast: cast,
    castName: castName,
    similarTV: similarTV,
    similarTVImage: similarTVImage,
    similarTVTitle: similarTVTitle,
    similarTVVoteAverage: similarTVVoteAverage,
  });
};
exports.person = async () => {};
