import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { useHistory } from "react-router";
import swal from "sweetalert";
import Stack from "@mui/material/Stack";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Divider from "@mui/material/Divider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AppLayout from "../../../../layout/appLayout";
import Fetch from "../../../../common/fetch";
import { FormC, onKeyPress } from "../../../../common/validation"
import FormHelperText from '@mui/material/FormHelperText'
import moment from 'moment';
import { withContext } from "../../../../context/appContext";
import { Link } from "react-router-dom";
import SearchSelect from "../../../../component/searchselect";

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
  useEffect(() => {
    document.title = "Instrument Rating";
  }, []);
  const [loader, setLoader] = useState(true)
  const [typeOfAirCraft, setTypeOfAirCraft] = useState([])
  const [noFound, setNoFound] = useState('')
  const [aircraftTypeValue, setAircraftType] = useState('')
  const [nextPage, setNextPage] = useState('')
  const [date, setDate] = useState({
    issue_date: null,
    valid_upto_initial: null,
    renewal_date: null,
    valid_upto: null,
  })
  const [state, setState] = useState({
    instrument_number: "",
    issue_date: "",
    valid_upto_initial: "",
    renewal_date: "",
    valid_upto: "",
    upload_file: "",
    aircraft_type:''
  })
  useEffect(() => {
    aircraftType()
    if (props?.match?.params?.id !== 'add') {
      let detail = props.context?.license?.instrument?.filter(d => d.id === +props?.match?.params?.id)
      detail = detail && detail[0]
      setDate({
        issue_date: moment(detail.issue_date).format('llll'),
        valid_upto_initial: moment(detail.valid_upto_initial).format('llll'),
        renewal_date: moment(detail.renewal_date).format('llll'),
        valid_upto: moment(detail.valid_upto).format('llll'),
      })
      setState({
        instrument_number: detail?.instrument_number,
        issue_date: detail?.issue_date,
        valid_upto_initial: detail?.valid_upto_initial,
        renewal_date: detail?.renewal_date,
        valid_upto: detail?.valid_upto,
        upload_file: '',
        aircraft_type:detail?.aircraft_type
      })
      setLoader(false)
    } else {
      setLoader(false)
    }
  }, [props?.context])
  const fileChange = (e) => {
    setState({
      ...state,
      upload_file: e.target.files[0]
    });
  }
  const onSubmit = () => {
    Fetch(`accounts/instrument/${props?.match?.params?.id === 'add' ? '' : props?.match?.params?.id + '/'}`, state, { method: props?.match?.params?.id === 'add' ? 'post' : 'patch', inFormData: true })
      .then(d => {
        if (d?.status) {
          if (props?.match?.params?.id === 'add') {
            setState({
              instrument_number: "",
              issue_date: "",
              valid_upto_initial: "",
              renewal_date: "",
              valid_upto: "",
              upload_file: "",
              aircraft_type:""
            })
            setDate({
              issue_date: null,
              valid_upto_initial: null,
              renewal_date: null,
              valid_upto: null
            })
          }
          swal("Instrument Rating Added Successfully.", "", "success", {
            button: "OK",
          }).then(d => props.history.goBack());
        } else {
          swal("Something went wrong!", "Oops...", "error", {
            button: "OK",
          });
        }

      })
  }
  const formValid = FormC({
    values: state,
    removeValidValue: ['upload_file','valid_upto','renewal_date','issue_date','valid_upto_initial'],
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
    if (name === 'valid_upto_initial') {
      let fromD = moment(date.issue_date).format('L')
      if (statedate.issue_date?.toString().length && !moment(fromD).isSame(moment(statedate.valid_upto_initial).format('L')) && !moment(statedate.issue_date).isAfter(moment(statedate.valid_upto_initial).format())) {
        dateUpdate(val, name)
      } else {
        dateNull(name)
      }
    }else if (name === 'valid_upto') {
      let fromD = moment(date.renewal_date).format('L')
      if (statedate.renewal_date?.toString().length && !moment(fromD).isSame(moment(statedate.valid_upto).format('L')) && !moment(statedate.renewal_date).isAfter(moment(statedate.valid_upto).format())) {
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
  const acNameChnage = (e) => {
    const { name, value } = e.target
    setAircraftType(value)
    aircraftType(value)
  }
  const aircraftType = (val, url) => {
    Fetch(`aircraft/aircraft-type/${val ? '?q=' + val : ''}`, null, { url: url }).then(d => {
      if (d?.status) {
        if (url) {
          setTypeOfAirCraft((prev) => ([
            ...prev,
            ...d.data.results
          ]))
        } else {
          setTypeOfAirCraft(d.data.results)
        }
        if (val?.length && !d.data.results?.length) {
          setNoFound('No Data Found')
        } else {
          setNoFound('')
        }
        setNextPage(d.data.next)
      }
    })
  }
  const onSelect = (val) => {
    // setAircraftType(val.id)
    setState({
      ...state,
      aircraft_type: val.id
    })
  }
  const loadMoreItems = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom) {
      aircraftType('', nextPage)
    }
  }
  return (
    <AppLayout>
      <Container maxWidth="xl">
        {!loader ? <form method="POST" noValidate onSubmit={formValid.handleSubmit}>
          <Paper elevation={3} style={{ marginTop: "20px" }}>
            <div
              className={classes.root}
              style={{ padding: "20px 20px 50px", marginBottom: "30px" }}
            >
              <div className="customHeadingMar">
                <h2>Instrument Rating</h2>
                <Divider />
              </div>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={5}>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <FormControl className="form-control"
                      fullWidth
                      error={formValid.errors.aircraft_type?.length}>
                      <InputLabel id="demo-simple-select-label">
                        Type Of Aircraft
                      </InputLabel >
                      <SearchSelect
                        className="textfield"
                        id="outlined-basic"
                        label="Type Of Aircraft"
                        noFound={noFound}
                        error={Boolean(formValid.errors.aircraft_type && formValid.errors.aircraft_type)}
                        helperText={formValid.errors.aircraft_type}
                        name="aircraft_type"
                        onInputChange={acNameChnage}
                        value={aircraftTypeValue}
                        onSelect={onSelect}
                        list={typeOfAirCraft}
                        variant="outlined"
                        showValue={{ value: 'id', name: 'aircraft_type' }}
                        onScroll={loadMoreItems}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Instrument No."
                      inputProps={{ maxLength: 50 }}
                      error={Boolean(
                        formValid.errors.instrument_number
                      )}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.instrument_number
                      }
                      name="instrument_number"
                      value={state.instrument_number}
                      onBlur={formValid.handleBlur}
                      onChange={onChange}
                      autoComplete="instrument_number"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack className="datefield" spacing={2}>
                        <DesktopDatePicker
                          label="Initial Issuance Date"
                          input={<OutlinedInput label="Initial Issuance Date" />}
                          fullWidth
                          variant="outlined"
                          inputFormat="MM/dd/yyyy"
                          value={date.issue_date}
                          onChange={(val) => onChangeDate(val, 'issue_date')}
                          renderInput={(params) => <TextField {...params} name='issue_date' />}
                        />
                      </Stack>
                      {formValid.errors?.issue_date?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.issue_date}
                        </FormHelperText>
                      )}
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack className="datefield" spacing={2}>
                        <DesktopDatePicker
                          label="Valid Upto"
                          input={<OutlinedInput label="Valid Upto" />}
                          fullWidth
                          variant="outlined"
                          inputFormat="MM/dd/yyyy"
                          value={date.valid_upto_initial}
                          onChange={(val) => onChangeDate(val, 'valid_upto_initial')}
                          renderInput={(params) => <TextField {...params} name='valid_upto_initial' />}
                        />
                      </Stack>
                      {formValid.errors?.valid_upto_initial?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.valid_upto_initial}
                        </FormHelperText>
                      )}
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack className="datefield" spacing={2}>
                        <DesktopDatePicker
                          label="Renewal Date"
                          input={<OutlinedInput label="Renewal Date" />}
                          fullWidth
                          variant="outlined"
                          value={date.renewal_date}
                          inputFormat="MM/dd/yyyy"
                          onChange={(val) => onChangeDate(val, 'renewal_date')}
                          renderInput={(params) => <TextField {...params} name='renewal_date' />}
                        />
                      </Stack>
                      {formValid.errors?.renewal_date?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.renewal_date}
                        </FormHelperText>
                      )}
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack className="datefield" spacing={2}>
                        <DesktopDatePicker
                          label="Valid Upto"
                          input={<OutlinedInput label="Valid Upto" />}
                          value={date.valid_upto}
                          fullWidth
                          variant="outlined"
                          inputFormat="MM/dd/yyyy"
                          onChange={(val) => onChangeDate(val, 'valid_upto')}
                          renderInput={(params) => <TextField {...params} name='valid_upto' />}
                        />
                      </Stack>
                      {formValid.errors?.valid_upto?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.valid_upto}
                        </FormHelperText>
                      )}
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <input id="images" type='file' onChange={fileChange} accept="images/*" />
                    {/* <input type="file" onChange={fileChange} /> */}
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
            <Link to={`/user-profile/licenses`} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                type="button"
                className="save"
                onClick={() => { }}
              >
                Back
              </Button>
            </Link>
            <Button variant="contained" type="submit" className="save">
              Submit
            </Button>
          </Stack>
        </form> : null}
      </Container>
    </AppLayout>
  );
}
export default withContext(AddUser)