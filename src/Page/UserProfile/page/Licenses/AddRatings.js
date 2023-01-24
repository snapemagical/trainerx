import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useHistory } from "react-router";
import swal from "sweetalert";
import Stack from "@mui/material/Stack";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Divider from '@mui/material/Divider';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AppLayout from "../../../../layout/appLayout";
import FormHelperText from '@mui/material/FormHelperText'
import Fetch from "../../../../common/fetch";
import { FormC, onKeyPress } from "../../../../common/validation"
import moment from 'moment';
import { withContext } from "../../../../context/appContext";
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

function AddUser(props) {
  let history = useHistory();
  const [License, setLicense] = useState();
  const [allJson, setallJson] = useState();
  const [date, setDate] = useState({
    initial_issue_date: null,
    initial_valid_upto: null,
    renewal_date: null,
    renewal_valid_upto: null,
  })
  const [state, setState] = useState({
    rating: "",
    rating_number: "",
    initial_issue_date: "",
    initial_valid_upto: "",
    renewal_date: "",
    renewal_valid_upto: "",
    issue_country: "",
    ratings_file: ""
  })
  const [loader,setLoader] = useState(true)
  useEffect(() => {
    document.title = "Add Ratings";
    Fetch('accounts/get-all-countries/').then(d => {
      setLicense(d?.data?.countries)
    })
    Fetch("accounts/license/get_choice_fields/").then((d) => {
      setallJson(d?.data);
    });
  }, []);
  useEffect(()=>{
    if(props?.match?.params?.id!== 'add'){
    Fetch(`accounts/ratings/${props?.match?.params?.id+'/'}`, {}, { method: 'patch', inFormData: true })
      .then(d => {
        if(d?.status){
          const {data} = d.data
          setDate({
            initial_issue_date: moment(data.initial_issue_date).format('llll'),
            initial_valid_upto: moment(data.initial_valid_upto).format('llll'),
            renewal_date: moment(data.renewal_date).format('llll'),
            renewal_valid_upto: moment(data.renewal_valid_upto).format('llll'),
          })
          setState({
            rating:data?.rating,
            rating_number:data?.rating_number,
            initial_issue_date:data?.initial_issue_date,
            initial_valid_upto:data?.initial_valid_upto,
            renewal_date:data?.renewal_date,
            renewal_valid_upto:data?.renewal_valid_upto,
            issue_country:data?.issue_country,
            ratings_file:''
          })
        }
    setLoader(false)
      })
    }else{
      setLoader(false)
    }
  },[props?.match?.params])
  const fileChange = (e) => {
    setState({
      ...state,
      ratings_file: e.target.files[0]
    });
  }


  
  const onSubmit = () => {
    Fetch(`accounts/ratings/${props?.match?.params?.id=== 'add'?'':props?.match?.params?.id+'/'}`, state, { method: props?.match?.params?.id=== 'add'?'post':'patch', inFormData: true })
      .then(d => {
        if (d?.status) {
          if(props?.match?.params?.id=== 'add'){
          setDate({
            initial_issue_date: null,
            initial_valid_upto: null,
            renewal_date: null,
            renewal_valid_upto: null,
          })
          setState({
            rating: "",
            rating_number: "",
            initial_issue_date: "",
            initial_valid_upto: "",
            renewal_date: "",
            renewal_valid_upto: "",
            issue_country: "",
            ratings_file: ""
          })
        }
          swal("Ratings Added Successfully.", "", "success", {
            button: "OK",
          });
        } else {
          swal("Something went wrong!", "Oops...", "error", {
            button: "OK",
          });
        }
      })
  }
  const formValid = FormC({
    values: state,
    removeValidValue: ['renewal_date','renewal_valid_upto','initial_valid_upto','issue_country','ratings_file'],
    onSubmit,
  })

  const onChange = (e) => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value,
    })
    formValid?.handleChange(e)
  }

  const onChangeDate = (val, name) => {
    const statedate = {
        ...date,
        [name]:val
    }
    if (name === 'initial_valid_upto') {
      let fromD = moment(date.initial_issue_date).format('L')
      if (statedate.initial_issue_date?.toString().length && !moment(fromD).isSame(moment(statedate.initial_valid_upto).format('L')) && !moment(statedate.initial_issue_date).isAfter(moment(statedate.initial_valid_upto).format())) {
        dateUpdate(val, name)
      } else {
        dateNull(name)
      }
    }else if (name === 'renewal_valid_upto') {
      let fromD = moment(date.renewal_date).format('L')
      if (statedate.renewal_date?.toString().length && !moment(fromD).isSame(moment(statedate.renewal_valid_upto).format('L')) && !moment(statedate.renewal_date).isAfter(moment(statedate.renewal_valid_upto).format())) {
        dateUpdate(val, name)
      } else {
        dateNull(name)
      }
    } else {
      dateUpdate(val, name)
    }
  }
  const dateNull = (name)=>{
    setDate({
      ...date,
      [name]: null
    })
    setState({
      ...state,
      [name]:''
    });
  }
  const dateUpdate = (val, name)=>{
    const d = val ? moment(val).format('YYYY-MM-DD') : val
    setDate({
      ...date,
      [name]: val
    })
    setState({
      ...state,
      [name]: d
    });
  }
  const classes = useStyles();
  return (
    <AppLayout>
      <Container maxWidth="xl">
        {!loader?<form method="POST" noValidate onSubmit={formValid.handleSubmit}>
          <Paper elevation={3} style={{ marginTop: '20px' }}>
            <div
              className={classes.root}
              style={{ padding: '20px 20px 50px', marginBottom: '65px' }}
            >
              <div className="customHeadingMar">
                <h2>Add Ratings</h2>
                <Divider />
              </div>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={5}>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Rating
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-controlled-open-select"
                        input={<OutlinedInput label="Rating" />}
                        value={state.rating}
                        label="Rating"
                        name="rating"
                        onChange={onChange}
                        variant="outlined"
                      >
                        {
                          allJson?.rating_choice?.map((d,i)=><MenuItem value={d.id} key={i}>{d.rating_name}</MenuItem>)
                        }
                      </Select>
                      {formValid.errors?.rating?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.rating}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Rating No."
                      inputProps={{ maxLength: 50 }}
                      error={Boolean(
                        formValid.errors.rating_number
                      )}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.rating_number
                      }
                      name="rating_number"
                      onBlur={formValid.handleBlur}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      defaultValue={state?.rating_number}
                      autoComplete="rating_number"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack className="datefield" spacing={2}>
                        <DesktopDatePicker
                          label="Initial Issuance Date"
                          fullWidth
                          variant="outlined"
                          inputFormat="MM/dd/yyyy"
                          value={date.initial_issue_date}
                          onChange={(val) => onChangeDate(val, 'initial_issue_date')}
                          renderInput={(params) => <TextField {...params} name='initial_issue_date'/>}
                        />
                      </Stack>
                      {formValid.errors?.initial_issue_date?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.initial_issue_date}
                        </FormHelperText>
                      )}
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack className="datefield" spacing={2}>
                        <DesktopDatePicker
                          label="Valid Upto(Initial)"
                          fullWidth
                          variant="outlined"
                          inputFormat="MM/dd/yyyy"
                          value={date.initial_valid_upto}
                          onChange={(val) => onChangeDate(val, 'initial_valid_upto')}
                          renderInput={(params) => <TextField {...params} name='initial_valid_upto'/>}
                        />
                      </Stack>
                      {/* {formValid.errors?.initial_valid_upto?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.initial_valid_upto}
                        </FormHelperText>
                      )} */}
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack className="datefield" spacing={2}>
                        <DesktopDatePicker
                          label="Renewal Date"
                          fullWidth
                          variant="outlined"
                          inputFormat="MM/dd/yyyy"
                          value={date.renewal_date}
                          onChange={(val) => onChangeDate(val, 'renewal_date')}
                          renderInput={(params) => <TextField {...params} name='renewal_date'/>}
                        />
                      </Stack>
                      {/* {formValid.errors?.renewal_date?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.renewal_date}
                        </FormHelperText>
                      )} */}
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack className="datefield" spacing={2}>
                        <DesktopDatePicker
                          label="Valid Upto"
                          fullWidth
                          variant="outlined"
                          inputFormat="MM/dd/yyyy"
                          value={date.renewal_valid_upto}
                          onChange={(val) => onChangeDate(val, 'renewal_valid_upto')}
                          renderInput={(params) => <TextField {...params} name='renewal_valid_upto'/>}
                        />
                      </Stack>
                      {/* {formValid.errors?.renewal_valid_upto?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.renewal_valid_upto}
                        </FormHelperText>
                      )} */}
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <FormControl fullWidth
                      error={formValid.errors.issue_country?.length}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Issuing Country
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-multiple-name"
                        input={<OutlinedInput label="Issuing Country" />}
                        value={state.issue_country}
                        label="Issuing Country"
                        variant="outlined"
                        name='issue_country'
                        onChange={onChange}
                      >

                        {License?.map((d) => (
                          <MenuItem value={d.code}>{d.country_name}</MenuItem>
                        ))}
                      </Select>
                      {/* {formValid.errors?.issue_country?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.issue_country}
                        </FormHelperText>
                      )} */}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <input type="file" onChange={fileChange} />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Paper>
          <Stack
            spacing={2}
            direction="row"
            className="buttonss"
            style={{ justifyContent: 'right' }}
          >
            <Link to={`/user-profile/licenses`} style={{ textDecoration: "none" }}>
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
        </form>:null}
      </Container>
    </AppLayout>
  );
}
export default withContext(AddUser)