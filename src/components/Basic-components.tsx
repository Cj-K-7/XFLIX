import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 100vw;
  height: 100%;
  overflow-x: hidden;
  &::after {
    content: "";
    pointer-events: none;
    position: fixed;
    top: 0;
    right: 0;
    width: 150px;
    height: 100vh;
    background-image: linear-gradient(
      to left,
      rgba(18, 18, 18, 1) 5px,
      rgba(18, 18, 18, 0.23),
      rgba(18, 18, 18, 0)
    );
  }
`;

export const Main = styled(motion.div)<{ image: string }>`
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  background-image: radial-gradient(
      rgba(18, 18, 18, 0),
      rgba(18, 18, 18, 0.1),
      rgba(18, 18, 18, 0.2),
      rgba(18, 18, 18, 0.7),
      rgba(18, 18, 18, 0.8)
    ),
    linear-gradient(
      to bottom,
      rgba(18, 18, 18, 0) 55%,
      rgba(18, 18, 18, 0.3) 75%,
      rgba(18, 18, 18, 1)
    ),
    url(${(props) => props.image});
  background-size: cover;
  animation: fadeIn 1.6s ease-in-out;
  @keyframes fadeIn {
  0% { opacity : 0 }
  100% { opacity : 1 }
}
`;

export const Banner = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 80px;
  width: 40%;
  height: 100vh;
  transition: 0.6s;
`;
export const Title = styled.div`
  margin-bottom: 20px;
  font-size: 52px;
  font-weight: 600;
  height: 50px;
  max-height: 50px;
  white-space: nowrap;
  color: ${(props) => props.theme.textColor.hover};
`;
export const OverView = styled.div`
  font-size: 20px;
  height: 100px;
  max-height: 100px;
  color: ${(props) => props.theme.textColor.highlight};
`;

export const Category = styled.h1`
  position: relative;
  margin-left: 60px;
  margin-bottom: 30px;
  font-size: 38px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor.highlight};
`;

export const Sliders = styled.div`
  position: relative;
  top: -250px;
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(18, 18, 18, 0.6);
`;

export const Selcted = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: min-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  border-radius: 16px;
  background-color: rgba(0,0,0, 1);
  box-shadow: 0px 0px 8px 16px rgba(18,18,18, 0.6);
  div{
    padding: 20px;
    width: 400px;
  }
  h1 {
    font-size: 50px;
    font-weight: bolder;
    margin-bottom: 30px;
  }
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

export const Img = styled.div<{ image: string }>`
  margin: 16px;
  max-width: 320px;
  height: 480px;
  background-image: url(${(props) => props.image});
  background-size: cover;
`;
