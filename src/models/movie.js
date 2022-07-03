require("dotenv").config();
const axios = require("axios");

exports.details = async (id, data) => {
  //  backdrop_path, budget, genres, homeid, imdb_id, original_language, title, overview, popularity, poster_path, production_companies, production_countries, release_date, revenue, runttime, status, voe_average, vote_count
  await axios
    .get(`${process.env.API}/movie/${id}?api_key=${process.env.APIKEY}`)
    .then((results) => {
      try {
        return data(results.data);
      } catch (error) {
        console.log(error);
        return data(error);
      }
    });
};

exports.cast = async (id, requested, data) => {
  // gender, id, known_for_department, name, popularity, profile_path, cast_id, character, credit_id, order
  await axios
    .get(`${process.env.API}/movie/${id}/credits?api_key=${process.env.APIKEY}`)
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.cast.length; i++) {
        result.push(results.data.cast[i][`${requested}`]);
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.images = async (id, data) => {
  await axios
    .get(`${process.env.API}/movie/${id}/images?api_key=${process.env.APIKEY}`)
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.backdrops.length; i++) {
        result.push(
          `${process.env.IMAGE}${results.data.backdrops[i].file_path}`
        );
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.keywords = async (id, data) => {
  await axios
    .get(
      `${process.env.API}/movie/${id}/keywords?api_key=${process.env.APIKEY}`
    )
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.keywords.length; i++) {
        result.push(results.data.keywords[i].name);
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.recommendations = async (id, data) => {
  // returns movie id
  await axios
    .get(
      `${process.env.API}/movie/${id}/recommendations?api_key=${process.env.APIKEY}`
    )
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.results.length; i++) {
        result.push(results.data.results[i].id);
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.releaseDates = async (id, data) => {
  await axios
    .get(
      `${process.env.API}/movie/${id}/release_dates?api_key=${process.env.APIKEY}`
    )
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.results.length; i++) {
        result.push(results.data.results[i].release_dates[0].release_date);
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.review = async (id, requested, data) => {
  // author, content
  await axios
    .get(`${process.env.API}/movie/${id}/reviews?api_key=${process.env.APIKEY}`)
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.results.length; i++) {
        result.push(results.data.results[i][`${requested}`]);
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.videos = async (id, data) => {
  // return youtube link
  await axios
    .get(`${process.env.API}/movie/${id}/videos?api_key=${process.env.APIKEY}`)
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.results.length; i++) {
        if (results.data.results[i]["type"] == "Trailer") {
          result.push(`https://youtu.be/${results.data.results[i].key}`);
        }
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.topRated = async (data) => {
  // genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count
  //  returns movie id
  await axios
    .get(`${process.env.API}/movie/top_rated?api_key=${process.env.APIKEY}`)
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.results.length; i++) {
        result.push(results.data.results[i].id);
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.popular = async (data) => {
  // genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count
  //  returns movie id
  await axios
    .get(`${process.env.API}/movie/popular?api_key=${process.env.APIKEY}`)
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.results.length; i++) {
        result.push(results.data.results[i].id);
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.nowPlaying = async (data) => {
  // genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count
  //  returns movie id
  await axios
    .get(`${process.env.API}/movie/now_playing?api_key=${process.env.APIKEY}`)
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.results.length; i++) {
        result.push(results.data.results[i].id);
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.upcoming = async (data) => {
  // genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count
  //  returns movie id
  await axios
    .get(`${process.env.API}/movie/upcoming?api_key=${process.env.APIKEY}`)
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.results.length; i++) {
        result.push(results.data.results[i].id);
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};
