import React from "react";
import Headerbar from "../../Header/Headerbar";
import Container from "@mui/material/Container";
import Header from "../Header";
import Footer from "../Footer/Footer";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Servicesalider from "./Servicesalider"

function Services() {
  return (
    <div className="inner_page">
      <Header />
      <Headerbar />
      <div className="main_column" style={{ flexFlow: 'column' }}>
        <div
          className="our_services"
          style={{
            backgroundImage: `url("https://static.wixstatic.com/media/974900db7ca54284b974581c26092368.jpg/v1/fill/w_1905,h_1260,fp_0.50_0.50,q_90,usm_0.66_1.00_0.01,enc_auto/974900db7ca54284b974581c26092368.jpg")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <Container style={{ position: 'relative', zIndex: '1' }}>
            <h1 className="text-white" style={{ textAlign: 'center' }}>
              OUR SERVICES
            </h1>
            <h4 className="text-white" style={{ textAlign: 'center' }}>
              Discover Our Expertise
            </h4>
            <Grid className="innerPoint" container spacing={2}>
              <Grid item sm={12} md={4}>
                <div style={{ textAlign: 'center' }}>
                  <h4 className="text-white">LOGBOOK</h4>
                  <p className="text-white">
                    Complete eGCA Registration Process, Profile Creation &
                    Updating Complete Flying Records.
                  </p>
                </div>
              </Grid>
              <Grid item sm={12} md={4}>
                <div style={{ textAlign: 'center' }}>
                  <h4 className="text-white">ATPL</h4>
                  <p className="text-white">
                    Procedure Counselling Documents Assessment File Submission
                  </p>
                </div>
              </Grid>
              <Grid item sm={12} md={4}>
                <div style={{ textAlign: 'center' }}>
                  <h4 className="text-white">FRTOL</h4>
                  <p className="text-white">
                    Procedure Counselling Documents Assessment File Submission
                  </p>
                </div>
              </Grid>
              <Grid item sm={12} md={4}>
                <div style={{ textAlign: 'center' }}>
                  <h4 className="text-white">RTR</h4>
                  <p className="text-white">
                    Procedure Counselling Documents Assessment File Submission
                  </p>
                </div>
              </Grid>

              <Grid item sm={12} md={4}>
                <div style={{ textAlign: 'center' }}>
                  <h4 className="text-white">MEDICAL</h4>
                  <p className="text-white">
                    Procedure Counselling Documents Assessment EGCA Website
                    Medical Verification
                  </p>
                </div>
              </Grid>

              <Grid item sm={12} md={4}>
                <div style={{ textAlign: 'center' }}>
                  <h4 className="text-white">CPL</h4>
                  <p className="text-white">
                    Procedure Counselling Documents Assessment File Submission
                  </p>
                </div>
              </Grid>
              <div
                style={{
                  textAlign: 'center',
                  maxWidth: '850px',
                  margin: '40px auto 0',
                }}
              >
                <p className="f-15 text-white">
                  To revalidate the IR, you are required to complete a
                  proficiency check as per the requirements of your license. We
                  can recommend a few options for you to look at.
                </p>

                <p className="f-15 text-white">
                  We provide interview grooming as a service as well for airline
                  selection. Our experienced faculty of trainers have experience
                  with leading airlines such as IndiGo, Etihad Airways and
                  Emirates. Interested in learning more about our services?
                </p>
              </div>
            </Grid>
            <div className="custom_btn_cell" style={{ textAlign: 'center' }}>
              <Button variant="outlined">Get in Touch</Button>
            </div>
          </Container>
        </div>
        <div className="how_it_work">
          <Container>
              <h1 style={{textAlign:"center"}}>HOW IT WORKS</h1>
              <h4 style={{textAlign:"center"}}>Its That Simple</h4>
              <div className="flex-col" style={{ display: 'flex' }}>
                <h3>STEP 1</h3>
                <p>
                  Contact us to talk to a representative about the benefits of
                  our solutions, services, support and our registration process.
                </p>
              </div>
              <div className="flex-col" style={{ display: 'flex' }}>
                <h3>STEP 2</h3>
                <p>
                  Once registered, our Team of experts will support and guide
                  you through the documents required and the way to go forward.
                </p>
              </div>
            <div className="flex-col" style={{ display: 'flex' }}>
              <h3>STEP 3</h3>
              <p>
                We will assist you with the documents submission once our team
                of experts have reviewed the documents.
              </p>
            </div>
          </Container>
        </div>
        <Container>
          <div className="the_team_section">
            <div>
              <h1 style={{ textAlign: 'center' }}>
                WHAT OUR CUSTOMERS HAVE TO SAY
              </h1>
            </div>
          </div>
          <Servicesalider />
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Services;
