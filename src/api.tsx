const APIKey = "34161cf6d910bb2a80ad0681aa12722e";
const basicURL = "https://api.themoviedb.org/3/";

export interface IMedia {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title : string | null;
  original_name : string | null;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  popularity: number;
  media_typ: string;
}



export interface IResult {
  page: number;
  results: IMedia[];
  total_page: number;
  total_results: number;
}

export const imageURL = (path: string, format?:string) =>
  `https://image.tmdb.org/t/p/${format ? format : "original"}${path}`;

export const fetchTrending = () => {
  return fetch(`${basicURL}trending/all/week?api_key=${APIKey}`).then((res) =>
    res.json()
  );
};
