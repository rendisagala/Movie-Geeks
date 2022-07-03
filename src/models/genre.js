require("dotenv").config();
const axios = require("axios");

exports.movie = async (data) => {
  //id, name
  await axios
    .get(`${process.env.API}/genre/movie/list?api_key=${process.env.APIKEY}`)
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.genres.length; i++) {
        result.push(results.data.genres[i]);
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.tv = async (data) => {
  //id, name
  await axios
    .get(`${process.env.API}/genre/tv/list?api_key=${process.env.APIKEY}`)
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.genres.length; i++) {
        result.push(results.data.genres[i]);
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};
