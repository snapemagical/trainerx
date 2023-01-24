import React from 'react'
import Headerbar from "../../Header/Headerbar";
import Header from "../Header"
import Container from '@mui/material/Container'
import Grid from "@material-ui/core/Grid";
import Aboutslider from "./Aboutslider"
import Footer from '../Footer/Footer';

function About() {
    return (
      <div className="inner_page">
        <Header />
        <Headerbar />
        <div className="main_column">
          <Container>
            <Grid container spacing={2} style={{ alignItems: 'center' }}>
              <Grid item sm={12} md={6}>
                <div className="center_img">
                  <img
                    className="img-fluid"
                    src="https://static.wixstatic.com/media/87a8f35c74b14f98ba0ba1ebbfc4ddf9.jpg/v1/fill/w_460,h_680,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Aircraft%20Maintenance.jpg"
                  />
                </div>
              </Grid>
              <Grid item sm={12} md={6}>
                <h2>ABOUT OUR BUSINESS</h2>
                <p className="f-15">
                  MAV AeroSafety Consultancy LLP is a technology company
                  catering to the aviation industry along with consultation on
                  various ends as a part of our services. In our experience, we
                  have seen that the aviation industry lags far behind when it
                  comes to using technology to aid in Pilot decision-making,
                  Flying Schools and Airlines.
                </p>
                <p className="f-15">
                  MAV AeroSafety's mission is to help the aviation industry to
                  work more efficiently and to guide them on various fronts. It
                  aims to become the go-to platform for services such as license
                  renewals to Training Analytics, from flight publications to
                  digital charts.
                </p>
                <p className="f-15">
                  <b>
                    To know more about our Practices, drop us a mail and we'll
                    get back to you.
                  </b>
                </p>
              </Grid>
            </Grid>
            <div className="the_team_section">
              <h1 style={{ textAlign: 'center' }}>THE TEAM</h1>
              <p className="f-15" style={{ textAlign: 'center' }}>
                Co-Founded by a Pilot and an Aviation Enthusiast, MAV AeroSafety
                have an exceptional team with expertise in different areas.
                We’re committed to solving complex business challenges using the
                latest technology and data resources, combined with our creative
                and collaborative strategic approach. Learn more about some of
                our talented Founders below.
              </p>
              <div className="center_img"></div>
              <Aboutslider />
            </div>
          </Container>
        </div>
        <Footer />
      </div>
    );
}

export default About
