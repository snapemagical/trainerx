import React from "react";
import {  makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from '@mui/material/Container';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },


  inputRoot: {
    color: "inherit",
  },
 
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Header() {
  const classes = useStyles();
 
  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ backgroundColor: "#fff" }}>
      <Container maxWidth="lg">
        <Toolbar className="">
         
        <div className="logo_img" style={{width:'100%',display:'flex', justifyContent:'center', padding:'5px 0'}}>
                <img src="https://static.wixstatic.com/media/83d722_1cb1e3d49a5e4297b7b9a49593d1f5ad~mv2.jpg/v1/fill/w_162,h_80,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/MAV%20Logo_Black.jpg" 
          width="150px"  />
                </div>
          <div className={classes.grow} />
        </Toolbar>
        </Container>
      </AppBar>
     
    </div>
  );
}
