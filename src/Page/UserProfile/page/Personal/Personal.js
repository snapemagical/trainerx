import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Container,
  InputLabel,
  Paper,
  Grid,
  MenuItem,
  Select,
  FormControl,
  OutlinedInput,
  Button,
} from "@material-ui/core";
import { useEffect } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import "./Personal.css";
import CameraAlt from "@mui/icons-material/CameraAlt";
import FormHelperText from "@mui/material/FormHelperText";
import AppLayout from "../../../../layout/appLayout";
import ProfileHead from "../../ProfileHead";
import { withContext } from "../../../../context/appContext";
import { FormC, onKeyPress } from "../../../../common/validation";
import Fetch from "../../../../common/fetch";
import moment from "moment";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
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
function AddUser({ context, history }) {
  const { role } = context
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [nationality, setNationality] = useState([]);
  const [courses, setCourses] = useState([]);
  const [imageViewUrl, setimageViewUrl] = useState("");
  const [state, setState] = useState({
    gender: "",
    egca_id: "",
    email: "",
    address: "",
    date_of_birth: "",
    city: "",
    phone: "",
    lastname: "",
    middlename: "",
    pin: "",
    firstname: "",
    state: "",
    country: "",
    nationality: "",
    course_applied: "",
    images: [],
  });
  const [dateFormat, setDateFormat] = useState(null);
  const [goNext, setGoNext] = useState(false)
  useEffect(() => {
    const profileList = context?.userProfile;
    const { profile } = profileList;
    setState({
      gender: profile?.gender ? profile?.gender : "",
      egca_id: profile?.egca_id ? profile?.egca_id : "",
      email: profileList?.email ? profileList?.email : "",
      address: profile?.address ? profile?.address : "",
      date_of_birth: profile?.date_of_birth ? profile?.date_of_birth : null,
      city: profile?.city ? profile?.city : "",
      phone: profileList?.phone_no ? profileList?.phone_no : "",
      lastname: profile?.last_name ? profile?.last_name : "",
      middlename: profile?.middle_name ? profile?.middle_name : "",
      pin: profile?.pin ? profile?.pin : "",
      firstname: profile?.first_name ? profile?.first_name : "",
      state: profile?.state ? profile?.state : "",
      country: profile?.country ? profile?.country : "",
      nationality: profile?.nationality ? profile?.nationality : "",
      course_applied: profile?.course_applied ? profile?.course_applied : "",
      images: '',
    });
    setDateFormat(moment(profile?.date_of_birth).format("LLLL"));
    setimageViewUrl(profile?.profile_image ? profile?.profile_image : "");
    Fetch("accounts/course-applied/").then((d) => {
      if (d?.status) {
        setCourses(d.data);
      }
    });
    Fetch("accounts/get-all-countries/").then((d) => {
      if (d?.status) {
        setCountries(d.data.countries);
      }
    });
    Fetch("accounts/user/get_nationality/").then((d) => {
      if (d?.status) {
        setNationality(d.data);
      }
    });
  }, [context?.userProfile]);
  const handleChange = (newValue) => {
    const d = moment(newValue).format("YYYY-MM-DD");
    let fromD = moment().format('L')
    if (!moment(fromD).isSame(moment(newValue).format('L')) && !moment().isBefore(moment(newValue).format())) {
      setDateFormat(newValue);
      setState({
        ...state,
        date_of_birth: d,
      });
    } else {
      setDateFormat(null);
      setState({
        ...state,
        date_of_birth: '',
      });
    }
  };
  const onimageListChange = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      setimageViewUrl(event.target.result);
      setState({
        ...state,
        images: event.target.result,
      });
    };
    reader.readAsDataURL(file);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    Fetch(
      "accounts/user/update_profile/",
      {
        email: state.email,
        phone_no: state.phone,
        profile: {
          profile_image: state?.images,
          first_name: state?.firstname,
          middle_name: state?.middlename,
          last_name: state?.lastname,
          gender: state?.gender,
          nationality: state?.nationality,
          date_of_birth: state?.date_of_birth,
          egca_id: state?.egca_id,
          address: state?.address,
          state: state?.state,
          city: state?.city,
          pin: state?.pin,
          course_applied: state?.course_applied,
          country: state?.country,
        },
      },
      { method: "put", inFormData: false }
    ).then((d) => {
      if (d?.status) {
        context?.getProfile();
        swal("Profile Updated", "", "success", {
          button: "OK",
        }).then(d => {
          if (goNext) {
            history.push('/user-profile/emergency')
          }
        });
      }
    });
  };
  const formValid = FormC({
    values: state,
    removeValidValue: [
      "middlename",
      "images",
      "firstname",
      "lastname",
      "gender",
      "nationality",
      "date_of_birth",
      "egca_id",
      "address",
      "state",
      "city",
      "pin",
      "course_applied",
      "country",
    ],
    onSubmit,
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
    formValid?.handleChange(e);
  };
  const classes = useStyles();
  return (
    <AppLayout>
      <ProfileHead />
      <Container maxWidth="xl">
        <form method="POST" noValidate onSubmit={formValid.handleSubmit}>
          <Paper
            className="form-shadow"
            elevation={3}
            style={{ marginTop: "20px" }}
          >
            <div
              className={classes.root}
              style={{ padding: "0px", marginBottom: "65px" }}
            >
              <Grid className="m-0 w-100" container spacing={4}>
                <Grid className="profileImg" item xs={12} sm={12} md={4}>
                  <div className="App">
                    <div className="profile-image">
                      <label htmlFor="fileProfile">
                        {
                          imageViewUrl ?
                            <img src={imageViewUrl ? imageViewUrl : ''} />
                            :
                            <AccountCircle className="profile-dummy-ico" />
                        }
                        <button type="button" class="chooseFileButton ">
                          <CameraAlt />
                        </button>
                      </label>
                      <input type="file" id='fileProfile' name="" multiple="" accept="image/*"
                        onChange={onimageListChange}
                      ></input>
                    </div>
                  </div>
                  {/* <div className="Remy">
                    <div>
                      <h3>Ryan Jason</h3>
                    </div>
                    <p>Student Pilot</p>
                  </div> */}
                </Grid>
                <Grid className="custom_form_field" item xs={12} sm={12} md={4}>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield form-control"
                      id="outlined-basic"
                      label="First name"
                      inputProps={{ maxLength: 50 }}
                      error={Boolean(formValid.errors.firstname)}
                      margin="normal"
                      value={state?.firstname}
                      required
                      fullWidth
                      helperText={formValid.errors.firstname}
                      name="firstname"
                      onBlur={formValid.handleBlur}
                      onChange={onChange}
                      autoComplete="firstname"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield form-control"
                      id="outlined-basic"
                      label="Middle Name"
                      value={state?.middlename}
                      inputProps={{ maxLength: 50 }}
                      error={Boolean(formValid.errors.middlename)}
                      margin="normal"
                      fullWidth
                      helperText={formValid.errors.middlename}
                      name="middlename"
                      onBlur={formValid.handleBlur}
                      onChange={onChange}
                      autoComplete="middlename"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield form-control"
                      id="outlined-basic"
                      label="Last Name"
                      inputProps={{ maxLength: 50 }}
                      error={Boolean(formValid.errors.lastname)}
                      margin="normal"
                      required
                      value={state?.lastname}
                      fullWidth
                      helperText={formValid.errors.lastname}
                      name="lastname"
                      onBlur={formValid.handleBlur}
                      onChange={onChange}
                      autoComplete="lastname"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                  <FormControl
                      className="form-control"
                      fullWidth
                      error={formValid.errors.gender?.length}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Gender
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        input={<OutlinedInput label="Gender" />}
                        // value={state.Gender}
                        label="Gender"
                        name="gender"
                        variant="outlined"
                        value={state.gender}
                        onChange={onChange}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                      {formValid.errors?.gender?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.gender}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} className="basic">
                  <FormControl
                      className="form-control"
                      fullWidth
                      error={formValid.errors.nationality?.length}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Nationality
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        input={<OutlinedInput label="Nationality" />}
                        // value={state.nationality}
                        label="Nationality"
                        name="nationality"
                        variant="outlined"
                        value={state.nationality}
                        onChange={onChange}
                      >
                        {
                          nationality?.map((d, i) => <MenuItem key={i + d.name} value={d.name}>{d.value}</MenuItem>)
                        }
                      </Select>
                      {formValid.errors?.nationality?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.nationality}
                        </FormHelperText>
                      )}
                    </FormControl>
                    {/* <FormControl
                      className="form-control"
                      fullWidth
                      error={formValid.errors.nationality?.length}
                    >
                      <InputLabel id="nationality-simple-select-label">
                        Nationality
                      </InputLabel>
                      <Select
                        labelId="nationality-simple-select-label"
                        id="nationality-multiple-name"
                        value={state.nationality}
                        label="Nationality"
                        name="nationality"
                        variant="outlined"
                        onChange={onChange}
                      >
                        {
                          nationality?.map((d, i) => <MenuItem key={i + d.name} value={d.name}>{d.value}</MenuItem>)
                        }
                      </Select>
                      {formValid.errors?.nationality?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.nationality}
                        </FormHelperText>
                      )}
                    </FormControl> */}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      disabled
                      className="textfield form-control"
                      id="outlined-basic"
                      label="Email ID"
                      value={state?.email}
                      required
                      error={Boolean(formValid.errors.email)}
                      fullWidth
                      helperText={formValid.errors.email}
                      margin="normal"
                      name="email"
                      onBlur={formValid.handleBlur}
                      onChange={onChange}
                      type="email"
                      //  value={email}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      disabled
                      inputProps={{ maxLength: 10 }}
                      error={Boolean(formValid.errors.phone)}
                      margin="normal"
                      className="textfield form-control"
                      id="outlined-basic"
                      label="Contact No"
                      fullWidth
                      value={state?.phone}
                      helperText={formValid.errors.phone}
                      onKeyPress={onKeyPress}
                      onBlur={formValid.handleBlur}
                      onChange={onChange}
                      name="phone"
                      autoComplete="number"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <LocalizationProvider
                      className="form-control"
                      dateAdapter={AdapterDateFns}
                    >
                      <Stack spacing={3} className="datefield">
                        <DesktopDatePicker
                          fullWidth
                          label='Date of Birth'
                          variant="outlined"
                          inputFormat="MM/dd/yyyy"
                          value={dateFormat}
                          onChange={handleChange}
                          renderInput={(params) => <TextField name='date_of_birth' {...params} helperText={formValid.errors.dateFormat} error={Boolean(formValid.errors.dateFormat)} />}
                        />
                      </Stack>
                      {formValid.errors?.date_of_birth?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.date_of_birth}
                        </FormHelperText>
                      )}
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                <Grid
                  className="custom_form_field pt-sm-0"
                  item
                  xs={12}
                  sm={12}
                  md={4}
                >
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield form-control"
                      id="outlined-basic"
                      label="eGCA ID"
                      inputProps={{ maxLength: 20 }}
                      error={Boolean(formValid.errors.egca_id)}
                      margin="normal"
                      fullWidth
                      value={state?.egca_id}
                      helperText={formValid.errors.egca_id}
                      name="egca_id"
                      onBlur={formValid.handleBlur}
                      onChange={onChange}
                      autoComplete="egca_id"
                      variant="outlined"
                    />
                  </Grid>

                  {role === 1 ?<Grid item xs={12} sm={12} md={12} className="basic bac_col">
                    <FormControl
                      className="form-control"
                      fullWidth
                      error={formValid.errors.course_applied?.length}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Course Applied For
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        input={<OutlinedInput label="Course Applied For" />}
                        // value={state.course_applied}
                        label="Course Applied For"
                        name="course_applied"
                        variant="outlined"
                        value={state.course_applied}
                        onChange={onChange}
                      >
                        {courses?.map((d, key) => (
                          <MenuItem key={key + d?.id} value={d.id}>
                            {d.course_name}
                          </MenuItem>
                        ))}
                      </Select>
                      {formValid.errors?.course_applied?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.course_applied}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>:null}
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield form-control"
                      id="outlined-basic"
                      label="Address"
                      error={Boolean(formValid.errors.address)}
                      margin="normal"
                      value={state?.address}
                      fullWidth
                      helperText={formValid.errors.address}
                      name="address"
                      onBlur={formValid.handleBlur}
                      onChange={onChange}
                      autoComplete="address"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                  <FormControl
                      className="form-control"
                      fullWidth
                      error={formValid.errors.country?.length}
                    >
                      <InputLabel id="demo-simple-select-label">
                      Country
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        input={<OutlinedInput label="Country" />}
                        // value={state.Gender}
                        label="Country"
                        name="country"
                        variant="outlined"
                        value={state.country}
                        onChange={onChange}
                      >
                        {countries?.map((d, key) => (
                          <MenuItem key={key + d?.code} value={d?.code}>
                            {d?.country_name}
                          </MenuItem>
                        ))}
                      </Select>
                      {formValid.errors?.country?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.country}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield form-control"
                      id="outlined-basic"
                      label="State"
                      inputProps={{ maxLength: 50 }}
                      error={Boolean(formValid.errors.state)}
                      margin="normal"
                      value={state?.state}
                      fullWidth
                      helperText={formValid.errors.state}
                      name="state"
                      onBlur={formValid.handleBlur}
                      onChange={onChange}
                      autoComplete="state"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield form-control"
                      id="outlined-basic"
                      label="City"
                      inputProps={{ maxLength: 50 }}
                      error={Boolean(formValid.errors.city)}
                      margin="normal"
                      value={state?.city}
                      fullWidth
                      helperText={formValid.errors.city}
                      name="city"
                      onBlur={formValid.handleBlur}
                      onChange={onChange}
                      autoComplete="city"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield form-control"
                      id="outlined-basic"
                      label="Pin"
                      inputProps={{ maxLength: 6 }}
                      error={Boolean(formValid.errors.pin)}
                      margin="normal"
                      value={state?.pin}
                      fullWidth
                      helperText={formValid.errors.pin}
                      name="pin"
                      onBlur={formValid.handleBlur}
                      onChange={onChange}
                      autoComplete="pin"
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
                onClick={() => { }}
              >
                Back
              </Button>
            </Link>
            <Button variant="contained" type="submit" className="save" onClick={() => setGoNext(true)}>
              Save & Next
            </Button>
            <Button variant="contained" type="submit" className="save">
              Submit
            </Button>
          </Stack>
        </form>
      </Container>
    </AppLayout>
  );
}
export default withContext(AddUser);
