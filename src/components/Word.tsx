import styled from "styled-components";
import { memo } from "react";

interface WordProps {
  word: string[];
}

function Word({ word }: WordProps) {
  return (
    <WordContainer>
      <WordWrapper>
        {word.map((letter, index) => {
          return (
            <Letter
              wordLength={word.length}
              visible={Boolean(letter.length)}
              key={`_word_${index}`}
            >
              {letter.length ? letter : ""}
            </Letter>
          );
        })}
      </WordWrapper>
    </WordContainer>
  );
}

const WordContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const WordWrapper = styled.span`
  padding: 0 0.75em;
  white-space: nowrap;
`;

const Letter = styled.span<{
  visible: boolean;
  wordLength: number;
}>`
  display: inline-block;
  border-bottom: 3px solid transparent;
  width: ${({ wordLength }) => (wordLength > 8 ? "0.85em" : "1em")};
  font-size: 1.75em;
  color: #fff;
  vertical-align: top;
  margin-left: 4px;
  height: 1.3em;
  line-height: 1.3em;
  text-align: center;
  overflow: hidden;
  border-color: ${({ visible }) => (visible ? "none" : "#fff")};

  :first-child {
    margin-left: 0;
  }
`;

export default memo(Word);
