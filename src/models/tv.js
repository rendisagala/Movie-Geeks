require("dotenv").config();
const axios = require("axios");

exports.details = async (id, requested, data) => {
  // adult, backdrop_path, budget, genres, homepage, id,  original_language, name, overview, popularity,  production_companies, production_countries, release_date, revenue, runttime, status, voe_average, vote_count
  const detail = await axios.get(
    `${process.env.API}/tv/${id}?api_key=${process.env.APIKEY}`
  );
  try {
    return data(null, detail.data[`${requested}`]);
  } catch (error) {
    console.log(error);
    return data(null, error);
  }
};

exports.cast = async (id, requested, data) => {
  // gender, id, known_for_department, name, popularity, profile_path, cast_id, character, credit_id, order
  const cast = await axios.get(
    `${process.env.API}/tv/${id}/credits?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < cast.data.cast.length; i++) {
      result.push(cast.data.cast[i][`${requested}`]);
    }
    return data(null, result);
  } catch (error) {
    console.log(error);
    return data(null, error);
  }
};

exports.images = async (id, data) => {
  const image = await axios.get(
    `${process.env.API}/tv/${id}/images?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < image.data.backdrops.length; i++) {
      result.push(`${process.env.IMAGE}${image.data.backdrops[i].file_path}`);
    }
    return data(null, result);
  } catch (error) {
    console.log(error);
    return data(null, error);
  }
};

exports.keywords = async (id, data) => {
  const keyword = await axios.get(
    `${process.env.API}/tv/${id}/keywords?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < keyword.data.results.length; i++) {
      result.push(keyword.data.results[i].name);
    }
    return data(null, result);
  } catch (error) {
    console.log(error);
    return data(null, error);
  }
};

exports.recommendations = async (id, data) => {
  // returns tv id
  const recommendation = await axios.get(
    `${process.env.API}/tv/${id}/recommendations?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < recommendation.data.results.length; i++) {
      result.push(recommendation.data.results[i].id);
    }
    return data(null, result);
  } catch (error) {
    console.log(error);
    return data(null, error);
  }
};

exports.reviews = async (id, requested, data) => {
  // author, content
  const review = await axios.get(
    `${process.env.API}/tv/${id}/reviews?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < review.data.results.length; i++) {
      result.push(review.data.results[i][`${requested}`]);
    }
    return data(null, result);
  } catch (error) {
    console.log(error);
    return data(null, error);
  }
};

exports.videos = async (id, data) => {
  // return youtube link
  const video = await axios.get(
    `${process.env.API}/tv/${id}/videos?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < video.data.results.length; i++) {
      if (video.data.results[i]["type"] == "Trailer") {
        result.push(`https://youtu.be/${video.data.results[i].key}`);
      }
    }
    return data(null, result);
  } catch (error) {
    console.log(error);
    return data(null, error);
  }
};

exports.today = async (page, data) => {
  // genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count
  //   returns tv id
  const top = await axios.get(
    `${process.env.API}/movie/top_rated?api_key=${process.env.APIKEY}&page=${page}`
  );
  let result = [];
  try {
    for (let i = 0; i < top.data.results.length; i++) {
      result.push(top.data.results[i].id);
    }
    return data(null, result);
  } catch (error) {
    console.log(error);
    return data(null, error);
  }
};

exports.popular = async (page, data) => {
  // genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count
  //   returns tv id
  const top = await axios.get(
    `${process.env.API}/tv/popular?api_key=${process.env.APIKEY}&page=${page}`
  );
  let result = [];
  try {
    for (let i = 0; i < top.data.results.length; i++) {
      result.push(top.data.results[i].id);
    }
    return data(null, result);
  } catch (error) {
    console.log(error);
    return data(null, error);
  }
};
