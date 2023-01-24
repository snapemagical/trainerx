import React from "react";
import Headerbar from "../../Header/Headerbar";
import Container from "@mui/material/Container";
import Header from "../Header";
import Footer from "../Footer/Footer";
import Grid from "@material-ui/core/Grid";

function Products() {
  return (
    <div className="inner_page">
      <Header />
      <Headerbar />
      <div className="main_column">
        <Container>
          <div>
            <h1 style={{ textAlign: 'center' }}>OUR PRODUCTS</h1>
            <Grid
              container
              spacing={1}
              style={{ alignItems: 'center', marginTop: '50px' }}
            >
              <Grid item sm={12} md={6}>
                <div className="center_img">
                  <img
                    className="img-fluid"
                    src="https://static.wixstatic.com/media/83d722_d2aeaeaed99c45fe803a600b27efcd20~mv2.png/v1/fill/w_460,h_460,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Trainer%20X%20Logo.png"
                  />
                </div>
              </Grid>
              <Grid item sm={12} md={6}>
                <h2 style={{ textAlign: 'center' }}>TRAINER X</h2>
                <p className="f-15">
                  Trainer X is a Platform to explore reports and dashboards in
                  order to make business decisions and providing agility along
                  with the control for operations, management, aircraft
                  maintenance and finances. It provides an integrated suite of
                  capabilities for an infrastructure agnostic PaaS model.
                </p>
                <p className="f-15">
                  Optimise your business intelligence with Trainer X. Meet both
                  your self-service and enterprise data analytics needs on a
                  single platform.
                </p>
              </Grid>
            </Grid>
            <Grid
              className="mob-col-reb"
              container
              spacing={1}
              style={{
                marginBottom: '50px',
                marginTop: '50px',
                alignItems: 'center',
              }}
            >
              <Grid item sm={12} md={6}>
                <div style={{}}>
                  <h2 style={{ textAlign: 'center' }}> NAUTICS</h2>
                  <p className="f-15">
                    We approached this project carefully, as it was our very
                    first undertaking of this scale. We studied the aviation
                    industry and saw an area overlooked since decades. Focused
                    on building a platform to promote safety and provide aid to
                    the pilots to perform their job with utmost focus, Nautics
                    will soon transform the aviation's future.
                  </p>
                </div>
              </Grid>
              <Grid item sm={12} md={6}>
                <div className="center_img">
                  <img
                    className="img-fluid"
                    src="https://static.wixstatic.com/media/83d722_3dae9c37f25c410baea95582c59015e9~mv2.png/v1/fill/w_460,h_460,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/NAUTICS%20Logo.png"
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Products;
