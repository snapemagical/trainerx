import { React } from "react";
import { Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import { useEffect, useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import logo from "../images/loggo.png";
import "./Signup.css";
import logo1 from "../images/mav_logo.svg";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "0px",
    },
    [theme.breakpoints.up("lg")]: {},
  },

  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      marginTop: "70px",
    },
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
  "@media (min-width: 360px)": {
    buttonContainer: {
      marginTop: "800px",
    },
  },
  "@media (min-width: 768px)": {
    buttonContainer: {
      marginTop: "800px",
    },
  },
}));

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  phone_no: yup
    .string()
    .min(10, "Please enter your 10 digit Mobile Number.")
    .max(10, "Please enter only 10 digit Mobile Number.")
    .required("Mobile No. is required.")
    .matches(phoneRegExp, "Only numbers are allowed."),
  email: yup.string()
  .email("Please enter a valid email address")
  .required("Email is required."),
  password: yup
    .string()
    .matches(PASSWORD_REGEX, "Password must have at least 8 characters and must be a combination of uppercase letters, lowercase letters, numbers and symbols.")
    .required("Password is required."),
  confirmPassword: yup
    .string()
    .required("Please re-enter the password.")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not match"),
    }),
});

export default function SignInSide(props) {
  const [message, setMessage] = useState(null);
  const history = useHistory();

  useEffect(() => {
    document.title = "Sign up";
  }, []);

  const classes = useStyles();
  const [phone_no, setPhoneno] = useState();
  const handleContactChange = (e) => {
    setPhoneno(e.target.value);
  };
  const [email, setEmail] = useState();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // setState({email: e.target.value});
  };
  const [password, setPassword] = useState();
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // setPassword({ e.target.value});
  };
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const onSubmit = async (e) => {
    // e.preventDefault();
    const res = await axios
      .post(baseURL+"accounts/signup/MV9zdHVkZW50XzJhYzVlZjg1LTRhZjItNDRkOC05MmRlLWQ1M2ZhOWQ2NjcyNg/",
        {
          email: email,
          phone_no: phone_no,
          password: password,
         
        }
      )

      .then((response) => {
        setMessage(response.data.message);
        history.push("/login")
        swal("User successfully registered.", "", "success", {
          button: "OK",
        });
      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.email[0], "hello11111");
          // Request made and server responded
        } else if (error.request) {
          // The request was made but no response was received
        } else {
        }
      });
     
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      phone_no: "",
      password: "",
      confirmPassword: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div className="bgimg">
       <div className="headlogo">
        <img src={logo1}/>
      </div>
    <Grid container >
      <CssBaseline />
      <Grid lg={12} style={{marginTop:"auto", marginBottom:"auto", width:"100%"}}>
       
            <div className="main">
            <Grid container style={{ margin: "0", justifyContent:"center" }}>
            <Grid item md={12} lg={12} style={{width:"100%"}}>
                  <Paper elevation={0} className="papernamee">
                    <div className={classes.paper}>
                    <div className="logoo">
                      <img
                        src={logo}
                        width="30%"
                        style={{ margin: "auto", marginTop: "30px" }}
                      />
                      </div>

                      <h1
                        style={{
                          marginTop: "10px",
                          textAlign: "center",
                          fontSize: "24px",
                          fontWeight: "600",
                        }}
                      >
                        REGISTER
                      </h1>
                      <div className="formm">
                      <p style={{color:"red",fontSize:"25px"}}>{message}</p>
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
                              marginTop: "20px",
                            }}
                          >
                            Email
                          </InputLabel>
                          <TextField
                            error={Boolean(
                              formik.touched.email && formik.errors.email
                            )}
                            fullWidth
                            helperText={
                              formik.touched.email && formik.errors.email
                            }
                            margin="normal"
                            name="email"
                            variant="outlined"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            onKeyUp={handleEmailChange}
                            type="email"
                            value={formik.values.email}
                            style={{ color: "#fff" }}
                          />

                          <InputLabel
                            className="InputLabel"
                            style={{
                              color: "#fff",
                              display: "flex",
                              fontSize: "24px",
                              marginTop: "25px",
                              marginBottom:"14px"
                            }}
                          >
                            Mobile No.
                          </InputLabel>

                          <TextField
                            inputProps={{ maxLength: 10 }}
                            error={Boolean(
                              formik.touched.phone_no &&
                                formik.errors.phone_no
                            )}
                            required
                            fullWidth
                            helperText={
                              formik.touched.phone_no &&
                              formik.errors.phone_no
                            }
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            name="phone_no"
                            variant="outlined"
                            // type="number"
                            onKeyUp={handleContactChange}
                            autoComplete="number"
                            style={{ color: "#fff" }}
                          />
                          <InputLabel
                            className="InputLabel"
                            style={{
                              color: "#fff",
                              display: "flex",
                              fontSize: "24px",
                              letterSpacing: "1px",
                              marginTop: "30px",
                            }}
                          >
                            Password
                          </InputLabel>
                          <TextField
                            inputProps={{ maxLength: 15 }}
                            error={Boolean(
                              formik.touched.password && formik.errors.password
                            )}
                            fullWidth
                            helperText={
                              formik.touched.password && formik.errors.password
                            }
                            margin="normal"
                            name="password"
                            variant="outlined"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            onKeyUp={handlePasswordChange}
                            type="password"
                            value={formik.values.password}
                            style={{ color: "#fff" }}
                          />
                          <InputLabel
                            className="InputLabel"
                            style={{
                              color: "#fff",
                              display: "flex",
                              fontSize: "24px",
                              letterSpacing: "1px",
                              marginTop: "25px",
                              textAlign: "start",
                            }}
                          >
                            Re-type Password
                          </InputLabel>
                          <TextField
                            inputProps={{ maxLength: 15 }}
                            error={Boolean(
                              formik.touched.confirmPassword &&
                                formik.errors.confirmPassword
                            )}
                            fullWidth
                            helperText={
                              formik.touched.confirmPassword &&
                              formik.errors.confirmPassword
                            }
                            margin="normal"
                            name="confirmPassword"
                            variant="outlined"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            onKeyUp={handlePasswordChange}
                            type="password"
                            value={formik.values.confirmPassword}
                          />

                          <Grid item xs={12} sm={12} md={12}>
                            <Button
                              style={{
                                backgroundColor: " #7564E7",
                                color: "white",
                                borderRadius: " 8px",
                                width: "100%",
                                fontSize: "24px",
                                marginTop: "40px",
                                textTransform: "capitalize",
                              }}
                              variant="outlined"
                              type="submit"
                              size="medium"
                              color="primary"
                              className={classes.margin}
                            >
                              Sign up
                            </Button>
                          </Grid>
                          <Grid container  className="acc-container" style={{ marginTop: "50px" }}>
                            <Grid
                            className="no-account"
                              item
                              container
                              justify="center"
                              style={{ display: "flex" }}
                            >
                              <p
                                style={{
                                  marginRight: "6px",
                                  marginTop: "0px",
                                  fontSize: "24px",
                                }}
                              >
                                Already have an account?
                              </p>
                              <Link
                                style={{
                                  fontSize: "24px",
                                  color: "#00D072",
                                  marginLeft:"2px"
                                }}
                                to="/login"
                                variant="body2"
                              >
                                {" Login "}
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
      <div></div>
    </Grid>
    </div>
  );
}
