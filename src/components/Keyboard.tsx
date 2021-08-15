import styled from "styled-components";
import { memo } from "react";

interface KeyboardProps {
  word: string[];
  wrongLetters: string[];
  letterClickHandler: ({ letter }: { letter: string }) => void;
}

const Keyboard = ({
  word,
  wrongLetters,
  letterClickHandler,
}: KeyboardProps) => {
  const alpha = Array.from(Array(26)).map((e, i) =>
    String.fromCharCode(i + 97)
  );
  return (
    <KeyboardWrapper>
      <Keys>
        {alpha
          .filter((letter) => {
            return !wrongLetters.includes(letter) && !word.includes(letter);
          })
          .map((letter, index) => {
            return (
              <Key
                key={`_alpha_${index}`}
                onClick={() =>
                  letterClickHandler({
                    letter,
                  })
                }
              >
                {letter}
              </Key>
            );
          })}
      </Keys>
    </KeyboardWrapper>
  );
};

const KeyboardWrapper = styled.div`
  width: 100%;
  user-select: none;
  transition: bottom 0.4s;
`;

const Keys = styled.div`
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Key = styled.button`
  height: 45px;
  width: 5em;
  margin: 3px;
  border-radius: 4px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 1em;
  outline: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: top;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  @media screen and (max-width: 786px) {
    width: 3em;
  }
  @media screen and (max-width: 500px) {
    width: 2em;
  }
`;

export default memo(Keyboard);
