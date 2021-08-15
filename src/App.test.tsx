import { render, screen, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import fireEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import App from "./App";
import axios from "axios";
import usePlayerData from "./hooks/usePlayerData";
import MockAdapter from "axios-mock-adapter";

test("it should make the api call and set the newgame data", async () => {
  const apiData = {
    incorrectLetters: [],
    movesCount: 0,
    sessionId: "71495b2c-0f02-4000-948a-dd7225fb5627",
    wordArray: ["", "", "", ""],
  };
  const mock = new MockAdapter(axios);
  mock.onGet().reply(200, apiData);
  const { result, waitForNextUpdate } = renderHook(() => usePlayerData());
  await waitForNextUpdate();
  act(() => {
    const {
      move,
      isLoading,
      errorCode,
      sessionId,
      wordArray,
      wrongLetters,
      numberOfMoves,
      dispatchMove,
    } = result.current;
    expect(move).toBe(null);
    expect(isLoading).toBe(false);
    expect(errorCode).toBe(0);
    expect(sessionId).toBe(apiData.sessionId);
    expect(numberOfMoves).toBe(0);
    expect(wordArray).toStrictEqual(apiData.wordArray);
    expect(wrongLetters).toStrictEqual([]);
    expect(dispatchMove).toBeInstanceOf(Function);
  });
});

test("it should update hangman figure and keyboad after incorrect move", async () => {
  const apiData = {
    incorrectLetters: ["a"],
    movesCount: 1,
    sessionId: "71495b2c-0f02-4000-948a-dd7225fb5627",
    wordArray: ["", "", "", ""],
  };
  const mock = new MockAdapter(axios);
  mock.onGet().reply(200, apiData);
  render(<App />);
  const key = screen.getByTestId("_alpha_0");
  expect(key).toBeVisible();
  fireEvent.click(key);
  await waitFor(() => {
    expect(key).not.toHaveTextContent("a");
    const hangmanHead = screen.getByTestId("hangmanHead");
    expect(hangmanHead).toHaveStyle("stroke: #fff");
  });
});
