import { atom } from "recoil";
import { IMedia } from "./api";

export const mediaAtom = atom<IMedia>({
    key: "mediaKey",
    default: {
        adult: false,
        backdrop_path: "",
        genre_ids: [],
        id: 0,
        original_language: "",
        original_title:  "",
        original_name:  "",
        overview: "",
        poster_path: "",
        release_date: "",
        title: "",
        video: false,
        vote_average: 0,
        vote_count: 0,
        popularity: 0,
        media_type: "movie",
      },
});

export const mediaTypeAtom = atom({
    key: 'mediaTypeKey',
    default: "movie"
})
