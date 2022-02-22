import {
  AnimatePresence,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  fetchMovieDetail,
  fetchPopMovie,
  fetchTrending,
  imageURL,
  IMediaDetail,
  IResult,
} from "../api";
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
  const media = useRecoilValue(mediaAtom);
  const category = useRecoilValue(categoryAtom);

  //routers
  const selectedMatch = useMatch("/:mediaID");
  const queryKey = selectedMatch?.params.mediaID;

  //query
  const { isLoading: isLoadingTreding, data: tredingData } = useQuery<IResult>(
    ["media", "trending"],
    fetchTrending
  );
  const { isLoading: isLoadingPop, data: popularData } = useQuery<IResult>(
    ["media", "popular"],
    fetchPopMovie
  );
  const { isLoading: isLoadingMedia, data: MediaDetailData } =
    useQuery<IMediaDetail>(
      ["media", queryKey, media.media_type],
      fetchMovieDetail
    );
  const isLoading: boolean = isLoadingTreding && isLoadingMedia && isLoadingPop;

  //animation-motion
  const { scrollYProgress } = useViewportScroll();
  const bannerOpacity = useTransform(scrollYProgress, [0.1, 0.16], [1, 0]);
  const mainOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.1]);

  //utill
  const truncating = (str: string, num: number) => {
    return num >= str.length ? str : str.substring(0, num) + " . . .";
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : tredingData && popularData ? (
        <Container>
          <Main
            key={(media || tredingData.results[0]).backdrop_path}
            style={{ opacity: mainOpacity }}
            image={imageURL(
              (media || tredingData.results[0]).backdrop_path || ""
            )}
          />
          <Banner style={{ opacity: bannerOpacity }}>
            <Title>
              {media
                ? media.original_title || media.original_name
                : tredingData?.results[0].original_title ||
                  tredingData?.results[0].original_name}
            </Title>
            <OverView>
              {truncating(
                (media || tredingData.results[0]).overview as string,
                240
              )}
            </OverView>
          </Banner>
          <Sliders>
            <Category>Trend Now</Category>
            <Slider category="trend" data={tredingData.results} path={""} />
          </Sliders>
          <Sliders>
            <Category>Popular Movies</Category>
            <Slider category="pop" data={popularData.results} path={""} />
          </Sliders>
          <AnimatePresence>
            {selectedMatch && MediaDetailData ? (
              <Detail
                exitTo={"/"}
                layoutId={category + selectedMatch.params.mediaID}
                data={MediaDetailData}
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
