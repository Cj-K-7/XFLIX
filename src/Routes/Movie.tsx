import { AnimatePresence, useTransform, useViewportScroll } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { movieFetches, imageURL, IResult } from "../api";
import { categoryAtom, mediaAtom } from "../atom";
import { Banner, Category, Container, Main, OverView, Title } from "../components/Basic-components";
import Detail from "../components/Detail";
import Loader from "../components/Loader";
import Slider from "../components/Slider";
import { truncating } from "./Home";

const MovieContents = styled.div`
  width: 100vw;
  margin-top: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function Movie() {
  const [media, setMedia] = useRecoilState(mediaAtom);
  const category = useRecoilValue(categoryAtom);
  const { isLoading, data } = useQuery<IResult>(
    ["movie", "upcoming"],
    movieFetches.fetchMovieUpcoming
  );
  const selected = useMatch(`/movie/${media.id}`);
  const moviePage = "/movie";

  const { scrollYProgress } = useViewportScroll();
  const opacity = useTransform(scrollYProgress, [0.1, 0.16], [1, 0]);
  const filter = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["opacity(100%)", "opacity(12%)"]
  );
  useEffect(() => {
    if (!isLoading && data) {
      setMedia(data.results[0]);
    }
  }, [isLoading,data,setMedia]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : data ? (
        <Container>
          <Main
            key={media.backdrop_path}
            style={{ filter }}
            image={imageURL(
              media.backdrop_path || data.results[0].backdrop_path
            )}
          />
          <MovieContents>
            <Banner style={{opacity, marginTop : -180, marginBottom: -250}}>
              <Title>{media.title || media.name}</Title>
              <OverView>{truncating(media.overview, 220)}</OverView>
            </Banner>
            <Category>UPCOMING</Category>
            <Slider
              category="upcoming"
              data={data?.results}
              through={moviePage}
            ></Slider>
          </MovieContents>
          <AnimatePresence>
            {selected ? (
              <Detail
                exitTo={moviePage}
                layoutId={category + media.id}
                media={media}
                mediatype="movie"
              />
            ) : null}
          </AnimatePresence>
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Movie;
