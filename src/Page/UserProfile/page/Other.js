import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import swal from "sweetalert";
import Stack from "@mui/material/Stack";
import { useHistory, useParams } from "react-router-dom";
import AppLayout from "../../../layout/appLayout";
import ProfileHead from "../ProfileHead";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const validationSchema = yup.object({
  about: yup
    .string()
    .required("This Question is required."),
    choose:yup
    .string()
    .required("This Question is required."),
    looking:yup
    .string()
    .required("This Question is required."),
    standing:yup
    .string()
    .required("This Question is required."),
    prefer:yup
    .string()
    .required("This Question is required."),
    Would:yup
    .string()
    .required("This Question is required."),
});

export default function AddUser() {
  let history = useHistory();

  useEffect(() => {
    document.title = "Other";
    // loadUser()
  }, []);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [about, setAbout] = useState();
  const handaboutChange = (e) => {
    setAbout(e.target.value);
  };

  const [choose, setChoose] = useState();
  const handlechooseChange = (e) => {
    setChoose(e.target.value);
  };

  const [looking, setLooking] = useState();

  const handlookingChange = (e) => {
    setLooking(e.target.value);
  };

  const [standing, setStanding] = useState();
  const handstandingChange = (e) => {
    setStanding(e.target.value);
  };
  const [aircraft, setAircraft] = useState();

  const handaircraftChange = (e) => {
    setAircraft(e.target.value);
  };
  
  const [abroad, setAbroad] = useState();
 
  
  const handaabroadChange = (e) => {
    setAbroad(e.target.value);
  };
  const [other, setOther] = useState();
  const token = localStorage.getItem('token');
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  // const loadUser = async () => {
  //   const result = await axios.get(baseURL+`accounts/user-other/`,
  //   { "headers": {"Authorization" : `Bearer ${token}`} }
  //   );
  //   setOther(result.data);
  // };

  const onSubmit = async (e) => {
    // e.preventDefault();
    const res = await axios
      .post(baseURL+`accounts/user-other/`,
      
      {
        "q_and_a" : {
          "Where did you hear about us?" : about,
          "What made you choose us?": choose,
          "Which Airline are you looking forward to join?": looking,
          "Do you have a standing offer? If yes, which airline?": standing,
          "Which aircraft OEM do you prefer?": aircraft,
          "Would you like to be based abroad?": abroad,
        }
      },
      {headers: {
        Authorization : `Bearer ${token}`
      }}, 

      )
      .then((res) => {
        // setMessage(res.data.message);
        swal("Successfully.", "", "success", {
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
      .push("")
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
      about: "",
      choose: "",
      looking:"",
      standing:"",
      prefer:"",
      Would:"",

    },
    validateOnBlur: false,
    onSubmit,
    validationSchema: validationSchema,
  });


  const classes = useStyles();

  return (
    <AppLayout>
      <ProfileHead/>
      <Container maxWidth="xl">
        <form method="POST" noValidate onSubmit={formik.handleSubmit}>
          <Paper elevation={3} style={{ marginTop: "20px" }}>
            <div
              className={classes.root}
              style={{ padding: "20px 20px 50px", marginBottom: "30px" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={5}>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Where did you hear about us?"
                      // inputProps={{ maxLength: 50 }}
                      error={Boolean(
                        formik.touched.about && formik.errors.about
                      )}
                      margin="normal"
                      fullWidth
                      helperText={
                        formik.touched.about && formik.errors.about
                      }
                      name="about"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      onKeyUp={handaboutChange}
                      autoComplete="Where did you hear about us?"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="What made you choose us?"
                      error={Boolean(
                        formik.touched.choose && formik.errors.choose
                      )}
                      margin="normal"
                      fullWidth
                      helperText={
                        formik.touched.choose && formik.errors.choose
                      }
                      name="choose"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      onKeyUp={handlechooseChange}
                      autoComplete="about"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Which Airline are you looking forward to
                      join?"
                      // inputProps={{ maxLength: 50 }}
                      error={Boolean(
                        formik.touched.looking && formik.errors.looking
                      )}
                      margin="normal"
                      fullWidth
                      helperText={
                        formik.touched.looking && formik.errors.looking
                      }
                      name="looking"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      onKeyUp={handlookingChange}
                      autoComplete="Which Airline are you looking forward to
                      join?"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Do you have a standing offer? If yes,
                      which airline?"
                      // inputProps={{ maxLength: 50 }}
                      error={Boolean(
                        formik.touched.standing && formik.errors.standing
                      )}
                      margin="normal"
                      fullWidth
                      helperText={
                        formik.touched.standing && formik.errors.standing
                      }
                      name="standing"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      onKeyUp={handstandingChange}
                      autoComplete="Do you have a standing offer? If yes,
                      which airline?"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Which aircraft OEM do you prefer?"
                      // inputProps={{ maxLength: 50 }}
                      error={Boolean(
                        formik.touched.prefer && formik.errors.prefer
                      )}
                      margin="normal"
                      fullWidth
                      helperText={
                        formik.touched.prefer && formik.errors.prefer
                      }
                      name="prefer"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      onKeyUp={handaircraftChange}
                      autoComplete="Which aircraft OEM do you prefer?"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Would you like to be based abroad?"
                      // inputProps={{ maxLength: 50 }}
                      error={Boolean(
                        formik.touched.Would && formik.errors.Would
                      )}
                      margin="normal"
                      fullWidth
                      helperText={
                        formik.touched.Would && formik.errors.Would
                      }
                      name="Would"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      onKeyUp={handaabroadChange}
                      autoComplete="fullname"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Paper>
          <Stack
            spacing={2}
            direction="row"
            className="buttonss"
            style={{ justifyContent: "right" }}
          >
            <Link to={`/user-profile`} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                type="button"
                className="save"
                onClick={() => {}}
              >
                Back
              </Button>
            </Link>
            <Button variant="contained" type="submit" className="save">
            Submit
            </Button>
          </Stack>
        </form>
      </Container>
    </AppLayout>
  );
}
