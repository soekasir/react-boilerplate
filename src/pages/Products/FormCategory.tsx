import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useContext } from "react";
import { apiCreateCategory } from "../../api/axios/product";
import { NotifContext } from "../../context";

const FormCategory = () => {
  const notifContext = useContext(NotifContext);
  const [formCategory, setFormCategory] = useState({
    name: "",
  });

  const submit = () => {
    apiCreateCategory(formCategory.name)?.then((res)=>{
      notifContext?.setConfig({
        message: res.message,
        type:'success',
        open:true
      })
    }).catch((err)=>{
      notifContext?.setConfig({
        message: err.response.data.message,
        type:'error',
        open:true
      })
    })
  };

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
          width: 700,
          padding: "24px",
        }}
      >
        <Grid display="flex" mb={4}>
          <Typography variant="h2">Create Category</Typography>
        </Grid>
        <Grid display="flex" direction="column" gap={2} width="70%">
          <TextField
            type="text"
            label="category name"
            variant="outlined"
            onChange={(e) => {
              setFormCategory((prev) => ({ ...prev, name: e.target.value }));
            }}
            style={{
              width: 300,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ width: "70px" }}
            onClick={submit}
          >
            Create
          </Button>
        </Grid>
      </Paper>
    </div>
  );
};

export default FormCategory;
