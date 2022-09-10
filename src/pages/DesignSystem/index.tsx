import { Button, Grid, Paper, Typography } from "@mui/material";
import { ColorsVariant } from "../../references/type/mui";

const colors=['primary','secondary','error','success','warning','info'] as ColorsVariant[];

function Buttons() {
  return (
      <Grid container columnGap={2} gap={1}>
        {colors.map((color)=>{
          if(color) return <Grid>
            <Button variant="contained" color={color}>{color}</Button>
          </Grid>;
        })}
      </Grid>
  );
}

export default function DesignSystemExample(){
  return(
    <>
      <Paper sx={{maxWidth:200,padding:2}}>
        <Grid style={{textAlign:"center"}} mb={2}>
          <Typography variant="subtitle2">
            Variant Button
          </Typography>
        </Grid>
        <Grid container justifyContent="center">
          <Buttons/>
        </Grid>
      </Paper>
    </>
  )
}