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
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import logo1 from "../images/mav_logo.svg";
import logo from "../images/loggo.png";
import { useParams } from "react-router";

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
      marginTop: "80px",
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
// gendr: yup
// .string()
//   .required("Required") ,
const validationSchema = yup.object({
  password: yup
    .string()
    .matches(PASSWORD_REGEX, "Please enter a strong password")
    .required("New Password is required."),
    password2: yup
    .string()
    .required("Confirm Password is required.")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Confirm does not match."),
    }),
});

export default function SignInSide({match}) {
  useEffect(() => {
    document.title = "Change Password";
  }, []);
  const classes = useStyles();
  const { id } = useParams();
  const uid={
    "uid":match.params.id
  }
  const token={
    "uid":match.params.token
  }
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const history = useHistory();
  const [message, setMessage] = useState(null);
  const [password, setPassword] = useState();
  const handlePasswordonChange = (e) => {
    setPassword(e.target.value);
  };
  
  const [password2, setPassword2] = useState();
  const handlePassword2onChange = (e) => {
    setPassword2(e.target.value);
  };
  const onSubmit = async (e) => {
    // e.preventDefault();
    //baseURL+`sports/coach/${id}/`,
    const res = await axios
      .post(baseURL + `accounts/password-reset/${match.params.id}/${match.params.token}/`, {
        password2:password2,
        password: password,
        uid:match.params.id,
        token:match.params.token,
      })
      .then((res) => {
        setMessage(res.data.success);
        history.push("/login")
        swal("Password Changed Successfully", "", "success", {
          button: "ok",
        });
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      password2: "",
    },
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
                    backgroundColor: "rgb(26 48 74)",
                    color: "#fff",
                    maxWidth: "815px",
                    maxHeight: "949px",
                  }}
                >
                  <div className={classes.paper}>
                    <div className="logoo">
                      <img
                        src={logo}
                        width="1em"
                        style={{ margin: "auto", margin: "30px auto" }}
                      />
                    </div>

                    <h1 className="loginh1">Change Password</h1>
                    <div className="formm">
                      <form
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
                            marginTop: "90px",
                          }}
                        >
                          New Password
                        </InputLabel>
                        <TextField
                          inputProps={{ maxLength: 40 }}
                          error={Boolean(
                            formik.touched.password && formik.errors.password
                          )}
                          fullWidth
                          helperText={
                            formik.touched.password && formik.errors.password
                          }
                          margin="normal"
                          name="password"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          onKeyUp={handlePasswordonChange}
                          type="password"
                          variant="outlined"
                          style={{ color: "#fff" }}
                          value={formik.values.password}
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
                          Confirm New Password
                        </InputLabel>

                        <TextField
                          inputProps={{ maxLength: 40 }}
                          error={Boolean(
                            formik.touched.password2 &&
                              formik.errors.password2
                          )}
                          fullWidth
                          helperText={
                            formik.touched.password2 &&
                            formik.errors.password2
                          }
                          margin="normal"
                          variant="outlined"
                          style={{ color: "#fff" }}
                          name="password2"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          onKeyUp={handlePassword2onChange}
                          type="password"
                          value={formik.values.password2}
                        />

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
                            type="submit"
                            variant="outlined"
                            size="medium"
                            color="primary"
                            className={classes.margin}
                          >
                            Change Password
                          </Button>
                        </Grid>
                        <Grid container style={{ marginTop: "105px" }}>
                          <Grid
                            className="no-account"
                            item
                            container
                            justify="center"
                            style={{ display: "flex" }}
                          >
                            <Link
                              style={{
                                color: "#00D072",
                                fontSize: "24px",
                                marginLeft: "2px",
                              }}
                              to="/"
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
