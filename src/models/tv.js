require("dotenv").config();
const axios = require("axios");

exports.details = async (id, data) => {
  // backdrop_path, budget, genres, homepage, id,  original_language, name, overview, popularity,  production_companies, production_countries, release_date, revenue, runttime, status, voe_average, vote_count
  await axios
    .get(`${process.env.API}/tv/${id}?api_key=${process.env.APIKEY}`)
    .then((results) => {
      return data(results.data);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.cast = async (id, data) => {
  // gender, id, known_for_department, name, popularity, profile_path, cast_id, character, credit_id, order
  await axios
    .get(`${process.env.API}/tv/${id}/credits?api_key=${process.env.APIKEY}`)
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.cast.length; i++) {
        result.push(results.data.cast[i].id);
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
    .get(`${process.env.API}/tv/${id}/images?api_key=${process.env.APIKEY}`)
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
    .get(`${process.env.API}/tv/${id}/keywords?api_key=${process.env.APIKEY}`)
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.results.length; i++) {
        result.push(results.data.results[i].name);
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.recommendations = async (id, data) => {
  // returns tv id
  await axios
    .get(
      `${process.env.API}/tv/${id}/recommendations?api_key=${process.env.APIKEY}`
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

exports.review = async (id, data) => {
  // author, content
  await axios
    .get(`${process.env.API}/tv/${id}/reviews?api_key=${process.env.APIKEY}`)
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

exports.videos = async (id, data) => {
  // return youtube link
  await axios
    .get(`${process.env.API}/tv/${id}/videos?api_key=${process.env.APIKEY}`)
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

exports.episodeGroups = async (id, data) => {
  // return episode groups id
  await axios
    .get(
      `${process.env.API}/tv/${id}/episode_groups?api_key=${process.env.APIKEY}`
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

exports.today = async (data) => {
  // genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count
  //   returns tv id
  await axios
    .get(`${process.env.API}/tv/airing_today?api_key=${process.env.APIKEY}`)
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
  //   returns tv id
  await axios
    .get(`${process.env.API}/tv/popular?api_key=${process.env.APIKEY}`)
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

exports.thisWeek = async (data) => {
  // genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count
  //   returns tv id
  await axios
    .get(`${process.env.API}/tv/on_the_air?api_key=${process.env.APIKEY}`)
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

exports.topRated = async (data) => {
  // genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count
  //  returns tv id
  await axios
    .get(`${process.env.API}/tv/top_rated?api_key=${process.env.APIKEY}`)
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
