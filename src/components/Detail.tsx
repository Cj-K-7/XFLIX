import { useNavigate } from "react-router-dom";
import { imageURL, IMediaDetail } from "../api";
import { Img, Overlay, Row, Selcted } from "./Basic-components";
import Loader from "./Loader";

interface IDetailProps {
  exitTo: string;
  layoutId: string;
  data: IMediaDetail;
}

function Detail({ exitTo, layoutId, data }: IDetailProps) {
  const navigate = useNavigate();
  return (
    <>
      <Overlay
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        onClick={() => navigate(exitTo)}
      />
      <Selcted layoutId={layoutId}>
        {data ? (
          <Row>
            <Img image={imageURL(data?.poster_path || "", "w500")} />
            <div>
              <h1>{data?.original_title || data.original_name}</h1>
              <h2>⭐ {data?.vote_average}</h2>
              <span>{data?.overview}</span>
            </div>
          </Row>
        ) : (
          <Loader />
        )}
      </Selcted>
    </>
  );
}

export default Detail;
