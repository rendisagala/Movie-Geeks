require("dotenv").config();
const axios = require("axios");

exports.companies = async (query, data) => {
  // return companies id
  const company = await axios.get(
    `${process.env.API}/search/company?api_key=${process.env.APIKEY}&query=${query}`
  );
  let result = [];
  try {
    for (let i = 0; i < company.data.results.length; i++) {
      result.push(company.data.results[i].id);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};

exports.keywords = async (query, data) => {
  //returns keywords id
  const keyword = await axios.get(
    `${process.env.API}/search/keyword?api_key=${process.env.APIKEY}&query=${query}`
  );
  let result = [];
  try {
    for (let i = 0; i < keyword.data.results.length; i++) {
      result.push(keyword.data.results[i].id);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};

exports.movie = async (query, data) => {
  //returns movies id
  const movie = await axios.get(
    `${process.env.API}/search/movie?api_key=${process.env.APIKEY}&query=${query}`
  );
  let result = [];
  try {
    for (let i = 0; i < movie.data.results.length; i++) {
      result.push(movie.data.results[i].id);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};

exports.multiSearch = async (query, data) => {
  //returns movies and tv(S) id
  const multi = await axios.get(
    `${process.env.API}/search/multi?api_key=${process.env.APIKEY}&query=${query}`
  );
  let result = [];
  try {
    for (let i = 0; i < multi.data.results.length; i++) {
      result.push(multi.data.results[i].id);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};

exports.person = async (query, data) => {
  //returns person id
  const person = await axios.get(
    `${process.env.API}/search/person?api_key=${process.env.APIKEY}&query=${query}`
  );
  let result = [];
  try {
    for (let i = 0; i < person.data.results.length; i++) {
      result.push(person.data.results[i].id);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};

exports.tv = async (query, data) => {
  //returns tv id
  const tv = await axios.get(
    `${process.env.API}/search/tv?api_key=${process.env.APIKEY}&query=${query}`
  );
  let result = [];
  try {
    for (let i = 0; i < tv.data.results.length; i++) {
      result.push(tv.data.results[i].id);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};
