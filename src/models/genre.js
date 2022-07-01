require("dotenv").config();
const axios = require("axios");

exports.movie = async (data) => {
  //id, name
  const movie = await axios.get(
    `${process.env.API}/genre/movie/list?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < movie.data.genres.length; i++) {
      result.push(movie.data.genres[i]);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};
exports.tv = async (data) => {
  //id, name
  const tv = await axios.get(
    `${process.env.API}/genre/tv/list?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < tv.data.genres.length; i++) {
      result.push(tv.data.genres[i]);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};
