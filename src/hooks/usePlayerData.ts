import axios, { AxiosResponse } from "axios";
import { useEffect, useState, useCallback } from "react";
import PlayerDataResponse from "../typings/PlayerData";

const usePlayerData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
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
        baseURL:
          process.env.NODE_ENV === "development"
            ? undefined
            : process.env.REACT_APP_API_URL ??
              "http://radiant-shore-53074.herokuapp.com/",
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
      if (error.response.status === 404) {
        /*If session id does not exist on server get a new one */
        const {
          data: { sessionId, wordArray, movesCount },
        } = (await axios.get("move")) as AxiosResponse<PlayerDataResponse>;
        setCurrentSessionId(sessionId);
        setCurrentWord(wordArray);
        setNumberOfMoves(movesCount);
        localStorage.setItem("HANGMAN_SESSION_ID", sessionId);
      }
      setError(error);
      setIsLoading(false);
    }
  }, [
    setIsLoading,
    setError,
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
    setReset(reset);
    setMove(currentMove);
  };

  useEffect(() => {
    fetchPlayerData();
  }, [fetchPlayerData]);

  return {
    move,
    isLoading,
    error,
    sessionId: currentSessionId,
    wordArray: currentWord,
    wrongLetters,
    numberOfMoves,
    dispatchMove,
  };
};

export default usePlayerData;
