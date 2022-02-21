import styled from "styled-components";

const PositionBox = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Circle = styled.div`
  display: inline-block;
  width: 100px;
  height: 100px;
  &::after {
    content: " ";
    display: block;
    width: 100px;
    height: 100px;
    margin: 8px;
    border-radius: 50%;
    border-width: 6px;
    border-style: solid;
    border-color: #FFFFFF60 transparent #FFFFFF60 transparent;
    animation: lds-ring 1.2s ease-in-out infinite;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
      border-color: #FFFFFF transparent #FFFFFF transparent;
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function Loader() {
  return (
    <PositionBox>
      <Circle>
        <div />
        <div />
        <div />
        <div />
      </Circle>
    </PositionBox>
  );
}

export default Loader;
