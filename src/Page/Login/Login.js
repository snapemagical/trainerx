import { React } from "react";
import { Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import * as yup from "yup";
// import { makeStyles } from "@emotion/styled";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Checkbox, InputAdornment, IconButton } from "@mui/material";
import logo from "../images/loggo.png";
import { useFormik } from "formik";
import logo1 from "../images/mav_logo.svg";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
// import { withContext } from "../../context/appContext";
import { Visibility, VisibilityOff } from '@mui/icons-material';
// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: "100vh",
//     display: "flex",
//     [theme.breakpoints.down("sm")]: {
//       marginTop: "0px",
//     },
//     [theme.breakpoints.up("md")]: {
//       marginTop: "0px",
//     },
//     [theme.breakpoints.up("lg")]: {},
//   },

//   paper: {
//     margin: theme.spacing(8, 4),
//     display: "flex",
//     flexDirection: "column",
//     padding: theme.spacing(1),
//     [theme.breakpoints.down("sm")]: {
//       marginTop: "80px",
//     },
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
//   "@media (min-width: 360px)": {
//     buttonContainer: {
//       marginTop: "800px",
//     },
//   },
//   "@media (min-width: 768px)": {
//     buttonContainer: {
//       marginTop: "800px",
//     },
//   },
// }));

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Email is required."),
  password: yup.string().required("Password is required."),
  tandc: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

function SignInSide(props) {
  const [data, setData] = useState();
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("2");
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const location = useLocation();
  useEffect(() => {
    document.title = "Login";
    console.log(props)
  }, []);

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  // const classes = useStyles();

  const [email, setEmail] = useState();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // setState({email: e.target.value});
  };

  const [checked, setChecked] = useState(false);
  const onChangeCheckbox = (e) => {
    setChecked(e.target.value);
  };


  const [password, setPassword] = useState();
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // setPassword({ e.target.value});
  };
  useEffect(() => {
    if (props?.match?.path || location.pathname === '/login-admin') {
      setRole('3')
    }
  }, [props?.match?.path, location.pathname])
  const baseURL = process.env.REACT_APP_API_ENDPOINT //"https://api.mavaerosafety.com/" //process.env.REACT_APP_API_ENDPOINT;
  const onSubmit = async (e) => {
    setIsLoading(true);
    axios
      // .post("https://httpbin.org/post", {
      .post(baseURL + "accounts/login/", {
        email: email,
        password: password,
        username: 'vinayak1',

      }).then((response) => {
        console.log(props);
        setIsLoading(false);
        if (response.status === 200) {
          debugger;
          if (response.data.role === "student") {
            setSuccess(response.data.message);
          } else if (response.data.role === 'instructor') {
            setSuccess(response.data.message)
          }
          props?.context.authLogin(response?.data?.user?.role)
          const token = response.data.token.access;
          localStorage.refresh_token = response.data.token.refresh
          localStorage.setItem('token', token);
          const user = JSON.stringify(response?.data?.user)
          localStorage.user = user
          console.log('test', localStorage)
          props?.context.getProfile()
          history.push("/dashboard");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          setMessage(error.response.data.error, "hello");
        } else if (error.request) {
          // The request was made but no response was received
        } else {
        }
      });
  };
  const parseJwt = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  };
  const formik = useFormik({
    initialValues: { email: "", password: "" },
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
                  }}
                >
                  <div //</Paper>className={classes.paper}
                  >
                    <div className="logoo">
                      <img
                        src={logo}
                        width="30%"
                        style={{ margin: "auto", margin: "30px auto" }}
                      />
                    </div>
                    <h1 className="loginh1">LOGIN</h1>

                    {isLoading === true ? <CircularProgress /> : ""}
                    <div>
                      {props?.match?.path || location.pathname !== '/login-admin' ? <Stack
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
                      </Stack> : null}
                    </div>

                    <div className="formm">
                      <form
                        // className={classes.form}
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
                          // inputProps={{ maxLength: 30 }}
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
                          inputProps={{ maxLength: 30 }}
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
                          className="form-control"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          onKeyUp={handlePasswordChange}
                          type={showPassword ? "text" : "password"}
                          value={formik.values.password}
                          style={{ color: "#fff" }}
                          InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                        <Grid
                          container
                          spacing={2}
                          style={{ marginTop: "10px" }}
                        >
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            className="checkkbox"
                            style={{ textAlign: "left", fontSize: "20px" }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="tandc"
                                  onKeyUp={onChangeCheckbox}
                                  value="remember"
                                  style={{ color: "#fff" }}
                                />
                              }
                              label="Remember me"
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            className="forgotp"
                            style={{ textAlign: "right", fontSize: "20px" }}
                          >
                            <Link
                              style={{ color: "#fff" }}
                              to="/forgetpassword"
                              variant="body2"
                            >
                              Forgot Password?
                            </Link>
                          </Grid>
                        </Grid>
                        <p style={{ color: "red", fontSize: "20px" }}>
                          {message}
                        </p>

                        <Grid item xs={12} sm={12} md={12}>
                          <Button
                            style={{
                              backgroundColor: "#7564E7",
                              color: "white",
                              width: "100%",
                              fontSize: "24px",
                              marginTop: "50px",
                              textTransform: "capitalize",
                              borderRadius: "8px",
                            }}
                            variant="outlined"
                            type="submit"
                            disabled={isLoading}
                            size="medium"
                            color="primary"
                            // className={classes.margin}
                          >
                            Login
                          </Button>
                        </Grid>
                        <Grid
                          container
                          className="acc-container"
                          style={{ marginTop: "180px" }}
                        >
                          {/* <Grid
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
                              Don't have an account?
                            </p>
                            <Link
                              style={{
                                color: "#00D072",
                                fontSize: "24px",
                                marginLeft: "2px",
                              }}
                              to="/signup"
                              variant="body2"
                            >
                              {" Register"}
                            </Link>
                          </Grid> */}
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
export default SignInSide;