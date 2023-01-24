import { React, setState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Paper from "@material-ui/core/Paper";
import logo from "../images/loggo.png";
import "./Forgot.css";
import logo1 from "../images/mav_logo.svg";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },

  paper: {
    margin: theme.spacing(0, 5),
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
});

export default function SignInSide() {
  useEffect(() => {
    document.title = "Forget Password";
  }, []);
  const handleChange = (event) => {
    setRole(event.target.value);
  };
  const classes = useStyles();
  const [role, setRole] = useState("2");
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // setState({email: e.target.value});
  };
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const onSubmit = (e) => {
    // e.preventDefault();
    axios
      .post(baseURL + "accounts/send-password-reset-link/", {
        email: email,
        user_role:role,
      })
      .then((res) => {
        setMessage(res.data.status);
        swal("Email sent successfully.", "", "success", {
          button: "OK",
        });
        //  setState({
        //   email: "",
        // });
      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.status);
          // setMes(error.response.data.gender)
          // Request made and server responded
        } else if (error.request) {
          // The request was made but no response was received
        } else {
        }
        swal("You have entered an invalid e-mail address. Please try again.", "", "error", {
          button: "OK",
        });
      });
  };

  const formik = useFormik({
    initialValues: { email: "" },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div className="bgimg">
      <div className="headlogo">
        <img src={logo1} />
      </div>
      <Grid container>
        <CssBaseline />
        <Grid
          lg={12}
          style={{ marginTop: "auto", marginBottom: "auto", width: "100%" }}
        >
          <div className="main">
            <Grid container style={{ margin: "0", justifyContent: "center" }}>
              <Grid item md={12} lg={12} style={{ width: "100%" }}>
                <Paper
                  elevation={0}
                  className="papername"
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "rgb(26 48 74) ",
                    color: "#fff",
                    maxWidth: "815px",
                    maxHeight: "949px",
                    margin: "auto",
                    marginBottom: "99px",
                  }}
                >
                  <div className={classes.paper}>
                    <div className="logoo">
                      <img
                        src={logo}
                        width="30%"
                        style={{ margin: "auto", margin: "30px auto" }}
                      />
                    </div>

                    <h1 className="loginh1">Forgot Password?</h1>
                    <div>
                      <Stack
                        direction="row"
                        spacing={2}
                        style={{ justifyContent: "center", marginTop: "34px" }}
                      >
                        <FormControl>
                          <RadioGroup
                            defaultValue="2"
                            checked={role === 1}
                            row
                            //aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              defaultChecked={role === 2}
                              onChange={handleChange}
                              value="2"
                              control={<Radio />}
                              color="#fff"
                              label="Instructor"
                              inputProps={{ "aria-label": "2" }}
                            />

                            <FormControlLabel
                              checked={role === "1"}
                              onChange={handleChange}
                              value="1"
                              control={<Radio />}
                              label="Student"
                              inputProps={{ "aria-label": "1" }}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Stack>
                    </div>

                    <div className="formm">
                      <form
                        className={classes.form}
                        method="POST"
                        noValidate
                        onSubmit={formik.handleSubmit}
                      >
                        <InputLabel
                          className="InputLabel"
                          style={{
                            color: "#fff",
                            display: "flex",
                            fontSize: "24px",
                            letterSpacing: "1px",
                            marginTop: "35px",
                          }}
                        >
                          Email
                        </InputLabel>
                        <TextField
                          inputProps={{ maxLength: 30 }}
                          variant="outlined"
                          error={Boolean(
                            formik.touched.email && formik.errors.email
                          )}
                          fullWidth
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                          margin="normal"
                          value={formik.values.email}
                          name="email"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          onKeyUp={handleEmailChange}
                          type="email"
                        />

                        <Grid item xs={12} sm={12} md={12}>
                          <Button
                            style={{
                              backgroundColor: "#7564E7",
                              color: "white",
                              width: "100%",
                              fontSize: "22px",
                              marginTop: "50px",
                              textTransform: "capitalize",
                              borderRadius: "8px",
                            }}
                            // disabled={isSubmitting}
                            type="submit"
                            // href="/Header"
                            variant="outlined"
                            size="medium"
                            color="primary"
                            className={classes.margin}
                          >
                            Send reset link
                          </Button>
                        </Grid>
                        <Grid
                          container
                          className="acc-container"
                          style={{ marginTop: "175px" }}
                        >
                          <Grid
                            className="no-account"
                            item
                            container
                            justify="center"
                            style={{ display: "flex", marginBottom: "30px" }}
                          >
                            <Link
                              style={{ color: "#00D072", fontSize: "24px" }}
                              to="/login"
                              variant="body2"
                            >
                              {"Login here!"}
                            </Link>
                          </Grid>
                        </Grid>
                      </form>
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
