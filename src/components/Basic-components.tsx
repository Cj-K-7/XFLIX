import styled from "styled-components";

export const Container = styled.div`
  max-width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 100vh;
    background-image: linear-gradient(
      to right,
      rgba(18, 18, 18, 1) 5px,
      rgba(18, 18, 18, 0.23),
      rgba(18, 18, 18, 0)
    );
  }
  &::after {
    content: "";
    position: absolute;
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

export const Main = styled.div<{ image: string }>`
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  background-image: radial-gradient(
      rgba(18, 18, 18, 0),
      rgba(18, 18, 18, 0.3),
      rgba(18, 18, 18, 0.8)
    ),
    linear-gradient(
      to bottom,
      rgba(18, 18, 18, 0) 55%,
      rgba(18, 18, 18, 0.45) 75%,
      rgba(18, 18, 18, 1)
    ),
    url(${(props) => props.image});
  background-size: cover;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
`;

export const Banner = styled.div`
  margin-left: 50px;
  margin-bottom: -200px;
  width: 40%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-shadow: 0px 0px 4px rgba(18, 18, 18, 0.6);
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
`;
export const Title = styled.div`
  margin-bottom: 20px;
  font-size: 52px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor.highlight};
`;
export const OverView = styled.div`
  font-size: 20px;
`;

export const Category = styled.h1`
  margin-left: 60px;
  margin-bottom:30px;
  font-size: 38px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor.highlight};
`;
