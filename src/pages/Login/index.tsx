import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { apiLogin } from "../../api/axios/login";
import { NotifContext } from "../../context";
import { setToken } from "../../utils/stroge";

const Login = () => {
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const notifContext=useContext(NotifContext)

  const submit=()=>{
    apiLogin(formLogin.email,formLogin.password)?.then((res)=>{
      setToken(res.data.token);
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
  }

  useEffect(() => {
    // console.log(formLogin);
  }, [formLogin]);

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
          height: 700,
          padding: '24px'
        }}
      >
        <Grid display="flex" mb={4}>
          <Typography variant="h2">Login</Typography>
        </Grid>
        <Grid display="flex" direction="column" gap={2} width="70%">
          <TextField
            type="text"
            label="email"
            variant="outlined"
            onChange={(e) => {
              setFormLogin((prev) => ({ ...prev, email: e.target.value }));
            }}
            style={{
              width: 300
            }}
          />
          <TextField
            label="password"
            type="password"
            variant="outlined"
            onChange={(e) => {
              setFormLogin((prev) => ({ ...prev, password: e.target.value }));
            }}
            style={{
              width: 300
            }}
          />
          <Button variant="contained" color="primary" style={{width: "70px"}} onClick={submit}>Login</Button>
        </Grid>
      </Paper>
    </div>
  );
};

export default Login;
