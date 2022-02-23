import { AnimatePresence, useTransform, useViewportScroll } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { tvFetches, imageURL, IResult } from "../api";
import { categoryAtom, mediaAtom } from "../atom";
import { Category, Container, Main } from "../components/Basic-components";
import Detail from "../components/Detail";
import Loader from "../components/Loader";
import Slider from "../components/Slider";

const Contents = styled.div`
  width: 100vw;
  margin-top: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function TV() {
  const [media, setMedia] = useRecoilState(mediaAtom);
  const category = useRecoilValue(categoryAtom);
  const { isLoading: isLoadingTop, data: dataTop } = useQuery<IResult>(
    ["tv", "Top"],
    tvFetches.fetchTvTopRate
  );
  const { isLoading: isLoadingPop, data: dataPop } = useQuery<IResult>(
    ["tv", "Pop"],
    tvFetches.fetchPopTv
  );

  const isLoading = isLoadingPop && isLoadingTop;
  const data = dataPop && dataTop;
  const selected = useMatch(`/tv/${media.id}`);
  const tvPage = "/tv";

  const { scrollYProgress } = useViewportScroll();
  const filter = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["opacity(100%)", "opacity(12%)"]
  );

  useEffect(() => {
    if (!isLoading && dataTop) {
      setMedia(dataTop.results[0]);
    }
  }, [isLoading, dataTop, setMedia]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : data ? (
        <Container>
          <Main
            key={media.backdrop_path}
            style={{filter}}
            image={imageURL(media.backdrop_path)}
          />
          <Contents>
            <Category>TOP RATED</Category>
            <Slider
              category="top"
              data={dataTop.results}
              through={tvPage}
            ></Slider>
            <Category>POPULAR</Category>
            <Slider
              category="popular"
              data={dataPop.results}
              through={tvPage}
            ></Slider>
          </Contents>
          <AnimatePresence>
            {selected ? (
              <Detail
                exitTo={tvPage}
                layoutId={category + media.id}
                media={media}
                mediatype="tv"
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

export default TV;
