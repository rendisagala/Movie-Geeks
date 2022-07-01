require("dotenv").config();
const axios = require("axios");

// time line trending = 7 DAYS

exports.movie = async (query, data) => {
  //returns movie id
  const movie = await axios.get(
    `${process.env.API}/trending/movie/week?api_key=${process.env.APIKEY}&query=${query}`
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

exports.tv = async (query, data) => {
  //returns tv id
  const tv = await axios.get(
    `${process.env.API}/trending/tv/week?api_key=${process.env.APIKEY}&query=${query}`
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

exports.person = async (query, data) => {
  //returns person id
  const person = await axios.get(
    `${process.env.API}/trending/person/week?api_key=${process.env.APIKEY}&query=${query}`
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
