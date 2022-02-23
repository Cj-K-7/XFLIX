import { motion } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { imageURL, IMedia } from "../api";
import { categoryAtom, mediaAtom } from "../atom";

const Rail = styled.div`
  width: 100vw;
  height: 300px;
  display: flex;
  white-space: nowrap;
`;
const SliderTrail = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: row;
  padding-left: 100px;
  padding-right: 100px;
  width: fit-content;
`;

const PosterCard = styled(motion.div)`
  margin: 0px 12px;
  width: fit-content;
  height: fit-content;
  box-shadow: 6.5px 6.5px 4.2px rgba(0, 0, 0, 0.73);
  cursor: pointer;
`;

const CardImg = styled.div<{ img_url? : string}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 200px;
  ${props=> props.img_url ?
    `background-image: url(${props.img_url});` 
    : `background-color: ${props.theme.bgColor.dark};`
    }
  background-size: cover;
  background-repeat: no-repeat;
`;

const Info = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: -5px;
  width: 300px;
  height: 0px;
  background-color: ${(props) => props.theme.bgColor.dark};
  h1 {
    padding: 0px 16px;
    margin-top: 12px;
    font-size: 26px;
    font-weight: bolder;
    white-space: normal;
  }
  span {
    align-self: flex-end;
    font-weight: 600;
    padding: 12px 16px;
  }
  span svg {
    margin-left: 10px;
    width: 30px;
    animation: glow 2.4s 0.6s infinite ease-in-out;
    @keyframes glow {
      0% {
        opacity: 1;
      }
      33% {
        opacity: 0.3;
      }
      66%{
        opacity :1;
      }

      100% {
        opacity: 1;
      }
    }
  }
  span svg:first-child {
    fill: ${(p) => p.theme.red};
    -webkit-filter: drop-shadow(0px 0px 2px #ff0000B2);
    filter: drop-shadow(0px 0px 3px #ff0000B2);
  }
  span svg:last-child {
    fill: ${(p) => p.theme.red};
    -webkit-filter: drop-shadow(0px 0px 2px #ffffffB2);
    filter: drop-shadow(0px 0px 3px #ffffffB2);
  }
`;

//motion variants
const posterVar = {
  init: { scale: 1, y: 0 },
  selected: { scale: 1.25, y: "-150px" },
  exit: { scale: 1, y: 0 },
};
const infoVar = {
  init: { opacity: 0, height: "0px" },
  selected: { opacity: 1, height: "fit-content", transition: { delay: 0.4 } },
  exit: { opacity: 0, height: "0px" },
};

interface ISliderProps {
  category : string,
  data: IMedia[];
  through : string;
}

function Slider({ category, data, through }: ISliderProps) {
  //motion ref
  const dragRef = useRef<HTMLDivElement>(null);

  //state
  const setMedia = useSetRecoilState(mediaAtom);
  const setCategory = useSetRecoilState(categoryAtom);

  //utill
  const navigate = useNavigate();
  const onCardClick = (media: IMedia) => {
    setCategory(category);
    setMedia(media);
    if(through === `${through}&detail=${media.id}`){
      navigate(`${through}&detail=${media.id}`);
    } else {
      navigate(`${through}/${media.id}`)
    }
  };

  return (
    <Rail ref={dragRef}>
      <SliderTrail drag="x" dragConstraints={dragRef}>
        {data.map((media) => (
          <PosterCard
            key={media.id + ""}
            layoutId={category+media.id}
            variants={posterVar}
            initial="init"
            whileHover="selected"
            exit="exit"
            transition={{duration : 0.3 , delay: 0.4 }}
            onMouseEnter={() => setMedia(media)}
          >
            {media.backdrop_path || media.poster_path ? <CardImg img_url={imageURL(media.backdrop_path || media.poster_path , "w500")} /> : <CardImg>No Image</CardImg>}
            <Info variants={infoVar}>
              <h1>{media.title || media.name}</h1>
              <span>
                <svg
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/results?search_query=${
                        media.title || media.name
                      }`,
                      "_blank"
                    )
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#ff0000A0"
                    d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM176 168V344C176 352.7 180.7 360.7 188.3 364.9C195.8 369.2 205.1 369 212.5 364.5L356.5 276.5C363.6 272.1 368 264.4 368 256C368 247.6 363.6 239.9 356.5 235.5L212.5 147.5C205.1 142.1 195.8 142.8 188.3 147.1C180.7 151.3 176 159.3 176 168V168z"
                  />
                </svg>
                <svg
                  onClick={() => onCardClick(media)}
                  
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path fill="#FFFFFFA0" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z" />
                </svg>
              </span>
            </Info>
          </PosterCard>
        ))}
      </SliderTrail>
    </Rail>
  );
}

export default Slider;
