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
import FormHelperText from '@mui/material/FormHelperText'
import { FormC, onKeyPress } from "../../../../common/validation"
import Fetch from "../../../../common/fetch";
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
  const [loader, setLoader] = useState(true)
  const [date, setDate] = useState({
    issue_date: null,
    valid_date: null,
  })
  const [state, setState] = useState({
    level: '',
    issue_date: '',
    valid_date: '',
    upload_elp_file: '',
  })
  useEffect(() => {
    if (props?.match?.params?.id !== 'add') {
      let detail = props.context?.license?.elp?.filter(d => d.id === +props?.match?.params?.id)
      detail = detail && detail[0]
      setDate({
        issue_date: moment(detail.issue_date).format('llll'),
        valid_date: moment(detail.valid_date).format('llll'),
      })
      setState({
        level: detail?.level,
        issue_date: detail?.issue_date,
        valid_date: detail?.valid_date,
        upload_elp_file: ''
      })
      setLoader(false)
    } else {
      setLoader(false)
    }
  }, [props?.context])
  const onSubmit = () => {
    Fetch(`accounts/elp/${props?.match?.params?.id=== 'add'?'':props?.match?.params?.id+'/'}`, state, { method: props?.match?.params?.id === 'add' ? 'post' : 'patch', inFormData: true })
      .then(d => {
        if (d?.status) {
          if (props?.match?.params?.id === 'add') {
            setState({
              level: '',
              issue_date: '',
              valid_date: '',
              upload_elp_file: '',
            })
            setDate({
              issue_date: null,
              valid_date: null,
            })
          }
          swal("ELP Detail Added Successfully.", "", "success", {
            button: "OK",
          }).then(d=>props.history.goBack());
        } else {
          swal("Something went wrong!", "Oops...", "error", {
            button: "OK",
          });
        }
      })
  }

  useEffect(() => {
    document.title = "Add License";
  }, []);
  const [open, setOpen] = useState(false);

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const onChangeDate = (val, name) => {
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
      upload_elp_file: e.target.files[0]
    });
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const formValid = FormC({
    values: state,
    onSubmit,
    removeValidValue: ['upload_elp_file']
  })

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
                <h2>Add ELP Details</h2>
                <Divider />
              </div>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={5}>

                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <FormControl fullWidth
                      error={formValid.errors.gender?.length}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Level
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-controlled-open-select"
                        input={<OutlinedInput label="Level" />}
                        value={state.level}
                        label="level"
                        name="level"
                        onChange={onChange}
                        variant="outlined"
                      >
                        <MenuItem value="level1">Level 1</MenuItem>
                        <MenuItem value="level2">Level 2</MenuItem>
                        <MenuItem value="level3">Level 3</MenuItem>
                        <MenuItem value="level4">Level 4</MenuItem>
                        <MenuItem value="level5">Level 5</MenuItem>
                        <MenuItem value="level6">Level 6</MenuItem>
                      </Select>
                      {formValid.errors?.gender?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.gender}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack className="datefield" spacing={2}>
                        <DesktopDatePicker
                          label="Issuance Date"
                          fullWidth
                          variant="outlined"
                          inputFormat="MM/dd/yyyy"
                          value={date.issue_date}
                          onChange={(val) => onChangeDate(val, 'issue_date')}
                          renderInput={(params) => <TextField {...params} name='issue_date'/>}
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
                          fullWidth
                          variant="outlined"
                          inputFormat="MM/dd/yyyy"
                          value={date.valid_date}
                          renderInput={(params) => <TextField {...params} name='valid_date'/>}
                          onChange={(val) => onChangeDate(val, 'valid_date')}
                        />
                      </Stack>
                      {formValid.errors?.valid_date?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.valid_date}
                        </FormHelperText>
                      )}
                    </LocalizationProvider>
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