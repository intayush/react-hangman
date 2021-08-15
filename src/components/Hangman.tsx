import styled from "styled-components";
import { memo } from "react";

interface HangmanProps {
  moves: number;
  gameOver: boolean;
}
const Hangman = ({ moves, gameOver }: HangmanProps) => {
  const isWinner = gameOver && moves < 6;
  return (
    <HangmanWrapper>
      <Svg x="0px" y="0px" viewBox="0 0 236 330">
        <Line
          greyed={false}
          hidden={false}
          x1="0"
          y1="330"
          x2="236"
          y2="330"
        ></Line>
        <Line
          greyed={false}
          hidden={false}
          x1="59"
          y1="0"
          x2="59"
          y2="330"
        ></Line>
        <Line
          greyed={false}
          hidden={false}
          x1="139.4"
          y1="53.5"
          x2="139.4"
          y2="0"
        ></Line>
        <Line
          greyed={false}
          hidden={false}
          x1="58"
          y1="2.5"
          x2="139.4"
          y2="2.5"
        ></Line>
        {/**Greys */}
        <Line
          greyed={moves < 3}
          hidden={isWinner}
          x1="139.4"
          y1="133.9"
          x2="121.6"
          y2="212.4"
        ></Line>
        <Line
          greyed={moves < 4}
          hidden={isWinner}
          x1="139.4"
          y1="134.3"
          x2="154.2"
          y2="210.8"
        ></Line>
        <Line
          greyed={moves < 5}
          hidden={isWinner}
          x1="139.4"
          y1="218.7"
          x2="167.5"
          y2="291.4"
        ></Line>
        <Line
          greyed={moves < 6}
          hidden={isWinner}
          x1="139.4"
          y1="218.7"
          x2="114.2"
          y2="299.3"
        ></Line>
        <Line
          greyed={moves < 2}
          hidden={isWinner}
          x1="139.4"
          y1="124.7"
          x2="139.4"
          y2="218.7"
        ></Line>
        <Circle
          data-testid="hangmanHead"
          greyed={moves < 1}
          hidden={isWinner}
          cx="139.4"
          cy="89.1"
          r="35.6"
        ></Circle>
        {/**Loser */}
        <Line
          greyed={false}
          hidden={moves < 6}
          x1="122.9"
          y1="83.4"
          x2="131.1"
          y2="91.6"
        ></Line>
        <Line
          greyed={false}
          hidden={moves < 6}
          x1="122.6"
          y1="91.9"
          x2="131.6"
          y2="82.9"
        ></Line>
        <Line
          greyed={false}
          hidden={moves < 6}
          x1="147"
          y1="83.5"
          x2="155.3"
          y2="91.8"
        ></Line>
        <Line
          greyed={false}
          hidden={moves < 6}
          x1="146.8"
          y1="92"
          x2="155.8"
          y2="83"
        ></Line>
        <Path
          greyed={false}
          hidden={moves < 6}
          d="M126.4,106.5c0-1.8,5.6-3.2,12.4-3.2"
        ></Path>
        <Path
          greyed={false}
          hidden={moves < 6}
          d="M150.9,106.5c0-1.8-5.6-3.2-12.4-3.2"
        ></Path>
        {/** isWinner */}
        <Circle
          greyed={false}
          hidden={!isWinner}
          cx="167"
          cy="119.9"
          r="35.6"
        ></Circle>
        <Line
          greyed={false}
          hidden={!isWinner}
          x1="167"
          y1="169"
          x2="231.8"
          y2="96.7"
        ></Line>
        <Line
          greyed={false}
          hidden={!isWinner}
          x1="167"
          y1="155.5"
          x2="167"
          y2="249.4"
        ></Line>
        <Line
          greyed={false}
          hidden={!isWinner}
          x1="167"
          y1="249.4"
          x2="180.4"
          y2="330.5"
        ></Line>
        <Line
          greyed={false}
          hidden={!isWinner}
          x1="167"
          y1="249.4"
          x2="142.4"
          y2="330.5"
        ></Line>
        <Line
          greyed={false}
          hidden={!isWinner}
          x1="167"
          y1="169"
          x2="92.8"
          y2="106.4"
        ></Line>
        <Path
          greyed={false}
          hidden={!isWinner}
          d="M151.8,133.7c0,4.2,6.9,7.7,15.4,7.7"
        ></Path>
        <Path
          greyed={false}
          hidden={!isWinner}
          d="M182.2,133.7c0,4.2-6.9,7.7-15.4,7.7"
        ></Path>
        <Line
          greyed={false}
          hidden={!isWinner}
          x1="151"
          y1="118.1"
          x2="161.1"
          y2="118.1"
        ></Line>
        <Line
          greyed={false}
          hidden={!isWinner}
          x1="173.1"
          y1="118.1"
          x2="183.2"
          y2="118.1"
        ></Line>
      </Svg>
    </HangmanWrapper>
  );
};

const HangmanWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
  @media screen and (max-width: 786px) {
    height: 40vh;
  }
`;

const Svg = styled.svg`
  height: 100%;
  fill: transparent;
  stroke-width: 4px;
  stroke-linecap: round;
`;

const Line = styled.line<{
  greyed: boolean;
  hidden: boolean;
}>`
  opacity: ${({ hidden }) => (hidden ? "0" : "1")};
  stroke: ${({ greyed }) => (greyed ? "#30635e" : "#fff")};
`;

const Circle = styled.circle<{
  greyed: boolean;
  hidden: boolean;
}>`
  opacity: ${({ hidden }) => (hidden ? "0" : "1")};
  stroke: ${({ greyed }) => (greyed ? "#30635e" : "#fff")};
`;

const Path = styled.path<{
  greyed: boolean;
  hidden: boolean;
}>`
  opacity: ${({ hidden }) => (hidden ? "0" : "1")};
  stroke: ${({ greyed }) => (greyed ? "#30635e" : "#fff")};
`;
export default memo(Hangman);
