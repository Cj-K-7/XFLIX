import {
  AnimatePresence,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  fetchMovieDetail,
  fetchTrending,
  imageURL,
  IMovieDetail,
  IResult,
} from "../api";
import { indexAtom, isMovieAtom } from "../atom";
import {
  Container,
  Main,
  Banner,
  Title,
  OverView,
  Category,
  Sliders,
  Selcted,
  Overlay,
  Row,
  Img,
} from "../components/Basic-components";
import Loader from "../components/Loader";
import Slider from "../components/Slider";

function Home() {
  const index = useRecoilValue(indexAtom);
  const mediaType = useRecoilValue(isMovieAtom);
  const selectedMatch = useMatch("/:mediaID");
  const navigate = useNavigate();
  const queryKey = selectedMatch?.params.mediaID;
  const { isLoading: isLoadingTreding, data: tredingData } = useQuery<IResult>(
    ["media", "trending"],
    fetchTrending
  );
  const { isLoading: isLoadingMovie, data: movieData } = useQuery<IMovieDetail>(
    ["media", queryKey, mediaType],
    fetchMovieDetail
  );
  const isLoading: boolean = isLoadingTreding && isLoadingMovie;
  const { scrollYProgress } = useViewportScroll();
  const bannerOpacity = useTransform(scrollYProgress, [0.1, 0.16], [1, 0]);
  const mainOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.1]);

  const truncating = (str: string, num: number) => {
    return num >= str.length ? str : str.substring(0, num) + " . . .";
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : tredingData ? (
        <Container>
          <Main
            style={{ opacity: mainOpacity }}
            image={imageURL(tredingData.results[index].backdrop_path || "")}
          />
          <Banner style={{ opacity: bannerOpacity }}>
            <Title>
              {tredingData?.results[index].title ||
                tredingData?.results[index].original_name}
            </Title>
            <OverView>
              {truncating(tredingData.results[index].overview as string, 240)}
            </OverView>
          </Banner>
          <Sliders>
            <Category>Trend Now</Category>
            <Slider data={tredingData.results} />
          </Sliders>
          <AnimatePresence>
            {selectedMatch ? (
              <>
                <Overlay
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  onClick={() => navigate("/")}
                />
                <Selcted layoutId={selectedMatch.params.mediaID}>
                  {movieData ? (
                    <Row>
                      <Img
                        image={imageURL(movieData?.poster_path || "", "w500")}
                      />
                      <div>
                        <h1>{movieData?.original_title || movieData.original_name}</h1>
                        <h2>⭐ {movieData?.vote_average}</h2>
                        <span>{movieData?.overview}</span>
                      </div>
                    </Row>
                  ) : <Loader/>}
                </Selcted>
              </>
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
