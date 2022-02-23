import { AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  fetchSearching,
  IResult,
} from "../api";
import { mediaAtom } from "../atom";
import {
  Category,
  Container,
} from "../components/Basic-components";
import Detail from "../components/Detail";
import Loader from "../components/Loader";
import Slider from "../components/Slider";

const SearchedContents = styled.div`
  width: 100vw;
  margin-top: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const NoResult = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Search() {
  //state
  const media = useRecoilValue(mediaAtom);

  //routers
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const detail = new URLSearchParams(location.search).get("detail");
  const path = `/search?keyword=${keyword}`

  //query
  const { isLoading, data } = useQuery<IResult>(
    ["search", keyword],
    fetchSearching
  );


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : data ? (
        data.results.length === 0 ? (
          <NoResult>
            <h1 style={{ fontSize: 32, letterSpacing: 2 }}>Sorry, no Result</h1>
          </NoResult>
        ) : (
          <Container>
            <SearchedContents>
              <Category>Searched Results</Category>
              <Slider
                category="Searched"
                data={data.results}
                through={path}
              />
              <AnimatePresence>
                {detail ? (
                  <Detail exitTo={path} layoutId={detail} media={media} mediatype={media.media_type} />
                ) : null}
              </AnimatePresence>
            </SearchedContents>
          </Container>
        )
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Search;
