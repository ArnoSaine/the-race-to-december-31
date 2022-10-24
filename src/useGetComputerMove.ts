import { Moment } from "moment";
import { useState } from "react";
import getComputerMove from "./getComputerMove";

export default function useGetComputerMove(setValue: (date: Moment) => void) {
  const [isThinking, setIsThinking] = useState(false);

  return {
    isThinking,
    getComputerMove(playerMove: Moment | null) {
      setIsThinking(true);
      setTimeout(() => {
        const computerMove = getComputerMove(playerMove as Moment);
        setValue(computerMove);
        setIsThinking(false);
      }, 1000);
    },
  };
}
