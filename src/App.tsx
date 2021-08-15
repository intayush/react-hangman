import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import usePlayerData from "./hooks/usePlayerData";
import "./App.css";
import Hangman from "./components/Hangman";
import Word from "./components/Word";
import Keyboard from "./components/Keyboard";
import Loader from "./components/Loader";
import AttemptsLeft from "./components/AttemptsLeft";
import Modal from "./components/Modal";

function App() {
  const {
    isLoading,
    error,
    wordArray,
    wrongLetters,
    numberOfMoves,
    dispatchMove,
  } = usePlayerData();

  useEffect(() => {
      setIsModalOpen(!!wordArray.length && (!wordArray.includes("") || numberOfMoves>5));
  }, [wordArray, numberOfMoves])

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const letterClickHandler = useCallback(({ letter }: { letter: string }) => {
    dispatchMove({ currentMove: letter, reset: false });
  }, [dispatchMove]);

  const resetHandler = useCallback(() => {
    dispatchMove({ currentMove: "", reset: true });
  }, [dispatchMove]);

  const playAgainHandler = useCallback(() => {
    resetHandler();
    setIsModalOpen(false);
  }, [resetHandler, setIsModalOpen]);

  return (
    <AppContainer>
      <Loader isLoading={isLoading} />
      <>
        <Hangman moves={numberOfMoves} gameOver={isModalOpen} />
        <ControlsdWrapper>
          <Word word={wordArray} />
          <AttemptsLeft numberOfMoves={numberOfMoves} />
          <Keyboard
            word={wordArray}
            letterClickHandler={letterClickHandler}
            wrongLetters={wrongLetters}
          />
          <FlexWrapper>
            <NewWordButton onClick={resetHandler}>New Word</NewWordButton>
          </FlexWrapper>
        </ControlsdWrapper>
        <Modal
          isVisible={isModalOpen}
          winner={numberOfMoves<5}
          closeHandler={playAgainHandler}
        ></Modal>
      </>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  align-items: center;
  background: #004134;
`;

const ControlsdWrapper = styled.div`
  height: 75vh;
  @media screen and (max-width: 786px) {
    height: 40vh;
  }
`;

const FlexWrapper = styled.div`
  margin: 0.75em;
  display: flex;
  justify-content: center;
`;

const NewWordButton = styled.button`
  border: 1px solid white;
  background: transparent;
  color: white;
  padding: 0.75em 1em;
  border-radius: 3px;
  font-size: 1em;
`;

export default App;
