require("dotenv").config();
const axios = require("axios");

exports.details = async (id, data) => {
  // returns keyword name
  await axios
    .get(`${process.env.API}/keyword/${id}?api_key=${process.env.APIKEY}`)
    .then((results) => {
      return data(results.data.name);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.movie = async (id, data) => {
  // returns movie id
  await axios
    .get(
      `${process.env.API}/keyword/${id}/movies?api_key=${process.env.APIKEY}`
    )
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.results.length; i++) {
        result.push(results.data.results[i].id);
        return data(result);
      }
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};
