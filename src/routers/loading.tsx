import { CircularProgress, Grid } from "@mui/material";

export default function Loading(){
  return (
    <>
            <Grid display="flex" justifyContent="center" mt={2}>
              <CircularProgress />
            </Grid>
    </>
  )
}