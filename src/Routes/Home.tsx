import {
  AnimatePresence,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { movieFetches, fetchTrending, imageURL, IResult } from "../api";
import { categoryAtom, mediaAtom } from "../atom";
import {
  Container,
  Main,
  Banner,
  Title,
  OverView,
  Category,
  Sliders,
} from "../components/Basic-components";
import Detail from "../components/Detail";
import Loader from "../components/Loader";
import Slider from "../components/Slider";

function Home() {
  //State
  const [media, setMedia] = useRecoilState(mediaAtom);
  const category = useRecoilValue(categoryAtom);

  //routers
  const selectedMatch = useMatch("/:mediaID");

  //query
  const { isLoading: isLoadingTreding, data: tredingData } = useQuery<IResult>(
    ["media", "trending"],
    fetchTrending
  );
  const { isLoading: isLoadingPop, data: popularData } = useQuery<IResult>(
    ["movie", "popular"],
    movieFetches.fetchPopMovie
  );

  const isLoading: boolean = isLoadingTreding && isLoadingPop;

  //animation-motion
  const { scrollYProgress } = useViewportScroll();
  const opacity = useTransform(scrollYProgress, [0.1, 0.16], [1, 0]);
  const filter = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["opacity(100%)", "opacity(12%)"]
  );

  //utill
  const truncating = (str: string, num: number) => {
    return num >= str.length ? str : str.substring(0, num) + " . . .";
  };
  const homePage = "";

  useEffect(() => {
    if (!isLoadingTreding && tredingData) {
      setMedia(tredingData.results[0]);
    }
  }, [isLoadingTreding, tredingData, setMedia]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : tredingData && popularData ? (
        <Container>
          <Main
            key={media.backdrop_path}
            style={{ filter }}
            image={imageURL(media.backdrop_path)}
          />
          <Banner style={{ opacity }}>
            <Title>{media.title || media.name}</Title>
            <OverView>{truncating(media.overview, 240)}</OverView>
          </Banner>
          <Sliders>
            <Category>Trend Now</Category>
            <Slider
              category="trend"
              data={tredingData.results}
              through={homePage}
            />
          </Sliders>
          <Sliders>
            <Category>Popular Movies</Category>
            <Slider
              category="pop"
              data={popularData.results}
              through={homePage}
            />
          </Sliders>
          <AnimatePresence>
            {selectedMatch ? (
              <Detail
                exitTo={homePage}
                layoutId={category + selectedMatch.params.mediaID}
                media={media}
                mediatype={media.media_type}
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

export default Home;
