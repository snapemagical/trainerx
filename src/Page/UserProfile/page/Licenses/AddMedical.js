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
import Divider from '@mui/material/Divider';
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
  let history = useHistory();
  useEffect(() => {
    document.title = "Add License";
  }, []);
  const [loader, setLoader] = useState(true)
  const [date, setDate] = useState({
    date_of_exam: null,
    valid_upto: null,
  })
  const [state, setState] = useState({
    medical_examination: '',
    medical_status: '',
    date_of_exam: '',
    valid_upto: '',
    blood_group: '',
    medical_file: '',
  })
  useEffect(() => {
    if (props?.match?.params?.id !== 'add') {
      let detail = props.context?.license?.medical?.filter(d => d.id === +props?.match?.params?.id)
      detail = detail && detail[0]
      setDate({
        date_of_exam: moment(detail.date_of_exam).format('llll'),
        valid_upto: moment(detail.valid_upto).format('llll'),
      })
      setState({
        medical_examination: detail?.medical_examination,
        medical_status: detail?.medical_status,
        date_of_exam: detail?.date_of_exam,
        blood_group: detail?.blood_group,
        valid_upto: detail?.valid_upto,
        medical_file: '',
      })
      setLoader(false)
    } else {
      setLoader(false)
    }
  }, [props?.context])
  const onSubmit = () => {
    Fetch(`accounts/medical/${props?.match?.params?.id=== 'add'?'':props?.match?.params?.id+'/'}`, state, { method: props?.match?.params?.id === 'add' ? 'post' : 'patch', inFormData: true })
      .then(d => {
        if (d?.status) {
          if (props?.match?.params?.id === 'add') {
            setDate({
              date_of_exam: null,
              valid_upto: null,
            })
            setState({
              medical_examination: '',
              medical_status: '',
              date_of_exam: '',
              valid_upto: '',
              blood_group: '',
              medical_file: '',
            })
          }
          swal("Medical Detail Added Successfully.", "", "success", {
            button: "OK",
          }).then(d=>props.history.goBack());
        } else {
          swal("Something went wrong!", "Oops...", "error", {
            button: "OK",
          });
        }

      })
  }
  const formValid = FormC({
    values: state,
    onSubmit,
    removeValidValue: ['medical_file']
  })
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const onChangeDate = (val, name) => {
    if (name === 'valid_upto') {
      let fromD = moment(date.date_of_exam).format('L')
      if (state.date_of_exam?.length && !moment(fromD).isSame(moment(val).format('L')) && !moment(date.date_of_exam).isAfter(moment(val).format())) {
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
      medical_file: e.target.files[0]
    });
  }
  const classes = useStyles();

  return (
    <AppLayout>
      <Container maxWidth="xl">
        {!loader ? <form method="POST" noValidate onSubmit={formValid.handleSubmit}>
          <Paper elevation={3} style={{ marginTop: '20px' }}>
            <div
              className={classes.root}
              style={{ padding: '20px 20px 50px', marginBottom: '65px' }}
            >
              <div className="customHeadingMar">
                <h2>Add Medical</h2>
                <Divider />
              </div>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={5} className='selectField'>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Class of Medical Examination
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-outlined"
                        id="demo-simple-select-outlined"
                        input={<OutlinedInput label="Class of Medical Examination" />}
                        value={state.medical_examination}
                        name='medical_examination'
                        label="Class of Medical Examination"
                        onChange={onChange}
                        variant="outlined"
                      >
                        <MenuItem value="class1">Class I</MenuItem>
                        <MenuItem value="class2">Class II</MenuItem>
                        <MenuItem value="class3">Class III</MenuItem>
                      </Select>
                      {formValid.errors?.medical_examination?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.medical_examination}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Medical Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-multiple-name"
                        input={<OutlinedInput label="Medical Status" />}
                        value={state.medical_status}
                        label="Medical Status"
                        variant="outlined"
                        name='medical_status'
                        onChange={onChange}
                      >
                        <MenuItem value="fit">Fit</MenuItem>
                        <MenuItem value="temporary_unfit">Temporarily Unfit</MenuItem>
                        <MenuItem value="permanent_unfit">Permanently Unfit</MenuItem>
                      </Select>
                      {formValid.errors?.medical_status?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.medical_status}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack className="datefield" spacing={2}>
                        <DesktopDatePicker
                          label="Date of Examination"
                          fullWidth
                          variant="outlined"
                          inputFormat="MM/dd/yyyy"
                          value={date.date_of_exam}
                          onChange={(val) => onChangeDate(val, 'date_of_exam')}
                          renderInput={(params) => <TextField {...params} name='date_of_exam'/>}
                        />
                      </Stack>
                      {formValid.errors?.date_of_exam?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.date_of_exam}
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
                          value={date.valid_upto}
                          onChange={(val) => onChangeDate(val, 'valid_upto')}
                          renderInput={(params) => <TextField {...params} name='valid_upto'/>}
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
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Blood Group
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-multiple-name"
                        input={<OutlinedInput label="Blood Group" />}
                        value={state.blood_group}
                        label="Blood Group"
                        name="blood_group"
                        variant="outlined"
                        onChange={onChange}
                      >

                        <MenuItem value="a +ve">A +ve</MenuItem>
                        <MenuItem value="a -ve">A -ve</MenuItem>
                        <MenuItem value="b +ve">B +ve</MenuItem>
                        <MenuItem value="b -ve">B -ve</MenuItem>
                        <MenuItem value="ab +ve">AB +ve</MenuItem>
                        <MenuItem value="ab -ve">AB -ve</MenuItem>
                        <MenuItem value="o +ve">O +ve</MenuItem>
                        <MenuItem value="o -ve">O -ve</MenuItem>
                      </Select>
                      {formValid.errors?.blood_group?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.blood_group}
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
        </form> : null}
      </Container>
    </AppLayout>
  );
}
export default withContext(AddUser)