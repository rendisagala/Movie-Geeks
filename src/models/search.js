require("dotenv").config();
const axios = require("axios");

exports.companies = async (query, page, data) => {
  // return companies id
  await axios
    .get(
      `${process.env.API}/search/company?api_key=${process.env.APIKEY}&query=${query}&page=${page}`
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

exports.keywords = async (query, page, data) => {
  //returns keywords id
  await axios
    .get(
      `${process.env.API}/search/keyword?api_key=${process.env.APIKEY}&query=${query}&page=${page}`
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

exports.movie = async (query, page, data) => {
  //returns movies id
  await axios
    .get(
      `${process.env.API}/search/movie?api_key=${process.env.APIKEY}&query=${query}&page=${page}`
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

exports.multiSearch = async (query, page, data) => {
  //returns movies and tv(S) id
  await axios
    .get(
      `${process.env.API}/search/multi?api_key=${process.env.APIKEY}&query=${query}&page=${page}`
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

exports.person = async (query, page, data) => {
  //returns person id
  await axios
    .get(
      `${process.env.API}/search/person?api_key=${process.env.APIKEY}&query=${query}&page=${page}`
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

exports.tv = async (query, page, data) => {
  //returns tv id
  await axios
    .get(
      `${process.env.API}/search/tv?api_key=${process.env.APIKEY}&query=${query}&page=${page}`
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
