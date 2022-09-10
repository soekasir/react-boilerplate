import { Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useState } from "react";
// import DesignSystemExample from "../pages/DesignSystem";

export const DevTool = ({ handleThemeMode }: { handleThemeMode: (theme:"normal" | "dark")=>void }) => {
  const [open, setOpen] = useState(false);

  const themeButton = (
    <>
      <Button color="info" onClick={() => {
        handleThemeMode("dark");
      }} variant="contained">dark</Button>
      <Button color="info" onClick={() => {
        handleThemeMode("normal");
      }} variant="contained">ligth</Button>
    </>
  )

  return <div
    style={{
      position: "fixed",
      top: "20%",
      right: "0px",
      display: "flex",
      flexDirection:"column",
      justifyContent:"flex-end",
      backgroundColor: "#30303033",
      padding: open?"16px":"2px",
      zIndex:99999
    }}
  >
    <Grid>
      {open ? <>
        <IconButton onClick={()=>setOpen(!open)}>
          <ArrowRightIcon />
        </IconButton>
      </>
        : <IconButton onClick={()=>setOpen(!open)}>
          <ArrowLeftIcon />
        </IconButton>
      }
    </Grid>
    {
        open && (
          <>
            <Paper style={{padding:2}}>
              <Grid>
                <Typography variant="subtitle2" textAlign="center">devTool</Typography>
              </Grid>
              <Grid container gap={1} mt={2}>
                {themeButton}
              </Grid>
            </Paper>
            {/* <Grid mt={2}>
              <DesignSystemExample/>
            </Grid> */}
          </>
        )
    }
  </div>
}