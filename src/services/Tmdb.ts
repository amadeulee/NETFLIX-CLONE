//API KEY = 893a77bb80325b17c47ba528b0e276ef
//API DATABASE = https://api.themoviedb.org/3
// 38c007f28d5b66f36b9c3cf8d8452a4b
// AIzaSyAr9-z7BWsZIrcf1pgasd2HzjkJDc7ojQE

import axios from "axios";
import { Item } from "../Model";
import { Trailer } from "../TrailerModel";
import { SeriesInfo } from "./../ModalModel";
import { MovieModel } from "./../MovieModel";

const API_KEY = "893a77bb80325b17c47ba528b0e276ef";
const API_BASE_URL = "https://api.themoviedb.org/3";

const generalFetch = async (urlGate: string) => {
  const req = await fetch(`${API_BASE_URL}${urlGate}`);
  const api = await req.json();
  return api;
};

// const generalFetch = async (urlGate: string) => {
//   const req = await axios.create({
//     baseURL: API_BASE_URL,
//   });
//   const json = await req.get(`${urlGate}`);
//   return json;
// };

export default {
  getHomeList: async () => {
    return [
      {
        category: "originals",
        title: "Originais do Netflix",
        items: await generalFetch(
          `/discover/tv?with_networks=213&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        category: "trending",
        title: "Recomendados para você",
        items: await generalFetch(
          `/trending/all/week?language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        category: "toprated",
        title: "Em Alta",
        items: await generalFetch(
          `/movie/top_rated?language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        category: "action",
        title: "Ação",
        items: await generalFetch(
          `/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        category: "comedy",
        title: "Comédia",
        items: await generalFetch(
          `/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        category: "horror",
        title: "Terror",
        items: await generalFetch(
          `/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        category: "romance",
        title: "Romance",
        items: await generalFetch(
          `/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        category: "documentary",
        title: "Documentários",
        items: await generalFetch(
          `/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`
        ),
      },
    ];
  },
  getMovieInfo: async (movieId: string, type: string) => {
    let informations: SeriesInfo = await generalFetch(
      `/${type}/${movieId}?language=pt-BR&api_key=${API_KEY}`
    );

    return informations;
  },
  getModalInfo: async (movieId: string, type: string) => {
    switch (type) {
      case "movie":
        let informations: SeriesInfo & MovieModel = await generalFetch(
          `/${type}/${movieId}?language=pt-BR&api_key=${API_KEY}`
        );
        return informations;

      case "tv":
        let informations1: MovieModel & SeriesInfo = await generalFetch(
          `/${type}/${movieId}?language=pt-BR&api_key=${API_KEY}`
        );
        return informations1;
    }
  },
  getSimilarList: async (movieId: string, type: string) => {
    switch (type) {
      case "movie":
        let informations: Item = await generalFetch(
          `/${type}/${movieId}/similar?language=pt-BR&api_key=${API_KEY}`
        );
        return informations;

      case "tv":
        let informations1: Item = await generalFetch(
          `/${type}/${movieId}/similar?language=pt-BR&api_key=${API_KEY}`
        );
        return informations1;
    }
  },
  getItemTrailer: async (movieId: string, type: string) => {
    switch (type) {
      case "movie":
        let informations: Trailer = await generalFetch(
          `/${type}/${movieId}/videos?api_key=${API_KEY}`
        );
        return informations;

      case "tv":
        let informations1: Trailer = await generalFetch(
          `/${type}/${movieId}/videos?api_key=${API_KEY}`
        );
        return informations1;
    }
  },
};
