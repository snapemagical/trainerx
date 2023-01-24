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
import Divider from "@mui/material/Divider";
import FormHelperText from "@mui/material/FormHelperText";
import AppLayout from "../../../../layout/appLayout";
import Fetch from "../../../../common/fetch";
import { FormC, onKeyPress } from "../../../../common/validation";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
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
  let history = useHistory();
  const [License_type, setLicense_type] = useState();
  const [typeOfAirCraft, setTypeOfAirCraft] = useState([])
  const [noFound, setNoFound] = useState('')
  const [aircraftTypeValue, setAircraftType] = useState('')
  const [nextPage, setNextPage] = useState('')
  const [loader, setLoader] = useState(true)
  const [state, setState] = useState({
    aircraft_type: "",
    role: "",
    aircraft_class: "",
    endorsement_date: "",
  });
  useEffect(() => {
    document.title = "Aircraft Endorsement";
    Fetch("accounts/license/get_choice_fields/").then((d) => {
      setLicense_type(d?.data);
    });
    aircraftType()
  }, []);
  const [date, setDate] = useState({
    endorsement_date: null,
  });
  const onChangeDate = (val, name) => {
    const d = val ? moment(val).format("YYYY-MM-DD") : val;
    setDate({
      ...date,
      [name]: val,
    });
    setState({
      ...state,
      [name]: d,
    });
  };

  useEffect(() => {
    if (props?.match?.params?.id !== 'add') {
      let detail = props.context?.license?.endorsement?.filter(d => d.id === +props?.match?.params?.id)
      detail = detail && detail[0]
      setDate({
        endorsement_date: moment(detail.endorsement_date).format('llll'),
      })
      setState({
        aircraft_type: detail.aircraft_type,
        role: detail.role,
        aircraft_class: detail.aircraft_class,
        endorsement_date: detail.endorsement_date,
      })
      setLoader(false)
    } else {
      setLoader(false)
    }
  }, [props?.context])
  const fileChange = (e) => {
    setState({
      ...state,
      endorsement_file: e.target.files[0],
    });
  };

  const onSubmit = () => {
    Fetch(`accounts/endorsement/${props?.match?.params?.id === 'add' ? '' : props?.match?.params?.id + '/'}`, state, {
      method: props?.match?.params?.id === 'add' ? "post" : "patch",
      inFormData: true,
    }).then((d) => {
      if (d?.status) {
        if (props?.match?.params?.id === 'add') {
          setDate({
            endorsement_date: null
          })
          setState({
            aircraft_type: "",
            role: "",
            aircraft_class: "",
            endorsement_date: "",
          })
        }
        swal("Aircraft Endorsement Added Successfully.", "", "success", {
          button: "OK",
        }).then(d => props.history.goBack());
      } else {
        swal("Something went wrong!", "Oops...", "error", {
          button: "OK",
        });
      }
    });
  };

  const formValid = FormC({
    values: state,
    removeValidValue: ["endorsement_file"],
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
              style={{ padding: "20px 20px 50px", marginBottom: "65px" }}
            >
              <div className="customHeadingMar">
                <h2>Aircraft Endorsement</h2>
                <Divider />
              </div>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={5} className='selectField'>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Aircraft Type
                      </InputLabel >
                      <SearchSelect
                        className="textfield"
                        id="outlined-basic"
                        label="Aircraft Type"
                        noFound={noFound}
                        error={Boolean(formValid.errors.aircraft_type && formValid.errors.aircraft_type)}
                        helperText={formValid.errors.aircraft_type}
                        name="aircraft_type"
                        onInputChange={acNameChnage}
                        value={state.aircraft_type}
                        onSelect={onSelect}
                        list={typeOfAirCraft}
                        variant="outlined"
                        showValue={{ value: 'id', name: 'aircraft_type' }}
                        onScroll={loadMoreItems}
                      />
                      {/* <InputLabel id="demo-simple-select-label">
                        Aircraft Type
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-controlled-open-select"
                        input={<OutlinedInput label="Aircraft Type" />}
                        value={state.aircraft_type}
                        label="Aircraft Type"
                        name="aircraft_type"
                        onChange={onChange}
                        variant="outlined"
                      >
                        {License_type?.aircraft_type?.map((d) => (
                          <MenuItem value={d.id}>{d.aircraft_type}</MenuItem>
                        ))}
                      </Select> */}
                      {formValid.errors?.aircraft_type?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.aircraft_type}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Role
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-multiple-name"
                        input={<OutlinedInput label="Role" />}
                        value={state.role}
                        label="Role"
                        name="role"
                        variant="outlined"
                        onChange={onChange}
                      >
                        {License_type?.role_choice?.map((d) => (
                          <MenuItem value={d.id}>{d.role_name}</MenuItem>
                        ))}
                      </Select>
                      {formValid.errors?.role?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.role}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Aircraft Class
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-multiple-name"
                        input={<OutlinedInput label="aircraft_class" />}
                        value={state.aircraft_class}
                        label="aircraft_class"
                        name="aircraft_class"
                        variant="outlined"
                        onChange={onChange}
                      >
                        {License_type?.aircraft_class?.map((d) => (
                          <MenuItem value={d.id}>{d.aircraft_class}</MenuItem>
                        ))}
                      </Select>
                      {formValid.errors?.aircraft_class?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.aircraft_class}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack className="datefield" spacing={2}>
                        <DesktopDatePicker
                          label="Aircraft Endorsement Date"
                          fullWidth
                          variant="outlined"
                          inputFormat="MM/dd/yyyy"
                          value={date.endorsement_date}
                          onChange={(val) =>
                            onChangeDate(val, "endorsement_date")
                          }
                          renderInput={(params) => <TextField {...params} name='endorsement_date' />}
                        />
                      </Stack>
                      {formValid.errors?.endorsement_date?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.endorsement_date}
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