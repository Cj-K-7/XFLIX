import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchTrending, imageURL, IResult } from "../api";
import { indexAtom } from "../atom";
import {
  Container,
  Main,
  Banner,
  Title,
  OverView,
  Category,
} from "../components/Basic-components";
import Loader from "../components/Loader";
import Slider from "../components/Slider";

function Home() {
  const index = useRecoilValue(indexAtom);
  const { isLoading, data } = useQuery<IResult>(
    ["media", "trending"],
    fetchTrending
  );

  const truncating = (str: string, num: number) => {
    return num >= str.length ? str : str.substring(0, num) + " . . .";
  };

  console.log("Home rendered");
  return (
    <>
      {isLoading ? (
        <Loader />
        ) : data ? (
        <Container>
          <Main image={imageURL(data.results[index].backdrop_path || "")} />
          <Banner>
            <Title>{data?.results[index].title}</Title>
            <OverView>
              {truncating(data.results[index].overview as string, 240)}
            </OverView>
          </Banner>

            <Category>Trend Now</Category>
            <Slider data={data.results} />
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Home;
