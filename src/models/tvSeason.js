require("dotenv").config();
const axios = require("axios");

exports.details = async (id, season, data) => {
  //air_date, crew, guest_stars, name, overview, id, production_code, season_number, still_path, vote_average_, vote_count
  const detail = await axios.get(
    `${process.env.API}/tv/${id}/season/${season}?api_key=${process.env.APIKEY}`
  );
  try {
    return data(detail.data.id);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};

exports.images = async (id, season, data) => {
  const image = await axios.get(
    `${process.env.API}/tv/${id}/season/${season}/images?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < image.data.posters.length; i++) {
      result.push(`${process.env.IMAGE}${image.data.posters[i].file_path}`);
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};

exports.videos = async (id, season, data) => {
  // return youtube link
  const video = await axios.get(
    `${process.env.API}/tv/${id}/season/${season}/videos?api_key=${process.env.APIKEY}`
  );
  let result = [];
  try {
    for (let i = 0; i < video.data.results.length; i++) {
      if (video.data.results[i]["type"] == "Trailer") {
        result.push(`https://youtu.be/${video.data.results[i].key}`);
      }
    }
    return data(result);
  } catch (error) {
    console.log(error);
    return data(error);
  }
};
