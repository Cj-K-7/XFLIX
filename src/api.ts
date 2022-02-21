const APIKey = "34161cf6d910bb2a80ad0681aa12722e";
const basicURL = "https://api.themoviedb.org/3/";

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
  video: boolean;
  vote_average: number;
  vote_count: number;
  popularity: number;
  media_type: string;
}

export interface IResult {
  page: number;
  results: IMedia[];
  total_page: number;
  total_results: number;
}

export const imageURL = (path: string, format?: string) =>
  `https://image.tmdb.org/t/p/${format ? format : "original"}${path}`;

export const fetchTrending = () => {
  return fetch(`${basicURL}trending/all/week?api_key=${APIKey}`).then((res) =>
    res.json()
  );
};

export interface IMovieDetail {
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
  video: boolean;
  vote_average: number;
  vote_coun: number;
}

export const fetchMovieDetail = ({queryKey}:any) => {
  const [, query , mediaType] = queryKey;
  return fetch(`${basicURL}${mediaType ? "movie" : "tv"}/${query}?api_key=${APIKey}`).then((res) =>
    res.json()
  );
};
