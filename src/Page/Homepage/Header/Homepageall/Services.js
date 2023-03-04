import React from "react";
import { Grid, Button, Container } from "@mui/material";

import withStaticLayout from "../../../../hoc/StaticLayout";
import Servicesalider from "./Servicesalider";

const Services = () => {
  return (
    <div className="our_services">
      <h1 className="text-white">OUR SERVICES</h1>
      <h4 className="text-white">Discover Our Expertise</h4>
      <Grid className="innerPoint" container spacing={2}>
        <Grid item sm={12} md={4}>
          <div>
            <h4 className="text-white">LOGBOOK</h4>
            <p className="text-white">
              Complete eGCA Registration Process, Profile Creation & Updating
              Complete Flying Records.
            </p>
          </div>
        </Grid>
        <Grid item sm={12} md={4}>
          <div>
            <h4 className="text-white">ATPL</h4>
            <p className="text-white">
              Procedure Counselling Documents Assessment File Submission
            </p>
          </div>
        </Grid>
        <Grid item sm={12} md={4}>
          <div>
            <h4 className="text-white">FRTOL</h4>
            <p className="text-white">
              Procedure Counselling Documents Assessment File Submission
            </p>
          </div>
        </Grid>
        <Grid item sm={12} md={4}>
          <div>
            <h4 className="text-white">RTR</h4>
            <p className="text-white">
              Procedure Counselling Documents Assessment File Submission
            </p>
          </div>
        </Grid>

        <Grid item sm={12} md={4}>
          <div>
            <h4 className="text-white">MEDICAL</h4>
            <p className="text-white">
              Procedure Counselling Documents Assessment EGCA Website Medical
              Verification
            </p>
          </div>
        </Grid>

        <Grid item sm={12} md={4}>
          <div>
            <h4 className="text-white">CPL</h4>
            <p className="text-white">
              Procedure Counselling Documents Assessment File Submission
            </p>
          </div>
        </Grid>
        <div>
          <p className="f-15 text-white">
            To revalidate the IR, you are required to complete a proficiency
            check as per the requirements of your license. We can recommend a
            few options for you to look at.
          </p>

          <p className="f-15 text-white">
            We provide interview grooming as a service as well for airline
            selection. Our experienced faculty of trainers have experience with
            leading airlines such as IndiGo, Etihad Airways and Emirates.
            Interested in learning more about our services?
          </p>
        </div>
      </Grid>
      <div className="custom_btn_cell">
        <Button variant="outlined">Get in Touch</Button>
      </div>
      <div className="how_it_work">
        <Container>
          <h1>HOW IT WORKS</h1>
          <h4>Its That Simple</h4>
          <div className="flex-col">
            <h3>STEP 1</h3>
            <p>
              Contact us to talk to a representative about the benefits of our
              solutions, services, support and our registration process.
            </p>
          </div>
          <div className="flex-col">
            <h3>STEP 2</h3>
            <p>
              Once registered, our Team of experts will support and guide you
              through the documents required and the way to go forward.
            </p>
          </div>
          <div className="flex-col">
            <h3>STEP 3</h3>
            <p>
              We will assist you with the documents submission once our team of
              experts have reviewed the documents.
            </p>
          </div>
        </Container>
      </div>
      <Container>
        <div className="the_team_section">
          <div>
            <h1>WHAT OUR CUSTOMERS HAVE TO SAY</h1>
          </div>
        </div>
        <Servicesalider />
      </Container>
    </div>
  );
};

export default withStaticLayout(Services);
