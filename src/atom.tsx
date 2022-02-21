import { atom } from "recoil";

export const indexAtom = atom({
    key: "indexKey",
    default: 0,
});

export const isMovieAtom = atom({
    key: 'mediaTypeKey',
    default: false
})