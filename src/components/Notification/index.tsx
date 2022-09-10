import { Alert, AlertColor, Snackbar, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import { INotifContext, NotifContext } from "../../context";

export default function NotifProvider({
  children
}:{
  children:ReactNode
}) {
  const [config,setConfig]=useState({
    message:'',
    type:'success',
    open:false
  })
  
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setConfig({
      message:'',
      type:'success',
      open:false
    });
  };

  const value={
    config,
    setConfig
  } as INotifContext;

  return (
    <>
    <NotifContext.Provider value={value}>
      {children}
      <Snackbar open={config.open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <Alert onClose={handleClose} severity={config.type as AlertColor??'success'} variant="filled" sx={{ width: '100%' }}>
          <Typography variant="h6">
            {config.message}
          </Typography>
        </Alert>
      </Snackbar>
    </NotifContext.Provider>
    </>
  );
}
