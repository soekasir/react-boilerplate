import { Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import lazyPages from "./routers/LazyPages";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Paper
        style={{
          padding: "24px",
        }}
      >
        <Grid display="flex" direction="column" gap={2}>
          {lazyPages.map((page)=>{
            return <Link to={page.path}>{page.name}</Link>
          })}
        </Grid>
      </Paper>
    </div>
  );
}
