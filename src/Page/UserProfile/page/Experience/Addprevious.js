import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, FormHelperText, Paper, TextField, InputLabel, Container, MenuItem, Select, Button } from "@material-ui/core";
import { useEffect } from "react";
import swal from "sweetalert";
import { Stack, FormControl, OutlinedInput } from "@mui/material";
import AppLayout from "../../../../layout/appLayout";
import { FormC, onKeyPress } from "../../../../common/validation";
import Fetch from "../../../../common/fetch";
import { withContext } from "../../../../context/appContext";
import { Link } from "react-router-dom";
import { Delete, Add } from "@material-ui/icons";
import SearchSelect from "../../../../component/searchselect";
import { timeFormat } from "../../../../common/utils";
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
function AddExperience(props) {
  const [allAirCraft, setAllAirCraft] = useState({})
  const [loader, setLoader] = useState(true)
  const [typeOfAirCraft, setTypeOfAirCraft] = useState([])
  const [noFound, setNoFound] = useState('')
  const [nextPage, setNextPage] = useState('')
  const [aircraftTypeValue, setAircraftType] = useState('')
  const [state, setState] = useState({
    flight_type: null,
    aircraft_type: null,
    // employer: "",
    instrument_time_actual_hours: null,
    instrument_time_simulated_hours: null,
    instructional: null,
    // location: "",
  })
  const [flightType, setflightType] = useState([{
    // flight_instrumental_type: null,
    time_choice: null,
    pilot_role: null,
    total_hours: "",
  }])
  useEffect(() => {
    if (props?.match?.params?.id !== 'add') {
      let detail = props.context?.license?.experience?.filter(d => d.id === +props?.match?.params?.id)
      detail = detail && detail[0]
      let flightData = []
      detail?.flight_experience_data?.map(d => {
        flightData.push({
          id: d?.id,
          // flight_instrumental_type: d?.flight_instrumental_type,
          time_choice: d?.time_choice,
          pilot_role: d?.pilot_role,
          total_hours: d.hours,
        })
      })
      if (detail?.flight_experience_data?.length) {
        setflightType(flightData)
      }
      setAircraftType(detail?.aircraft_type_name)
      setState({
        flight_type: detail?.flight_type,
        // employer: detail?.employer,
        // location: detail?.location,
        aircraft_type: detail?.aircraft_type,
        instrument_time_actual_hours: detail?.instrument_time_actual_hours,
        instrument_time_simulated_hours: detail?.instrument_time_simulated_hours,
        instructional: detail?.instructional,
      })
      setLoader(false)
    } else {
      setLoader(false)
    }
  }, [props?.match?.params])
  const onChange = (e) => {
    const {name,value} = e.target
    setState({
      ...state,
      [name]: value
    });
  };
  useEffect(() => {
    document.title = "Add Previous Flight Hours";
    Fetch('flight/schedule/get_user_list/').then(d => {
      if (d?.status) {
        setAllAirCraft(d?.data)
      }
    })
    aircraftType()
  }, []);
  const onSubmit = () => {
    Fetch(`accounts/experience/${props?.match?.params?.id === 'add' ? '' : props?.match?.params?.id + '/'}`, {
      ...state,
      instructional: timeFormat(state.instructional),
      instrument_time_actual_hours: timeFormat(state.instrument_time_actual_hours),
      instrument_time_simulated_hours: timeFormat(state.instrument_time_simulated_hours),
      flightexperiencedata_set: flightType
    }, { method: props?.match?.params?.id === 'add' ? 'post' : 'put' }).then(d => {
      if (d.status) {
        if (props?.match?.params?.id === 'add') {
          setState({
            flight_type: null,
            // employer: "",
            // location: "",
            aircraft_type: null,
            instrument_time_actual_hours: null,
            instrument_time_simulated_hours: null,
            instructional: null,
          })
        }
        swal('Submitted Successfully.', '', 'success', {
          button: 'OK',
        }).then(d => props.history.goBack());
      } else {
        swal('Something went wrong', '', 'error', {
          button: 'ok',
        })
      }
    })
  }
  const formValid = FormC({
    values: state,
    onSubmit,
    removeValidValue: ['time_choice', 'pilot_role', 'total_hours', 'instrument_time_simulated_hours', 'instrument_time_actual_hours', 'instructional']
  });
  const onChangeHours = (e, i) => {
    const { name, value } = e.target
    let checksCh = [...flightType]
    checksCh[i][name] = name === 'total_hours' ? timeFormat(value) : value
    setflightType(checksCh)
  }
  const addMore = () => {
    setflightType([
      ...flightType,
      {
        // flight_instrumental_type: null,
        pilot_role: "",
        time_choice: "",
        total_hours: "",
      }
    ])
  }
  const classes = useStyles();
  const handleRemoveExp = (index) => {
    const filterFlightType = flightType?.filter((d, i) => i !== index)
    setflightType(filterFlightType)
    if (filterFlightType?.length === 0) {
      setState({
        ...state,
        flight_type: '',
      })
    }
  }
  const acNameChnage = (e) => {
    const { name, value } = e.target
    aircraftType(value)
  }
  const onSelect = (val) => {
    setAircraftType(val.id)
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
  return (
    <AppLayout>
      <Container maxWidth="xl">
        {!loader ? <form method="POST" noValidate onSubmit={formValid.handleSubmit}>
          <Paper elevation={3} style={{ marginTop: "20px" }}>
            <div
              className={classes.root}
              style={{ padding: "20px 20px 50px", marginBottom: "30px" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} className="basic">
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
                  {/* <FormControl className="form-control"
                    fullWidth
                    error={formValid.errors.aircraft?.length}>
                    <InputLabel id="demo-simple-select-label">
                      Aircraft Name
                    </InputLabel >
                    <Select
                      fullWidth
                      labelId="demo-simple-select-label"
                      id="demo-controlled-open-select"
                      input={<OutlinedInput label="Aircraft Name" />}
                      value={state.aircraft}
                      label="Aircraft Name"
                      onChange={(e) => onChange(e)}
                      defaultValue=""
                      name='aircraft'
                      variant="outlined"
                    >
                      {
                        allAirCraft?.aircraft?.map((d, i) => (<MenuItem key={i + d.id} value={d.id}>{d?.registration_number}</MenuItem>))
                      }
                    </Select>
                    {formValid.errors?.aircraft?.length && (
                      <FormHelperText className="Mui-error">
                        {formValid.errors.aircraft}
                      </FormHelperText>
                    )}
                  </FormControl> */}
                </Grid>
                {/* <Grid item xs={12} sm={12} md={6} className="basic">
                  <TextField
                    className="textfield"
                    id="outlined-basic"
                    label="Employer"
                    inputProps={{ maxLength: 50 }}
                    margin="normal"
                    error={Boolean(formValid.errors.employer && formValid.errors.employer)}
                    helperText={formValid.errors.employer && formValid.errors.employer}
                    defaultValue={state.employer}
                    fullWidth
                    name="employer"
                    onBlur={formValid.handleBlur}
                    onChange={formValid.handleChange}
                    onKeyUp={onChange}
                    autoComplete="employer"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} className="basic">
                  <TextField
                    className="textfield"
                    id="outlined-basic"
                    label="Location"
                    inputProps={{ maxLength: 50 }}
                    margin="normal"
                    error={Boolean(formValid.errors.location && formValid.errors.location)}
                    helperText={formValid.errors.location && formValid.errors.location}
                    defaultValue={state.location}
                    fullWidth
                    name="location"
                    onBlur={formValid.handleBlur}
                    onChange={formValid.handleChange}
                    onKeyUp={onChange}
                    autoComplete="location"
                    variant="outlined"
                  />
                </Grid> */}
                <Grid item xs={12} sm={12} md={6} className="basic">
                  <FormControl className="form-control" fullWidth error={formValid.errors?.flight_type?.length}>
                    <InputLabel id="demo-simple-select-label">
                      Flight Type
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-label"
                      id="demo-controlled-open-select"
                      input={<OutlinedInput label="Flight Type" />}
                      value={state.flight_type}
                      label="Flight Type"
                      onChange={onChange}
                      name='flight_type'
                      variant="outlined"
                    >
                      <MenuItem value="se">Single Engine</MenuItem>
                      <MenuItem value="me">Multi Engine</MenuItem>
                      {/* <MenuItem value="instru">Instrumental</MenuItem>
                      <MenuItem value="instruc">Instructional</MenuItem> */}
                    </Select>
                    {formValid.errors?.flight_type?.length && (
                      <FormHelperText className="Mui-error">
                        {formValid.errors.flight_type}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              {
                state.flight_type?.length ? flightType?.map((d, i) => {
                  return <Grid container spacing={2} key={i}>
                    {(state.flight_type == "se" || state.flight_type == "me") ?
                      <>
                        <Grid item xs={12} sm={12} md={4} className="basic">
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Time
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-multiple-name"
                              input={<OutlinedInput label="Time" />}
                              value={flightType[i]?.time_choice}
                              name='time_choice'
                              label="Time"
                              defaultValue="Day"
                              variant="outlined"
                              onChange={(e) => onChangeHours(e, i)}
                            >
                              <MenuItem value="day">Day</MenuItem>
                              <MenuItem value="night">Night</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={12} md={4} className="basic">
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Pilot Role
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-multiple-name"
                              input={<OutlinedInput label="Pilot Role" />}
                              value={flightType[i]?.pilot_role}
                              name='pilot_role'
                              label="Nationality"
                              defaultValue="Dual"
                              variant="outlined"
                              onChange={(e) => onChangeHours(e, i)}
                            >
                              <MenuItem value="dual">Dual</MenuItem>
                              <MenuItem value="pic">Pic</MenuItem>
                              <MenuItem value="co_pilot">Co-Pilot</MenuItem>
                              {/* <MenuItem value="instructional">Instructional</MenuItem> */}
                              <MenuItem value="p1_us">P1/US</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </> : state.flight_type == "instru" ? <Grid item xs={12} sm={12} md={6} className="basic">
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Flight Type
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-multiple-name"
                            input={<OutlinedInput label="Flight Type" />}
                            value={flightType[i]?.flight_instrumental_type}
                            label="Flight Type"
                            name='flight_instrumental_type'
                            defaultValue="Ten"
                            variant="outlined"
                            onChange={(e) => onChangeHours(e, i)}
                          >
                            <MenuItem value="simulated">Simulated</MenuItem>
                            <MenuItem value="actual">Actual</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid> :
                        null
                    }
                    <Grid item xs={12} sm={12} md={state.flight_type == "instru" ? 6 : (state.flight_type == "se" || state.flight_type == "me") ? 4 : 12} className="basic">
                      <div className="flex align-center">
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          label="Hours"
                          inputProps={{ maxLength: 50 }}
                          margin="normal"
                          defaultValue={flightType[i].hours}
                          fullWidth
                          name="total_hours"
                          onKeyPress={(e)=>onKeyPress(e,/^[0-9.:\b]+$/)}
                          onChange={(e) => onChangeHours(e, i)}
                          autoComplete="total_hours"
                          variant="outlined"
                        />
                        {flightType?.length === (i + 1) ? <Button
                          type="button"
                          style={{
                            padding: "0",
                            marginLeft: "10px",
                            minWidth: "0px",
                            borderRadius: "50%",
                          }}
                          onClick={addMore}><Add style={{ color: "#7564e7", margin: "4px" }}/></Button> : null}
                        <Button
                          onClick={() => handleRemoveExp(i)}
                          style={{
                            padding: "0",
                            marginLeft: "10px",
                            minWidth: "0px",
                            borderRadius: "50%",
                          }}
                        >
                          <Delete style={{ color: "#ec7474", margin: "4px" }} />
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                })
                  : null
              }
              {/* {state.flight_type?.length && flightType?.length ?
                <Grid item xs={12} sm={12} className='text-right'>
                  <Button type="button"
                    style={{ marginTop: "10px" }}
                    variant="contained"
                    className="save"
                    onClick={addMore}>Add More</Button>
                </Grid>
                : null
              } */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} className="basic m-0">
                  <h4 className="m-0">Instrument Time</h4>
                </Grid>
                <Grid item xs={12} sm={12} md={6} className="basic">
                  <TextField
                    className="textfield"
                    id="outlined-basic"
                    label="Instrument Actual Hours"
                    onKeyPress={(e)=>onKeyPress(e,/^[0-9.:\b]+$/)}
                    inputProps={{ maxLength: 8 }}
                    margin="normal"
                    error={Boolean(formValid.errors.instrument_time_actual_hours && formValid.errors.instrument_time_actual_hours)}
                    helperText={formValid.errors.instrument_time_actual_hours && formValid.errors.instrument_time_actual_hours}
                    defaultValue={state.instrument_time_actual_hours}
                    fullWidth
                    name="instrument_time_actual_hours"
                    onBlur={formValid.handleBlur}
                    onChange={formValid.handleChange}
                    onKeyUp={onChange}
                    autoComplete="instrument_time_actual_hours"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} className="basic">
                  <TextField
                    className="textfield"
                    id="outlined-basic"
                    label="Instrument Simulated Hours"
                    inputProps={{ maxLength: 8 }}
                    onKeyPress={(e)=>onKeyPress(e,/^[0-9.:\b]+$/)}
                    margin="normal"
                    error={Boolean(formValid.errors.instrument_time_simulated_hours && formValid.errors.instrument_time_simulated_hours)}
                    helperText={formValid.errors.instrument_time_simulated_hours && formValid.errors.instrument_time_simulated_hours}
                    defaultValue={state.instrument_time_simulated_hours}
                    fullWidth
                    name="instrument_time_simulated_hours"
                    onBlur={formValid.handleBlur}
                    onChange={formValid.handleChange}
                    onKeyUp={onChange}
                    autoComplete="instrument_time_simulated_hours"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} className="basic m-0">
                  <h4 className="m-0">Instructional Time</h4>
                </Grid>
                <Grid item xs={12} sm={12} md={6} className="basic">
                  <TextField
                    className="textfield"
                    id="outlined-basic"
                    onKeyPress={(e)=>onKeyPress(e,/^[0-9.:\b]+$/)}
                    label="instructional"
                    inputProps={{ maxLength: 8 }}
                    margin="normal"
                    // error={Boolean(formValid.errors.instructional && formValid.errors.instructional)}
                    // helperText={formValid.errors.instructional && formValid.errors.instructional}
                    defaultValue={state.instructional}
                    fullWidth
                    name="instructional"
                    // onBlur={formValid.handleBlur}
                    // onKeyPress={(e)=>onKeyPress(e)}
                    onChange={onChange}
                    autoComplete="instructional"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              {/* { (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={4} className="basic">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Time
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-multiple-name"
                        input={<OutlinedInput label="Time" />}
                        value={state.time_choice}
                        name='time_choice'
                        label="Time"
                        defaultValue="Day"
                        variant="outlined"
                        onChange={onChange}
                      >
                        <MenuItem value="day">Day</MenuItem>
                        <MenuItem value="night">Night</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} className="basic">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Pilot Role
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-multiple-name"
                        input={<OutlinedInput label="Pilot Role" />}
                        value={state.pilot_role}
                        name='pilot_role'
                        label="Nationality"
                        defaultValue="Dual"
                        variant="outlined"
                        onChange={onChange}
                      >
                        <MenuItem value="dual">Dual</MenuItem>
                        <MenuItem value="pic">Pic</MenuItem>
                        <MenuItem value="co_pilot">Co-Pilot</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Hours"
                      inputProps={{ maxLength: 50 }}
                      margin="normal"
                      defaultValue={state.hours}
                      fullWidth
                      name="hours"
                      onKeyPress={onKeyPress}
                      onChange={onChange}
                      autoComplete="hours"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              )}

              {state.flight_type == "instru" && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} className="basic">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Flight Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-multiple-name"
                        input={<OutlinedInput label="Flight Type" />}
                        value={state.flight_instrumental_type}
                        label="Flight Type"
                        name='flight_instrumental_type'
                        defaultValue="Ten"
                        variant="outlined"
                        onChange={onChange}
                      >
                        <MenuItem value="simulated">Simulated</MenuItem>
                        <MenuItem value="actual">Actual</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Hours"
                      inputProps={{ maxLength: 50 }}
                      margin="normal"
                      defaultValue={state.hours}
                      name='hours'
                      fullWidth
                      onChange={onChange}
                      onKeyPress={onKeyPress}
                      autoComplete="hours"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              )}
              {state.flight_type == "instruc" && <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} className="basic">
                  <TextField
                    className="textfield"
                    id="outlined-basic"
                    label="Hours"
                    inputProps={{ maxLength: 50 }}
                    margin="normal"
                    fullWidth
                    onKeyPress={onKeyPress}
                    defaultValue={state.hours}
                    name="hours"
                    onChange={onChange}
                    autoComplete="hours"
                    variant="outlined"
                  />
                </Grid>
              </Grid>} */}
            </div>
          </Paper>
          <Stack
            spacing={2}
            direction="row"
            className="buttonss"
            style={{ justifyContent: "right" }}
          >
            <Link to={`/user-profile/experience`} style={{ textDecoration: "none" }}>
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
export default withContext(AddExperience)