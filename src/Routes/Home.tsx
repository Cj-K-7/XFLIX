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

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) :  data? (
        <>
          <Main image={imageURL(data.results[index].backdrop_path || "")}>
            <Banner>
              <Title>{data?.results[index].title}</Title>
              <OverView>
                {truncating(data.results[index].overview as string, 240)}
              </OverView>
            </Banner>
          </Main>
          <Slider data={data.results}/>
        </>
      ) : <Loader/>}
    </Container>
  );
}

export default Home;
