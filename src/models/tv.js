require("dotenv").config();
const axios = require("axios");

exports.details = async (id, data) => {
  // backdrop_path, budget, genres, homepage, id,  original_language, name, overview, popularity,  production_companies, production_countries, release_date, revenue, runttime, status, voe_average, vote_count
  const detail = await axios.get(
    `${process.env.API}/tv/${id}?api_key=${process.env.APIKEY}`
  );
  try {
    return data(detail.data);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};

exports.cast = async (id, data) => {
  // gender, id, known_for_department, name, popularity, profile_path, cast_id, character, credit_id, order
  const cast = await axios.get(
    `${process.env.API}/tv/${id}/credits?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < cast.data.cast.length; i++) {
      result.push(cast.data.cast[i].id);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
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
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
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
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
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
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};

exports.review = async (id, data) => {
  // author, content
  const review = await axios.get(
    `${process.env.API}/tv/${id}/reviews?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < review.data.results.length; i++) {
      result.push(review.data.results[i].id);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
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
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};

exports.episodeGroups = async (id, data) => {
  // return episode groups id
  const episodeGroup = await axios.get(
    `${process.env.API}/tv/${id}/episode_groups?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < episodeGroup.data.results.length; i++) {
      result.push(episodeGroup.data.results[i].id);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};

exports.today = async (data) => {
  // genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count
  //   returns tv id
  const today = await axios.get(
    `${process.env.API}/tv/airing_today?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < today.data.results.length; i++) {
      result.push(today.data.results[i].id);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};

exports.popular = async (data) => {
  // genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count
  //   returns tv id
  const popular = await axios.get(
    `${process.env.API}/tv/popular?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < popular.data.results.length; i++) {
      result.push(popular.data.results[i].id);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};

exports.thisWeek = async (data) => {
  // genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count
  //   returns tv id
  const week = await axios.get(
    `${process.env.API}/tv/on_the_air?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < week.data.results.length; i++) {
      result.push(week.data.results[i].id);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};

exports.topRated = async (data) => {
  // genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count
  //  returns tv id
  const top = await axios.get(
    `${process.env.API}/tv/top_rated?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < top.data.results.length; i++) {
      result.push(top.data.results[i].id);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};
