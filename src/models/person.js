require("dotenv").config();
const axios = require("axios");

exports.details = async (id, data) => {
  // also_known_as, biography, birthday, gender, id, name, place_of_birth, popularity, profile_path
  await axios
    .get(`${process.env.API}/person/${id}?api_key=${process.env.APIKEY}`)
    .then((results) => {
      let result = [];
      return data(results.data);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.images = async (id, data) => {
  // returns person image
  await axios
    .get(`${process.env.API}/person/${id}/images?api_key=${process.env.APIKEY}`)
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.profiles.length; i++) {
        result.push(
          `${process.env.IMAGE}${results.data.profiles[i].file_path}`
        );
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.popular = async (data) => {
  //   returns person id
  await axios
    .get(`${process.env.API}/person/popular?api_key=${process.env.APIKEY}`)
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

exports.movie = async (id, data) => {
  //   returns person id
  await axios
    .get(
      `${process.env.API}/person/${id}/movie_credits?api_key=${process.env.APIKEY}`
    )
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.cast.length; i++) {
        result.push(results.data.cast[i].id);
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.tv = async (id, data) => {
  //   returns person id
  await axios
    .get(
      `${process.env.API}/person/${id}/tv_credits?api_key=${process.env.APIKEY}`
    )
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.cast.length; i++) {
        result.push(results.data.cast[i].id);
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};
