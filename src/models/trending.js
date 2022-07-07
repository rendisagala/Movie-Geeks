require("dotenv").config();
const axios = require("axios");

// time line trending = 7 DAYS

exports.movie = async (page, data) => {
  //returns movie id
  await axios
    .get(
      `${process.env.API}/trending/movie/week?api_key=${process.env.APIKEY}&page=${page}`
    )
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.results.length; i++) {
        result.push(results.data.results[i]);
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.tv = async (page, data) => {
  //returns tv id
  await axios
    .get(
      `${process.env.API}/trending/tv/week?api_key=${process.env.APIKEY}&page=${page}`
    )
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.results.length; i++) {
        result.push(results.data.results[i]);
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.person = async (data) => {
  //returns person id
  await axios
    .get(
      `${process.env.API}/trending/person/week?api_key=${process.env.APIKEY}&page=${page}`
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
