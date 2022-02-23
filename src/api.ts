import dotenv from 'dotenv';

dotenv.config();

const APIKey = process.env.REACT_APP_MOVIEAPI_KEY;
const basicURL = "https://api.themoviedb.org/3/";

export interface IResult {
  page: number;
  results: IMedia[];
  total_page: number;
  total_results: number;
}

export interface IMedia {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string | null;
  original_name: string | null;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  popularity: number;
  media_type: string;
}

export interface IMediaDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: object;
  budget: number;
  genres: object;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string | null;
  original_name: string | null;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object;
  production_countries: object;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: object;
  status: string;
  tagline: string;
  title: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_coun: number;
}

export const imageURL = (path: string, format?: string) =>
  `https://image.tmdb.org/t/p/${format ? format : "original"}${path}`;

export const fetchTrending = () => {
  return fetch(
    `${basicURL}trending/all/week?api_key=${APIKey}&language=ko-KR`
  ).then((res) => res.json());
};

export const fetchSearching = ({ queryKey }: any) => {
  const [, query] = queryKey;
  return fetch(
    `${basicURL}search/multi?api_key=${APIKey}&query=${query}&language=ko-KR`
  ).then((res) => res.json());
};

export const fetchMediaDetail = ({ queryKey }: any) => {
  const [, query, mediaType = "movie"] = queryKey;
  return fetch(
    `${basicURL}${mediaType}/${query}?api_key=${APIKey}&language=ko-KR`
  ).then((res) => res.json());
};

export const movieFetches = {
  fetchMovieUpcoming: () => {
    return fetch(
      `${basicURL}movie/upcoming?api_key=${APIKey}&language=ko-KR`
    ).then((res) => res.json());
  },
  fetchPopMovie: () => {
    return fetch(
      `${basicURL}movie/popular?api_key=${APIKey}&language=ko-KR`
    ).then((res) => res.json());
  },
};

export const tvFetches = {
  fetchTvTopRate: () => {
    return fetch(
      `${basicURL}tv/top_rated?api_key=${APIKey}&language=ko-KR`
    ).then((res) => res.json());
  },
  fetchPopTv: () => {
    return fetch(
      `${basicURL}tv/popular?api_key=${APIKey}&language=ko-KR`
    ).then((res) => res.json());
  },
}