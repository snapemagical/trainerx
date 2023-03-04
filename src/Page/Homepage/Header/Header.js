import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";

export default function Header() {
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#fff" }}>
        <Container maxWidth="lg">
          <Toolbar className="">
            <div
              className="logo_img"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "5px 0",
              }}
            >
              <img
                src="https://static.wixstatic.com/media/83d722_1cb1e3d49a5e4297b7b9a49593d1f5ad~mv2.jpg/v1/fill/w_162,h_80,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/MAV%20Logo_Black.jpg"
                width="150px"
              />
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
