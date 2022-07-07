require("dotenv").config();
const axios = require("axios");

exports.details = async (id, season, data) => {
  //air_date, crew, guest_stars, name, overview, id, production_code, season_number, still_path, vote_average_, vote_count
  await axios
    .get(
      `${process.env.API}/tv/${id}/season/${season}?api_key=${process.env.APIKEY}`
    )
    .then((results) => {
      return data(results.data.id);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.images = async (id, season, data) => {
  await axios
    .get(
      `${process.env.API}/tv/${id}/season/${season}/images?api_key=${process.env.APIKEY}`
    )
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.posters.length; i++) {
        if (results.data.backdrops[i].file_path !== null) {
          result.push(
            `${process.env.IMAGE}${results.data.backdrops[i].file_path}`
          );
        } else {
          result.push("sH6030EbSzOUTFFZrpnTdSpeNP0.jpg");
        }
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};

exports.videos = async (id, season, data) => {
  // return youtube link
  await axios
    .get(
      `${process.env.API}/tv/${id}/season/${season}/videos?api_key=${process.env.APIKEY}`
    )
    .then((results) => {
      let result = [];
      for (let i = 0; i < results.data.results.length; i++) {
        if (results.data.results[i]["type"] == "Trailer") {
          result.push(`https://youtu.be/${results.data.results[i].key}`);
        }
      }
      return data(result);
    })
    .catch((error) => {
      console.log(error);
      return data(error);
    });
};
