import styled from "styled-components";
interface LoaderProps {
  isLoading: boolean;
}

function Loader({ isLoading }: LoaderProps) {
  return (
    <>
      {isLoading && (
        <Overlay>
          <LoaderContainer>
            <SpinnerContainer>
              <Svg viewBox="25 25 50 50">
                <Circle
                  cx="50"
                  cy="50"
                  r="20"
                  fill="none"
                  stroke-width="2"
                  color="#fff"
                  stroke-miterlimit="10"
                ></Circle>
              </Svg>
            </SpinnerContainer>
            <span>Loading ....</span>
          </LoaderContainer>
        </Overlay>
      )}
    </>
  );
}

const Overlay = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderContainer = styled.div`
  color: #fff;
`;

const SpinnerContainer = styled.div`
  position: relative;
  margin: 0px auto 10px auto;
  width: 50px;
  max-height: 100%;

  ::before {
    content: "";
    display: block;
    padding-top: 100%;
  }
`;

const Svg = styled.svg`
  animation: rotate 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  font-size: 1.2em;
  color: #fff;

  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const Circle = styled.circle`
  animation: strokeAnimation 1.5s ease-in-out infinite;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke: #fff;

  @keyframes strokeAnimation {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }

    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }
`;

export default Loader;
