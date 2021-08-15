import styled from "styled-components";
import { memo } from "react";

interface AttempsLeftProps {
  numberOfMoves: number;
}
const AttemptsLeft = ({ numberOfMoves }: AttempsLeftProps) => {
  return (
    <Wrapper>
      <Text>{6 - numberOfMoves} Attpempts Left</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 1em 0;
  display: flex;
  justify-content: center;
`;

const Text = styled.span`
  color: #fff;
`;

export default memo(AttemptsLeft);
