import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { fetchMediaDetail, imageURL, IMedia, IMediaDetail } from "../api";
import { Img, Overlay, Row, Selcted } from "./Basic-components";
import Loader from "./Loader";

interface IDetailProps {
  exitTo: string;
  layoutId: string;
  media: IMedia;
  mediatype: string;
}

function Detail({ exitTo, layoutId, media, mediatype }: IDetailProps,  ) {
  const navigate = useNavigate();
  const { isLoading: isLoadingMedia, data: MediaDetailData } =
    useQuery<IMediaDetail>(["media", media.id , mediatype], fetchMediaDetail);
  return (
    <>
      {isLoadingMedia ? (
        <Loader />
      ) : (
        <>
          <Overlay
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            onClick={() => navigate(exitTo)}
          />
          <Selcted layoutId={layoutId}>
            {MediaDetailData ? (
              <Row>
                <Img image={imageURL(MediaDetailData.poster_path || "", "w500")} />
                <div>
                  <h1>{MediaDetailData.title || MediaDetailData.name}</h1>
                  <h2>{ MediaDetailData.vote_average === 0 ? null : `⭐ ${MediaDetailData.vote_average}` }</h2>
                  <span>{MediaDetailData.overview}</span>
                </div>
              </Row>
            ) : (
              <Loader />
            )}
          </Selcted>
        </>
      )}
    </>
  );
}

export default Detail;
