import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { imageURL, IMedia } from "../api";

const SliderTrail = styled.div`
  width: 100vw;
  position:relative;
  top: -200px;
`;
const Cartegory = styled.h1`
  font-size: 32px;
  margin-bottom: 18px;
`;
const Row = styled(motion.div)`
  position: absolute;
  display: flex;
  width: 100vw;
`;
const Poster = styled(motion.div)`
  margin-left: 20px;
  min-width: 300px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  box-shadow: 6px 6px 5px rgba(0,0,0,0.7);
`;
const SelectedPoster = styled(motion.div)`
  position: absolute;
  width: 500px;
  height: fit-content;
`;
const Image = styled(motion.div)<{ image?: string }>`
  height: 180px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
`;
const Card = styled(motion.div)`
  display: flex;
  background-color: ${(props) => props.theme.bgColor.light};
`;
const PosterTitle = styled.h1`
  padding: 12px;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${(props) => props.theme.textColor.highlight};
`;

const posterVar = {
  init: {
    y:0
  },
  click: {
    y:-80,
    transition: {
      duration: 0.3,
    },
  },
};

interface ISliderProps {
  data: IMedia[];
}

const offset = 6;

function Slider({ data }: ISliderProps) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [selectedId, setSelected] = useState<string | null>(null);
  const selectedMedia = data[Number(selectedId) + offset * index];
  const toggleLeaving = () => setLeaving((pre) => !pre);
  const IncreaseIndex = () => {
    if (data) {
      const total = data.length;
      if (leaving) return;
      toggleLeaving();
      setIndex((pre) => (index === Math.floor(total / offset) ? 0 : pre + 1));
    }
  };
  return (
      <SliderTrail onClick={() => IncreaseIndex()}>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            key={index}
            transition={{ type: "tween", duration: 1 }}
          >
            {data
              ?.slice(offset * index, offset * index + offset)
              .map((a, index) => (
                <Poster
                  layoutId={index + ""}
                  onClick={() => setSelected(index + "")}
                  key={a.id}
                >
                  <Image image={imageURL(a.backdrop_path, "w500")} />
                </Poster>
              ))}
          {selectedId && (
            <SelectedPoster
              variants={posterVar}
              animate="click"
              layoutId={selectedId}
              style={{
                position: "relative",
              }}
            >
              <Image image={imageURL(selectedMedia.backdrop_path, "w500")} />
              <Card>
                <PosterTitle>
                  {selectedMedia.original_title || selectedMedia.original_name}
                </PosterTitle>
                <button onClick={() => setSelected(null)}>❌</button>
              </Card>
            </SelectedPoster>
          )}
          </Row>
        </AnimatePresence>
      </SliderTrail>
  );
}

export default Slider;
