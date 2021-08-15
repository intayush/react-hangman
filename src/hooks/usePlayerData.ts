import axios, { AxiosResponse } from "axios";
import { useEffect, useState, useCallback } from "react";
import PlayerDataResponse from "../typings/PlayerData";

const usePlayerData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorCode, setErrorCode] = useState<number>(0);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");
  const [currentWord, setCurrentWord] = useState<string[]>([]);
  const [numberOfMoves, setNumberOfMoves] = useState<number>(0);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [move, setMove] = useState<string | null>(null);
  const [reset, setReset] = useState<boolean>(false);

  const fetchPlayerData = useCallback(async () => {
    const localSessionId = localStorage.getItem("HANGMAN_SESSION_ID");
    setIsLoading(true);
    try {
      const {
        data: { sessionId, wordArray, movesCount, incorrectLetters },
        status,
      } = (await axios.get("api/move", {
        params: {
          sessionId: localSessionId,
          move,
          reset: reset ? 1 : null,
        },
      })) as AxiosResponse<PlayerDataResponse>;
      if (status === 200) {
        if (!localSessionId || localSessionId !== sessionId) {
          localStorage.setItem("HANGMAN_SESSION_ID", sessionId);
        }
        if ((move && wordArray.includes(move)) || !move) {
          setCurrentWord(wordArray);
        }
        if ((move && incorrectLetters.includes(move)) || !move) {
          setWrongLetters(incorrectLetters);
        }
        reset && setReset(false);
        setCurrentSessionId(sessionId);
        setNumberOfMoves(movesCount);
        setIsLoading(false);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        /*If session id does not exist on server get a new one */
        try {
          const {
            data: { sessionId, wordArray, movesCount },
          } = (await axios.get(
            "api/move"
          )) as AxiosResponse<PlayerDataResponse>;
          setCurrentSessionId(sessionId);
          setCurrentWord(wordArray);
          setNumberOfMoves(movesCount);
          setIsLoading(false);
          localStorage.setItem("HANGMAN_SESSION_ID", sessionId);
        } catch (error) {
          typeof error === "object"
            ? setErrorCode(Number(error.response?.status ?? 0))
            : setErrorCode(500);
          setIsLoading(false);
        }
      } else {
        typeof error === "object"
          ? setErrorCode(Number(error.response?.status ?? 0))
          : setErrorCode(500);
        setIsLoading(false);
      }
    }
  }, [
    setIsLoading,
    setErrorCode,
    setCurrentSessionId,
    setCurrentWord,
    setNumberOfMoves,
    setWrongLetters,
    move,
    reset,
  ]);

  const dispatchMove = ({
    currentMove,
    reset,
  }: {
    currentMove: string;
    reset: boolean;
  }) => {
    errorCode!==0 && setErrorCode(0);
    setReset(reset);
    setMove(currentMove);
  };

  useEffect(() => {
    fetchPlayerData();
  }, [fetchPlayerData]);

  return {
    move,
    isLoading,
    errorCode,
    sessionId: currentSessionId,
    wordArray: currentWord,
    wrongLetters,
    numberOfMoves,
    dispatchMove,
  };
};

export default usePlayerData;
