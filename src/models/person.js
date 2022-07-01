require("dotenv").config();
const axios = require("axios");

exports.details = async (id, data) => {
  // also_known_as, biography, birthday, gender, id, name, place_of_birth, popularity, profile_path
  const detail = await axios.get(
    `${process.env.API}/person/${id}?api_key=${process.env.APIKEY}`
  );

  try {
    return data(detail.data);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};

exports.images = async (id, data) => {
  // returns person image
  const image = await axios.get(
    `${process.env.API}/person/${id}/images?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < image.data.profiles.length; i++) {
      result.push(`${process.env.IMAGE}${image.data.profiles[i].file_path}`);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};

exports.popular = async (data) => {
  //   returns person id
  const popular = await axios.get(
    `${process.env.API}/person/popular?api_key=${process.env.APIKEY}`
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

exports.movie = async (id, data) => {
  //   returns person id
  const movie = await axios.get(
    `${process.env.API}/person/${id}/movie_credits?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < movie.data.cast.length; i++) {
      result.push(movie.data.cast[i].id);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};

exports.tv = async (id, data) => {
  //   returns person id
  const tv = await axios.get(
    `${process.env.API}/person/${id}/tv_credits?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < tv.data.cast.length; i++) {
      result.push(tv.data.cast[i].id);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};
