import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import moment, { Moment } from "moment";
import { useState } from "react";
import MovesList, { Move } from "./MovesList";
import useGetComputerMove from "./useGetComputerMove";

const isDisallowed = (currentDate: Moment) => (date: Moment) => {
  if (currentDate.month() === date.month()) {
    return currentDate > date;
  }

  return currentDate.date() !== date.date() || date.isBefore(currentDate);
};

export default function StaticDatePickerDemo() {
  const startDate = moment().set("dayOfYear", 1);
  const [value, setValue] = useState(startDate);
  const [moves, setMoves] = useState<Move[]>([]);

  function makeMove(player: string, date: Moment) {
    setValue(date);
    setMoves((dates) => [...dates, { player, date }]);
  }

  const { isThinking, getComputerMove } = useGetComputerMove((value) => {
    makeMove("Computer", value);
  });

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={value}
          minDate={startDate}
          maxDate={moment().set("dayOfYear", 0).add(1, "year")}
          onChange={(value) => {
            makeMove("Player", value as Moment);
            getComputerMove(value);
          }}
          shouldDisableDate={isDisallowed(value)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      {isThinking && "Computer thinking..."}
      <MovesList moves={moves} />
    </>
  );
}
