import { React, useState } from "react";
import {
  TextField,
  TextareaAutosize,
  Grid,
  InputLabel,
  Button,
} from "@mui/material";
import axios from "axios";
import swal from "sweetalert";
import * as yup from "yup";
import { useFormik } from "formik";
import withStaticLayout from "../../../../hoc/StaticLayout";

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

function Contact() {
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
    // e.preventDefault();
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

  return (
    <>
      <div className="center_img">
        <img
          className="img-fluid"
          src="https://static.wixstatic.com/media/83d722_6868157d1e144cfdbd97b1b005d7fa61~mv2.jpg/v1/fill/w_940,h_350,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/kaitlyn-baker-vZJdYl5JVXY-unsplash.jpg"
        />
      </div>
      <div>
        <h1>DROP A LINE</h1>
        <p className="f-15">
          Don't hesitate to contact us and find how our services can benefit
          you. For any information or details, Email:
        </p>
      </div>
      <div className="cont_form">
        <form method="POST" noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <InputLabel className="Input">Name</InputLabel>
              <TextField
                inputProps={{ maxLength: 50 }}
                error={Boolean(formik.touched.name && formik.errors.name)}
                margin="normal"
                required
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                id="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                onKeyUp={handlenameChange}
                autoComplete="name"
                placeholder="Enter your name"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <InputLabel className="InputLabel">Email</InputLabel>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                margin="normal"
                name="email"
                required
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                onKeyUp={handleEmailChange}
                type="email"
                value={formik.values.email}
                placeholder="Enter your email"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <InputLabel className="InputLabel">Message</InputLabel>
              <TextareaAutosize
                margin="normal"
                required
                fullWidth
                minRows={3}
                name="message"
                onKeyUp={handleMessageChange}
                autoComplete="message"
                placeholder="Type your message here..."
              />
            </Grid>
            <Grid container>
              <Button type="submit" variant="outlined" size="medium">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}

export default withStaticLayout(Contact);
