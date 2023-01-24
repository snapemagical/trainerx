import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
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
import { FormC } from "../../../../common/validation";
import moment from 'moment';
import Fetch from "../../../../common/fetch";
import FormHelperText from '@mui/material/FormHelperText'
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
  const [License, setLicense] = useState();
  const [loader, setLoader] = useState(true)
  const [License_type, setLicense_type] = useState();
  const [date, setDate] = useState({
    valid_from: null,
    valid_to: null,
  })
  const [state, setState] = useState({
    license_number: '',
    license_type: '',
    category: '',
    valid_from: '',
    valid_to: '',
    issue_country: '',
    license_document: '',
  })
  useEffect(() => {
    if (props?.match?.params?.id !== 'add') {
      let detail = props.context?.license?.license?.filter(d => d.id === +props?.match?.params?.id)
      detail = detail && detail[0]
      setDate({
        valid_from: moment(detail.valid_from).format('llll'),
        valid_to: moment(detail.valid_to).format('llll'),
      })
      setState({
        license_number: detail?.license_number,
        license_type: detail?.license_type,
        category: detail?.category,
        valid_from: detail?.valid_from,
        valid_to: detail?.valid_to,
        issue_country: detail?.issue_country,
        license_document: '',
      })
      setLoader(false)
    } else {
      setLoader(false)
    }
  }, [props?.context])
  useEffect(() => {
    document.title = "Add License";
    Fetch('accounts/get-all-countries/').then(d => {
      setLicense(d?.data?.countries)
    })

    Fetch('accounts/license/get_choice_fields/').then(d => {
      setLicense_type(d?.data)
    })
  }, []);
  const onSubmit = () => {
    Fetch(`accounts/license/${props?.match?.params?.id === 'add' ? '' : props?.match?.params?.id + '/'}`, state, { method: props?.match?.params?.id === 'add' ? 'post' : 'patch', inFormData: true }).then(d => {
      if (d?.status) {
        if (props?.match?.params?.id === 'add') {
          setDate({
            valid_from: null,
            valid_to: null,
          })
          setState({
            license_number: '',
            license_type: '',
            category: '',
            valid_from: '',
            valid_to: '',
            issue_country: '',
            license_document: '',
          })
        }
        swal("License Added Successfully.", "", "success", {
          button: "OK",
        }).then(d => props.history.goBack());
      }
    })
  }
  const formValid = FormC({
    values: state,
    onSubmit,
    removeValidValue: ['license_document']
  })
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };
  const onChangeDate = (val, name) => {
    if (name === 'valid_to') {
      let fromD = moment(date.valid_from).format('L')
      if (state.valid_from?.length && !moment(fromD).isSame(moment(val).format('L')) && !moment(date.valid_from).isAfter(moment(val).format())) {
        dateUpdate(val, name)
      } else {
        setDate({
          ...date,
          [name]: null
        })
        setState({
          ...state,
          [name]:''
        });
      }
    } else {
      dateUpdate(val, name)
    }
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
  const fileChange = (e) => {
    setState({
      ...state,
      license_document: e.target.files[0]
    });
  }
  const classes = useStyles();
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
                <h2>Add License</h2>
                <Divider />
              </div>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={5}>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="License No."
                      inputProps={{ maxLength: 50 }}
                      error={Boolean(
                        formValid.errors.license_number
                      )}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.license_number
                      }
                      name="license_number"
                      defaultValue={state.license_number}
                      onBlur={formValid.handleBlur}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="license_number"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <FormControl fullWidth
                      error={formValid.errors.license_type?.length}
                    >
                      <InputLabel id="demo-simple-select-label"
                      >
                        License Type
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-controlled-open-select"
                        input={<OutlinedInput label="License Type" />}
                        value={state.license_type}
                        label="License Type"
                        name="license_type"
                        onChange={onChange}
                        //defaultValue="CBSE"
                        variant="outlined"
                      >
                        {License_type?.license_choices?.map((d) => (
                          <MenuItem value={d.id}>{d.type}</MenuItem>
                        ))}
                      </Select>
                      {formValid.errors?.license_type?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.license_type}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <FormControl fullWidth
                      error={formValid.errors.category?.length}
                    >
                      <InputLabel id="demo-simple-select-label"
                      >
                        Category
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-controlled-open-select"
                        input={<OutlinedInput label="License Type" />}
                        value={state.category}
                        label="Category"
                        name="category"
                        onChange={onChange}
                        variant="outlined"
                      >
                        {License_type?.category_choices?.map((d) => (
                          <MenuItem value={d.id}>{d.category}</MenuItem>
                        ))}
                      </Select>
                      {formValid.errors?.category?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.category}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack className="datefield" spacing={2}>
                        <DesktopDatePicker
                          label="Valid From"
                          fullWidth
                          variant="outlined"
                          inputFormat="MM/dd/yyyy"
                          value={date.valid_from}
                          onChange={(val) => onChangeDate(val, 'valid_from')}
                          renderInput={(params) => <TextField {...params} name='valid_from'/>}
                        />
                      </Stack>
                      {formValid.errors?.valid_from?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.valid_from}
                        </FormHelperText>
                      )}
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
                          value={date.valid_to}
                          onChange={(val) => onChangeDate(val, 'valid_to')}
                          renderInput={(params) => <TextField {...params} name='valid_to'/>}
                        />
                      </Stack>
                      {formValid.errors?.valid_to?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.valid_to}
                        </FormHelperText>
                      )}
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
                      {formValid.errors?.issue_country?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.issue_country}
                        </FormHelperText>
                      )}
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