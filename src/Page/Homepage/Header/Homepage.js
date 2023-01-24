import { React, useState } from "react";
import Header from "../Header/Header";
import Headerbar from "../Header/Headerbar";
import Grid from "@material-ui/core/Grid";
import Container from "@mui/material/Container";
import background from "../../images/background.svg";
import trainerlogo from "../../images/trainerlogo.svg";
import nauticsogo from "../../images/nauticsogo.svg";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./Homepage.css";
import * as yup from "yup";
import Card from "@mui/material/Card";
import Footer from "./Footer/Footer";
import AboutImg from "../../images/img_about-us.png";
import SubmitFly from "../../images/ic_submit_flight.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import TextField from "@mui/material/TextField";
import Slider from "../Header/Slider";
import { useFormik } from "formik";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router";

const validationSchema = yup.object({
  name: yup
    .string()
    .max(50, "Must be 50 characters or less")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required.")
    .required("Name is required."),

  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required."),
});

export default function Home(props) {
  let history = useHistory();

  const [name, setname] = useState();
  const handlenameChange = (e) => {
    setname(e.target.value);
  };
  const [email, setEmail] = useState();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [message, Setmessage] =useState();
  const handleMessageChange = (e) => {
    Setmessage(e.target.value);
  }
  const baseURL = process.env.REACT_APP_API_ENDPOINT;

  const onSubmit = async (e) => {
    // e.preventDefault();
    const res = await axios
      .post(baseURL + "accounts/contact-us/",
        {
          name: name,
          email: email,
          message:message,
        }
      )
      .then((res) => {
        // setMessage(res.data.message);
        swal("Thanks for contacting us! We will be in touch with you shortly.", "", "success", {
          button: "OK",
        });
      })
      // .catch((err) => { });
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
        } else if (error.request) {
          // The request was made but no response was received
        } else {
        }
        //{message && <div>{message}</div>}

        swal("Something went wrong!", "Oops...", "error", {
          button: "OK",
        });
      });
    history
      // .push("/superadmin/usermanagement")
      .then((res) => {})
      .catch(function (error) {
        if (error.response) {
        } else if (error.request) {
        } else {
        }
      });
    // history.push("/category-management");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div className="position-relative">
      <Header />
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Headerbar />
        <Container>
          <Grid className="custom-spacing mx-4" spacing={2}>
            <div className="mav">
              <h1>
                MAV AEROSAFETY
                <br />
                CONSULTANCY
              </h1>
            </div>
            <div className="Industry">
              <p>
                Industry leaders in providing customer
                <br />
                focused Solutions.
              </p>
            </div>
            <Stack className="p-200" spacing={2} direction="row">
              <Button
                className="custom-btn outline Learnmore"
                variant="outlined"
              >
                Learn more
              </Button>
              <div>
                <Button
                  className="custom-btn outline Learnmore"
                  variant="outlined"
                >
                  Contact Us
                </Button>
              </div>
            </Stack>
          </Grid>
        </Container>
      </div>

      <div className="bookConsult sectionPadding-t">
        <Container>
          <Grid className="custom-spacing" container spacing={4}>
            <Grid xs={12} item md={6}>
              <div className="Book">
                <h1 className="primary-heading">
                  Book your free
                  <br />
                  consultation now !
                </h1>
              </div>
              <div>
                <p className="custom-p">
                  Fill out your details and our experts will get in touch with
                  you soon.
                </p>
              </div>
            </Grid>
            <Grid xs={12} item md={6}>
              <div>
                <Card className="helpFormcstm" style={{ borderRadius: "30px" }}>
                  <form method="POST" noValidate onSubmit={formik.handleSubmit}>
                    <div className="howcan">
                      <h1>We are happy to help you.</h1>
                      <TextField
                        fullWidth
                        error={Boolean(
                          formik.touched.name && formik.errors.name
                        )}
                        label="Enter your name"
                        ref={props.inputRef}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        onKeyUp={handlenameChange}
                        id="name"
                        required
                        margin="normal"
                        helperText={formik.touched.name && formik.errors.name}
                      />
                      <TextField
                        fullWidth
                        error={Boolean(
                          formik.touched.email && formik.errors.email
                        )}
                        helperText={formik.touched.email && formik.errors.email}
                        label="Enter your email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        onKeyUp={handleEmailChange}
                        type="email"
                        name="email"
                        value={formik.values.email}
                        required
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Your message"
                        onKeyUp={handleMessageChange}
                        id="message"
                        margin="normal"
                      />

                      <Grid item xs={12} sm={12} md={12}>
                        <Button
                          style={{
                            backgroundColor: "#8a959f",
                            border: "0px",
                            color: "white",
                            borderRadius: " 8px",
                            width: "100%",
                            fontSize: "16px",
                            marginTop: "30px",
                            textTransform: "capitalize",
                            height: "62px",
                          }}
                          variant="outlined"
                          type="submit"
                          size="medium"
                          color="primary"
                          className="active"
                        >
                          Submit
                          <img className="img-fluid" src={SubmitFly} />
                        </Button>
                      </Grid>
                    </div>
                  </form>
                </Card>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className="sectionPadding-t about_us_section">
        <Container>
          <h1
            className="primary-heading bottomAfter"
            style={{ textAlign: "center" }}
          >
            ABOUT US
          </h1>
          <Grid className="custom-spacing" container spacing={4}>
            <Grid item xs={12} sm={12} md={6}>
              <p className="custom-p">
                We are technology enabled service providers catering to the
                aviation industry of the world. USP of MAV AeroSafety lies in
                providing the best Solutions and Services to the clients as and
                when required. We have gained our reputation by being committed
                to providing dependable solutions as a consultant.
              </p>
              <p className="custom-p">
                All of our solutions and services are customer-focused and
                performance-driven. By giving value for money to our customers
                we thrive to innovate for a better life. Our main values are
              </p>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <img className="img-fluid" src={AboutImg} />
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className="sectionPadding-t our_product">
        <Container>
          <h1
            className="primary-heading bottomAfter"
            style={{ textAlign: "center", marginBottom: "0px" }}
          >
            OUR PRODUCTS
          </h1>
          <p
            className="custom-p mob-mb"
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            MAV AeroSafety Consultancy LLP helps all businesses not only reach,
            but exceed their goals. Our experience helps us lay out a strategy
            that perfectly ﬁts our clients. This collaboration is essential for
            the successful transition from strategy, to plan, to action.
          </p>
          <Grid className="custom-spacing" container spacing={4}>
            <Grid item xs={12} sm={12} md={6}>
              <Card className="productsCard">
                <img src={trainerlogo} />
                <div className="contentSection">
                  <p className="custom-p">
                    Trainer X is a critical PaaS that deﬁnes the Flying Schools
                    when in comes to Business Intelligence (BI).
                  </p>
                  <Button className="custom-btn" variant="contained">
                    Read more
                  </Button>
                </div>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Card className="productsCard">
                <img src={nauticsogo} />
                <div className="contentSection">
                  <p className="custom-p">
                    Our product integrates Artiﬁcial Intelligence and Machine
                    Learning to cater for the safety-critical aspects of
                    aviation to assist in a pilot's decision making.
                  </p>
                  <Button className="custom-btn" variant="contained">
                    Read more
                  </Button>
                </div>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>

      <div className="partners sectionPadding-t sectionPadding-b sectionMargin-t">
        <Container>
          <Grid className="custom-spacing" container spacing={4}>
            <Grid
              style={{
                display: "flex",
                justifyContent: "center",
                flexFlow: "column",
              }}
              item
              xs={12} sm={12}
              md={6}
            >
              <h1
                className="primary-heading  mt-0"
                style={{ textAlign: "left", marginBottom: "0px" }}
              >
                OUR PARTNERS
              </h1>
              <p
                className="custom-p"
                style={{ textAlign: "left", marginTop: "8px" }}
              >
                We are a collaborative effort with trusted partners
              </p>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div>
                <Grid className="custom-spacing" container spacing={4}>
                  <Grid item xs={12} sm={12} md={6}>
                    <div className="center_img">
                      <img
                        className="img-fluid"
                        src="https://static.wixstatic.com/media/83d722_70292ba0de404ec2ad66e45ca8e106b0~mv2.png/v1/fill/w_396,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Orion_Aviation_Academy.png"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <div className="center_img">
                      <img
                        className="img-fluid"
                        src="https://static.wixstatic.com/media/83d722_cfbbc9cf82af494db8cc54bf167589d3~mv2.png/v1/fill/w_340,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Takeoff.png"
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className="whatClientSay sectionPadding-t sectionPadding-b">
        <Container>
          <h1
            className="primary-heading bottomAfter"
            style={{ textAlign: "center" }}
          >
            WHAT OUR CLIENTS SAY ?
          </h1>
          <Grid className="custom-spacing" container spacing={4}>
            <Grid
            style={{width:'100%'}}
            item xs={12} sm={12} md={12}>
              <Slider />
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
      <div className="fixsocialIcon">
        <a href="#">
          <FacebookIcon className="facebook" />
        </a>
        <a href="#">
          <TwitterIcon className="twitter" />
        </a>
        <a href="#">
          <InstagramIcon className="instagram" />
        </a>
      </div>
    </div>
  );
}
