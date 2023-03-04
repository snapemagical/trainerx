import { React, useState } from "react";
import { Container, Grid, Button, TextField } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import swal from "sweetalert";
import withStaticLayout from "../../../../hoc/StaticLayout";

const validationSchema = yup.object({
  name: yup
    .string()
    .max(10, "Must be 100 characters or less")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required.")
    .required("Name is required."),

  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required."),
});

const Careers = () => {
  const [name, setname] = useState();
  const handlenameChange = (e) => {
    setname(e.target.value);
  };
  const [email, setEmail] = useState();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [message, Setmessage] = useState();
  const handleMessageChange = (e) => {
    Setmessage(e.target.value);
  };
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const onSubmit = async (e) => {
    const res = await axios
      .post(baseURL + "accounts/contact-us/", {
        name: name,
        email: email,
        message: message,
      })
      .then((res) => {
        // setMessage(res.data.message);
        swal(
          "Thanks for contacting us! We will be in touch with you shortly.",
          "",
          "success",
          {
            button: "OK",
          }
        );
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

  const [value, setValue] = useState(null);
  return (
    <>
      <div>
        <div className="center_img">
          <img
            className="img-fluid"
            src="https://static.wixstatic.com/media/83d722_ef9766487aea468b87b8fe02ef5621fd~mv2.jpg/v1/fill/w_855,h_400,al_c,q_80,enc_auto/join-our-team-copy-960x400.jpg"
          />
        </div>
        <h1>COME WORK WITH US</h1>
        <p className="f-15">
          Working at MAV AeroSafety isn't all work and no play, but if you
          believe in changing lives, if you are ready to make the world a better
          place, then MAV AeroSafety might be your next step. At MAV AeroSafety,
          we have a "no man is an island" policy. That means you don't have to
          face your tasks alone; we get things done by working together as a
          team.
        </p>
        <p className="f-15">
          If you think you've got what it takes, then we welcome you to join our
          team.
        </p>
      </div>
      <div>
        <div className="cont_form costum_work_form">
          <form method="POST" noValidate onSubmit={formik.handleSubmit}>
            <TextField
              id="name"
              margin="normal"
              fullWidth
              error={Boolean(formik.touched.name && formik.errors.name)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onKeyUp={handlenameChange}
              placeholder="Name"
              variant="standard"
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              id="email"
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onKeyUp={handleEmailChange}
              margin="normal"
              value={formik.values.email}
              fullWidth
              placeholder="Email"
              variant="standard"
            />
            <TextField
              id="message"
              margin="normal"
              fullWidth
              onKeyUp={handleMessageChange}
              placeholder="Type your message here..."
              variant="standard"
            />
            <Grid>
              <Button type="submit" variant="outlined" size="medium">
                Apply Now
              </Button>
            </Grid>
          </form>
        </div>
      </div>
    </>
  );
};

export default withStaticLayout(Careers);
