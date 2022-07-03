require("dotenv").config();
const axios = require("axios");

exports.companies = async (query, data) => {
  // return companies id
  await axios
    .get(
      `${process.env.API}/search/company?api_key=${process.env.APIKEY}&query=${query}`
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

exports.keywords = async (query, data) => {
  //returns keywords id
  await axios
    .get(
      `${process.env.API}/search/keyword?api_key=${process.env.APIKEY}&query=${query}`
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

exports.movie = async (query, data) => {
  //returns movies id
  await axios
    .get(
      `${process.env.API}/search/movie?api_key=${process.env.APIKEY}&query=${query}`
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

exports.multiSearch = async (query, data) => {
  //returns movies and tv(S) id
  await axios
    .get(
      `${process.env.API}/search/multi?api_key=${process.env.APIKEY}&query=${query}`
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

exports.person = async (query, data) => {
  //returns person id
  await axios
    .get(
      `${process.env.API}/search/person?api_key=${process.env.APIKEY}&query=${query}`
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

exports.tv = async (query, data) => {
  //returns tv id
  await axios
    .get(
      `${process.env.API}/search/tv?api_key=${process.env.APIKEY}&query=${query}`
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
