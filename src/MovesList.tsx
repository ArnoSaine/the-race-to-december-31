import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Moment } from "moment";

export interface Move {
  player: string;
  date: Moment;
}

interface Props {
  moves: Move[];
}

export default function MovesList({ moves }: Props) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {moves.map((move, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={move.player}
            secondary={move.date.format("LL")}
          />
        </ListItem>
      ))}
    </List>
  );
}
