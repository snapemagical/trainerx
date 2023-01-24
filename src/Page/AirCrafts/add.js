import AppLayout from "../../layout/appLayout";
import {
  Grid,
  Paper,
  Container,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Button,
  OutlinedInput,
  FormHelperText,
  MenuItem,
} from "@material-ui/core";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import swal from "sweetalert";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { FormC, onKeyPress } from "../../common/validation";
import moment from "moment";
import { useEffect } from "react";
import Fetch from "../../common/fetch";
import SearchSelect from "../../component/searchselect";
import { withContext } from "../../context/appContext";
import { timeFormat } from "../../common/utils";
import ButtonLoader from "../../component/button";

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
function AddAirCrafts(props) {
  const classes = useStyles();
  const [allAirCraft, setallAirCraft] = useState({});
  const [loader, setLoader] = useState(true);
  const [typeOfAirCraft, setTypeOfAirCraft] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [formType, setFromType] = useState("");
  const [aircraftTypeValue, setAircraftType] = useState("");
  const [dateState, setDateState] = useState({
    date_of_registration: null,
    year_of_manufacture: null,
  });
  const [status, setStatus] = useState('')

  const [btnLoader, setBtnLoader] = useState(false);
  const [noFound, setNoFound] = useState("");
  const [state, setState] = useState({
    registration_number: "",
    date_of_registration: "",
    msn: "",
    year_of_manufacture: "",
    physical_class_engine: "",
    category: "",
    number_of_seats: "",
    flown_hours: "",
    number_of_engines: "",
    make: "",
    fuel_grade: "",
    max_continous_power: "",
    engine_max_power: "",
    fuel_capacity: "",
    unusable_fuel: "",
    oil_capacity: "",
    propeller_type: "",
    max_total_weight: "",
    basic_empty_weight: "",
    arm_basic_empty_weight: "",
    actual_weight_crew: "",
    passenger: "",
    baggage_area_a: "",
    baggage_area_b: "",
    max_fwdc_of_g: "",
    max_aftc_of_g: "",
    comments: "",
    type_of_aircraft: "",
    class_of_aircraft: "",
  });
  const [checks, setChecks] = useState([
    {
      type_of_check: "",
      ac_hours_at_check: "",
      valid_till: null,
      check_next: "",
      last_check: null,
    },
  ]);
  const [checksDate, setChecksDate] = useState([
    {
      valid_till: null,
      check_next: null,
      last_check: null,
    },
  ]);

  useEffect(() => {
    const type = props?.match?.params?.id;
    const { airCraft } = props?.context?.license;
    setFromType(type);
    if (type !== "add") {
      let data = airCraft?.filter((d) => d.id === +type)[0];
      setAircraftType(data?.type_of_aircraft);
      aircraftType(data?.aircraft_type_name);
      setState({
        registration_number: data?.registration_number,
        date_of_registration: data?.date_of_registration,
        msn: data?.msn,
        year_of_manufacture: data?.year_of_manufacture,
        category: data?.category,
        physical_class_engine: data?.physical_class_engine,
        number_of_seats: data?.number_of_seats,
        flown_hours: data?.total_hours,
        number_of_engines: data?.number_of_engines,
        make: data?.make,
        fuel_grade: data?.fuel_grade,
        max_continous_power: data?.max_continous_power,
        engine_max_power: data?.engine_max_power,
        fuel_capacity: data?.fuel_capacity,
        unusable_fuel: data?.unusable_fuel,
        arm_fuel: data?.arm_fuel,
        oil_capacity: data?.oil_capacity,
        propeller_type: data?.propeller_type,
        max_total_weight: data?.max_total_weight,
        basic_empty_weight: data?.basic_empty_weight,
        arm_basic_empty_weight: data?.arm_basic_empty_weight,
        actual_weight_crew: data?.actual_weight_crew,
        passenger: data?.passenger,
        baggage_area_a: data?.baggage_area_a,
        baggage_area_b: data?.baggage_area_b,
        max_fwdc_of_g: data?.max_fwdc_of_g,
        max_aftc_of_g: data?.max_aftc_of_g,
        comments: data?.comments,
        type_of_aircraft: data?.type_of_aircraft,
        class_of_aircraft: data?.class_of_aircraft,
      });
      let dataairCraft = [];
      let dataairCraftDate = [];
      setDateState({
        date_of_registration: moment(data?.date_of_registration).format("llll"),
        year_of_manufacture: moment(data?.year_of_manufacture).format("yyyy"),
      });
      data?.aircraftchecks?.map((d) => {
        dataairCraftDate?.push({
          valid_till: moment(data?.valid_till).format("llll"),
          last_check: moment(data?.last_check).format("llll"),
        });
        dataairCraft?.push({
          id: d.id,
          type_of_check: d?.type_of_check,
          ac_hours_at_check: d?.ac_hours_at_check,
          valid_till: d?.valid_till,
          check_next: d?.check_next_hours,
          last_check: d?.last_check,
        });
      });
      setChecks(dataairCraft);
      setChecksDate(dataairCraftDate);
      setLoader(false);
    } else {
      setLoader(false);
      aircraftType();
    }
  }, [props?.match.params]);
  useEffect(() => {
    Fetch("aircraft/aircraft-choice-fields-data/").then((d) => {
      if (d?.status) {
        setallAirCraft(d.data);
      }
    });
  }, []);
  const aircraftType = (val, url) => {
    Fetch(`aircraft/aircraft-type/${val ? "?q=" + val : ""}`, null, {
      url: url,
    }).then((d) => {
      if (d?.status) {
        if (url) {
          setTypeOfAirCraft((prev) => [...prev, ...d.data.results]);
        } else {
          setTypeOfAirCraft(d.data.results);
        }
        if (val?.length && !d.data.results?.length) {
          setNoFound("No Data Found");
        } else {
          setNoFound("");
        }
        setNextPage(d.data.next);
      }
    });
  };
  const onSubmit = () => {
    setBtnLoader(true);
    Fetch(
      `aircraft/${formType !== "add" ? formType + "/" : ""}`,
      {
        ...state,
        flown_hours: timeFormat(state.flown_hours),
        aircraftchecks: checks,
      },
      { method: formType === "add" ? "post" : "put" }
    ).then((d) => {
      if (d.status) {
        swal(
          `AirCrafts ${formType === "add" ? "Add" : "Edit"} Successfully`,
          "",
          "success",
          {
            button: "OK",
          }
        ).then((d) => {
          props.history.goBack();
        });
      }
    });
  };
  const formValid = FormC({
    values: state,
    onSubmit,
    removeValidValue: ["comments", "baggage_area_a", "baggage_area_b"],
  });
  const handleDateChange = (val, name) => {
    const d = val ? moment(val).format("YYYY-MM-DD") : val;
    setDateState({
      ...dateState,
      [name]: val,
    });
    setState({
      ...state,
      [name]: d,
    });
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const checkDateChange = (val, name, index) => {
    const d = val ? moment(val).format("YYYY-MM-DD") : val;
    let checksDateCh = [...checksDate];
    let checksCh = [...checks];
    checksDateCh[index][name] = val;
    checksCh[index][name] = d;
    setChecksDate(checksDateCh);
    setChecks(checksCh);
  };
  const onChangeChecks = (e, index) => {
    const { name, value } = e.target;
    let checksCh = [...checks];
    checksCh[index][name] = name === "check_next" ? timeFormat(value) : value;
    setChecks(checksCh);
  };
  const addChecks = () => {
    let checksList = [...checks];
    checksList.push({
      type_of_check: "",
      ac_hours_at_check: "",
      valid_till: null,
      check_next: null,
      last_check: null,
    });
    setChecksDate((prev) => [
      ...prev,
      {
        valid_till: null,
        last_check: null,
      },
    ]);
    setChecks(checksList);
  };
  const acNameChnage = (e) => {
    const { name, value } = e.target;
    setAircraftType(value);
    aircraftType(value);
  };
  const onSelect = (val) => {
    setAircraftType(val.id);
    setState({
      ...state,
      type_of_aircraft: val.id,
    });
  };
  const loadMoreItems = (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom) {
      aircraftType("", nextPage);
    }
  };
  return (
    <AppLayout>
      <Container maxWidth="xl">
        <form method="POST" noValidate onSubmit={formValid.handleSubmit}>
          <Paper elevation={3} style={{ marginTop: "20px" }}>
            <div
              className={classes.root}
              style={{ padding: "20px 20px 50px", marginBottom: "30px" }}
            >
              <div className="customHeadingMar">
                <h2>Add Aircraft</h2>
                <Divider />
              </div>
              {loader ? null : (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Registration"
                      inputProps={{ maxLength: 30 }}
                      error={Boolean(
                        formValid.errors.registration_number &&
                          formValid.errors.registration_number
                      )}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.registration_number &&
                        formValid.errors.registration_number
                      }
                      name="registration_number"
                      defaultValue={state?.registration_number}
                      onBlur={formValid.handleBlur}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="registration_number"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <LocalizationProvider
                      className="form-control"
                      dateAdapter={AdapterDateFns}
                    >
                      <Stack
                        spacing={3}
                        className="datefield"
                        style={{ marginTop: "-7px" }}
                      >
                        <DesktopDatePicker
                          className="textfield"
                          input={<OutlinedInput label="Departure Date" />}
                          margin="normal"
                          fullWidth
                          label="Date of Registration"
                          variant="outlined"
                          inputFormat="MM/dd/yyyy"
                          value={dateState.date_of_registration}
                          onChange={(val) =>
                            handleDateChange(val, "date_of_registration")
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="date_of_registration"
                            />
                          )}
                        />
                      </Stack>
                      {formValid.errors?.date_of_registration?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.date_of_registration}
                        </FormHelperText>
                      )}
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="MSN"
                      inputProps={{ maxLength: 20 }}
                      error={Boolean(
                        formValid.errors.msn && formValid.errors.msn
                      )}
                      margin="normal"
                      defaultValue={state?.msn}
                      fullWidth
                      helperText={formValid.errors.msn && formValid.errors.msn}
                      name="msn"
                      onBlur={formValid.handleBlur}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="msn"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <LocalizationProvider
                      className="form-control"
                      dateAdapter={AdapterDateFns}
                    >
                      <Stack
                        spacing={3}
                        className="datefield"
                        style={{ marginTop: "-7px" }}
                      >
                        <DesktopDatePicker
                          className="textfield"
                          input={<OutlinedInput label="Departure Date" />}
                          margin="normal"
                          fullWidth
                          label="Year of Manufacture"
                          views={["year"]}
                          variant="outlined"
                          inputFormat="yyyy"
                          value={dateState.year_of_manufacture}
                          onChange={(val) => {
                            handleDateChange(val, "year_of_manufacture");
                          }}
                          renderInput={(params) => (
                            <TextField {...params} name="year_of_manufacture" />
                          )}
                        />
                      </Stack>
                      {formValid.errors?.year_of_manufacture?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.year_of_manufacture}
                        </FormHelperText>
                      )}
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <FormControl
                      className="form-control"
                      fullWidth
                      error={formValid.errors.type_of_aircraft?.length}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Type Of Aircraft
                      </InputLabel>
                      <SearchSelect
                        className="textfield"
                        id="outlined-basic"
                        label="Type Of Aircraft"
                        noFound={noFound}
                        error={Boolean(
                          formValid.errors.type_of_aircraft &&
                            formValid.errors.type_of_aircraft
                        )}
                        helperText={formValid.errors.type_of_aircraft}
                        name="type_of_aircraft"
                        onInputChange={acNameChnage}
                        value={aircraftTypeValue}
                        onSelect={onSelect}
                        list={typeOfAirCraft}
                        variant="outlined"
                        showValue={{ value: "id", name: "aircraft_type" }}
                        onScroll={loadMoreItems}
                      />
                      {/* <Select
                                            fullWidth
                                            labelId="demo-simple-select-label"
                                            id="demo-controlled-open-select"
                                            input={<OutlinedInput label="Type Of Aircraft" />}
                                            value={state.type_of_aircraft}
                                            label="Type Of Aircraft"
                                            onChange={onChange}
                                            defaultValue=""
                                            name='type_of_aircraft'
                                            variant="outlined"
                                        >
                                            {
                                                allAirCraft?.aircraft_type?.map((d, i) => (<MenuItem key={i + d.id} value={d?.id}>{d?.aircraft_type}</MenuItem>))
                                            }
                                        </Select>
                                        {formValid.errors?.type_of_aircraft?.length && (
                                            <FormHelperText className="Mui-error">
                                                {formValid.errors.type_of_aircraft}
                                            </FormHelperText>
                                        )} */}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <FormControl
                      className="form-control"
                      fullWidth
                      error={formValid.errors.class_of_aircraft?.length}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Class Of Aircraft
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-controlled-open-select"
                        input={<OutlinedInput label="Class Of Aircraft" />}
                        value={state.class_of_aircraft}
                        label="Class Of Aircraft"
                        onChange={onChange}
                        defaultValue=""
                        name="class_of_aircraft"
                        variant="outlined"
                      >
                        {allAirCraft?.aircraft_class?.map((d, i) => (
                          <MenuItem key={i + d.id} value={d?.id}>
                            {d?.aircraft_class}
                          </MenuItem>
                        ))}
                      </Select>
                      {formValid.errors?.class_of_aircraft?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.class_of_aircraft}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <FormControl
                      className="form-control"
                      fullWidth
                      error={formValid.errors.category?.length}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Category
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-controlled-open-select"
                        input={<OutlinedInput label="Category" />}
                        value={state.category}
                        label="Category"
                        onChange={onChange}
                        defaultValue=""
                        name="category"
                        variant="outlined"
                      >
                        {allAirCraft?.aircraft_category?.map((d, i) => (
                          <MenuItem key={i + d.id} value={d?.id}>
                            {d?.category_name}
                          </MenuItem>
                        ))}
                      </Select>
                      {formValid.errors?.category?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.category}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Number of Seats"
                      inputProps={{ maxLength: 3 }}
                      error={Boolean(
                        formValid.errors.number_of_seats &&
                          formValid.errors.number_of_seats
                      )}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.number_of_seats &&
                        formValid.errors.number_of_seats
                      }
                      defaultValue={state?.number_of_seats}
                      name="number_of_seats"
                      onBlur={formValid.handleBlur}
                      onKeyPress={onKeyPress}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="number_of_seats"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Hours Flown"
                      inputProps={{ maxLength: 10 }}
                      error={Boolean(
                        formValid.errors.flown_hours &&
                          formValid.errors.flown_hours
                      )}
                      margin="normal"
                      defaultValue={state?.flown_hours}
                      fullWidth
                      helperText={
                        formValid.errors.flown_hours &&
                        formValid.errors.flown_hours
                      }
                      name="flown_hours"
                      onBlur={formValid.handleBlur}
                      onKeyPress={(e) => onKeyPress(e, /^[0-9.:\b]+$/)}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="flown_hours"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} className="basic">
                    <h4>Powerplant</h4>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Number of Engines"
                      inputProps={{ maxLength: 1 }}
                      error={Boolean(
                        formValid.errors.number_of_engines &&
                          formValid.errors.number_of_engines
                      )}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.number_of_engines &&
                        formValid.errors.number_of_engines
                      }
                      name="number_of_engines"
                      defaultValue={state?.number_of_engines}
                      onBlur={formValid.handleBlur}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      onKeyPress={onKeyPress}
                      autoComplete="number_of_engines"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Make"
                      inputProps={{ maxLength: 70 }}
                      error={Boolean(
                        formValid.errors.make && formValid.errors.make
                      )}
                      margin="normal"
                      fullWidth
                      defaultValue={state?.make}
                      helperText={
                        formValid.errors.make && formValid.errors.make
                      }
                      name="make"
                      onBlur={formValid.handleBlur}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="make"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Fuel Grade"
                      inputProps={{ maxLength: 40 }}
                      error={Boolean(
                        formValid.errors.fuel_grade &&
                          formValid.errors.fuel_grade
                      )}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.fuel_grade &&
                        formValid.errors.fuel_grade
                      }
                      defaultValue={state?.fuel_grade}
                      name="fuel_grade"
                      onBlur={formValid.handleBlur}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="fuel_grade"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} className="basic">
                    <h4>Engine Limits</h4>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <FormControl
                      className="form-control"
                      fullWidth
                      error={formValid.errors.physical_class_engine?.length}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Engine Physical Class
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-controlled-open-select"
                        input={<OutlinedInput label="Engine Physical Class" />}
                        value={state.physical_class_engine}
                        label="Engine Physical Class"
                        onChange={onChange}
                        defaultValue=""
                        name="physical_class_engine"
                        variant="outlined"
                      >
                        <MenuItem value="piston">Piston</MenuItem>
                        <MenuItem value="jet">Jet</MenuItem>
                        <MenuItem value="turboprop">Turboprop</MenuItem>
                        <MenuItem value="tbd">TBD</MenuItem>
                      </Select>
                      {formValid.errors?.physical_class_engine?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.physical_class_engine}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Max Continuos Power"
                      inputProps={{ maxLength: 50 }}
                      error={Boolean(
                        formValid.errors.max_continous_power &&
                          formValid.errors.max_continous_power
                      )}
                      defaultValue={state?.max_continous_power}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.max_continous_power &&
                        formValid.errors.max_continous_power
                      }
                      name="max_continous_power"
                      onBlur={formValid.handleBlur}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="max_continous_power"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Engine Max Power"
                      inputProps={{ maxLength: 50 }}
                      error={Boolean(
                        formValid.errors.engine_max_power &&
                          formValid.errors.engine_max_power
                      )}
                      defaultValue={state?.engine_max_power}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.engine_max_power &&
                        formValid.errors.engine_max_power
                      }
                      name="engine_max_power"
                      onBlur={formValid.handleBlur}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="engine_max_power"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} className="basic">
                    <h4>Fuel and Oil Capacity</h4>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Fuel Capacity"
                      inputProps={{ maxLength: 40 }}
                      error={Boolean(
                        formValid.errors.fuel_capacity &&
                          formValid.errors.fuel_capacity
                      )}
                      defaultValue={state?.fuel_capacity}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.fuel_capacity &&
                        formValid.errors.fuel_capacity
                      }
                      name="fuel_capacity"
                      onBlur={formValid.handleBlur}
                      onChange={formValid.handleChange}
                      //onKeyPress={onKeyPress}
                      onKeyUp={onChange}
                      autoComplete="fuel_capacity"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Unusable Fuel"
                      inputProps={{ maxLength: 40 }}
                      error={Boolean(
                        formValid.errors.unusable_fuel &&
                          formValid.errors.unusable_fuel
                      )}
                      defaultValue={state?.unusable_fuel}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.unusable_fuel &&
                        formValid.errors.unusable_fuel
                      }
                      name="unusable_fuel"
                      onBlur={formValid.handleBlur}
                      //onKeyPress={onKeyPress}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="unusable_fuel"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Oil Capacity"
                      inputProps={{ maxLength: 20 }}
                      error={Boolean(
                        formValid.errors.oil_capacity &&
                          formValid.errors.oil_capacity
                      )}
                      margin="normal"
                      fullWidth
                      defaultValue={state?.oil_capacity}
                      helperText={
                        formValid.errors.oil_capacity &&
                        formValid.errors.oil_capacity
                      }
                      name="oil_capacity"
                      onKeyPress={onKeyPress}
                      onBlur={formValid.handleBlur}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="oil_capacity"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Propeller Type"
                      inputProps={{ maxLength: 30 }}
                      error={Boolean(
                        formValid.errors.propeller_type &&
                          formValid.errors.propeller_type
                      )}
                      margin="normal"
                      defaultValue={state?.propeller_type}
                      fullWidth
                      helperText={
                        formValid.errors.propeller_type &&
                        formValid.errors.propeller_type
                      }
                      name="propeller_type"
                      onBlur={formValid.handleBlur}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="propeller_type"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} className="basic">
                    <h4>Weights</h4>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Max Total Weight"
                      inputProps={{ maxLength: 30 }}
                      error={Boolean(
                        formValid.errors.max_total_weight &&
                          formValid.errors.max_total_weight
                      )}
                      defaultValue={state?.max_total_weight}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.max_total_weight &&
                        formValid.errors.max_total_weight
                      }
                      name="max_total_weight"
                      onBlur={formValid.handleBlur}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="max_total_weight"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Basic Empty Weight"
                      inputProps={{ maxLength: 30 }}
                      error={Boolean(
                        formValid.errors.basic_empty_weight &&
                          formValid.errors.basic_empty_weight
                      )}
                      defaultValue={state?.basic_empty_weight}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.basic_empty_weight &&
                        formValid.errors.basic_empty_weight
                      }
                      name="basic_empty_weight"
                      onBlur={formValid.handleBlur}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="basic_empty_weight"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} className="basic">
                    <h4>ARM</h4>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="ARM Basic Empty Weight"
                      inputProps={{ maxLength: 4 }}
                      error={Boolean(
                        formValid.errors.arm_basic_empty_weight &&
                          formValid.errors.arm_basic_empty_weight
                      )}
                      defaultValue={state?.arm_basic_empty_weight}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.arm_basic_empty_weight &&
                        formValid.errors.arm_basic_empty_weight
                      }
                      name="arm_basic_empty_weight"
                      onBlur={formValid.handleBlur}
                      onKeyPress={(e) => onKeyPress(e, /^[0-9.:\b]+$/)}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="arm_basic_empty_weight"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Crew"
                      inputProps={{ maxLength: 4 }}
                      error={Boolean(
                        formValid.errors.actual_weight_crew &&
                          formValid.errors.actual_weight_crew
                      )}
                      defaultValue={state?.actual_weight_crew}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.actual_weight_crew &&
                        formValid.errors.actual_weight_crew
                      }
                      name="actual_weight_crew"
                      onBlur={formValid.handleBlur}
                      onKeyPress={(e) => onKeyPress(e, /^[0-9.:\b]+$/)}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="actual_weight_crew"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Passenger"
                      inputProps={{ maxLength: 4 }}
                      error={Boolean(
                        formValid.errors.passenger && formValid.errors.passenger
                      )}
                      defaultValue={state?.passenger}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.passenger && formValid.errors.passenger
                      }
                      name="passenger"
                      onKeyPress={(e) => onKeyPress(e, /^[0-9.:\b]+$/)}
                      onBlur={formValid.handleBlur}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="passenger"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Baggage Area A"
                      inputProps={{ maxLength: 4 }}
                      error={Boolean(
                        formValid.errors.baggage_area_a &&
                          formValid.errors.baggage_area_a
                      )}
                      defaultValue={state?.baggage_area_a}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.baggage_area_a &&
                        formValid.errors.baggage_area_a
                      }
                      name="baggage_area_a"
                      onKeyPress={(e) => onKeyPress(e, /^[0-9.:\b]+$/)}
                      onBlur={formValid.handleBlur}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="baggage_area_a"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Baggage Area B"
                      inputProps={{ maxLength: 5 }}
                      error={Boolean(
                        formValid.errors.baggage_area_b &&
                          formValid.errors.baggage_area_b
                      )}
                      defaultValue={state?.baggage_area_b}
                      margin="normal"
                      onKeyPress={(e) => onKeyPress(e, /^[0-9.:\b]+$/)}
                      fullWidth
                      helperText={
                        formValid.errors.baggage_area_b &&
                        formValid.errors.baggage_area_b
                      }
                      name="baggage_area_b"
                      onBlur={formValid.handleBlur}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="baggage_area_b"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Fuel"
                      inputProps={{ maxLength: 4 }}
                      error={Boolean(
                        formValid.errors.arm_fuel && formValid.errors.arm_fuel
                      )}
                      margin="normal"
                      defaultValue={state?.arm_fuel}
                      fullWidth
                      helperText={
                        formValid.errors.arm_fuel && formValid.errors.arm_fuel
                      }
                      name="arm_fuel"
                      onBlur={formValid.handleBlur}
                      onKeyPress={(e) => onKeyPress(e, /^[0-9.:\b]+$/)}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="arm_fuel"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    className="basic flex align-center justify-between"
                  >
                    <h4>Checks</h4>
                    <Button
                      type="button"
                      variant="contained"
                      className="save"
                      onClick={addChecks}
                    >
                      Add More Checks
                    </Button>
                  </Grid>
                  {checks?.length &&
                    checks?.map((d, index) => (
                      <>
                        <Grid item xs={12} sm={12} md={12} className="basic">
                          <FormControl className="form-control" fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Type of Check
                            </InputLabel>
                            <Select
                              fullWidth
                              labelId="demo-simple-select-label"
                              id="demo-controlled-open-select"
                              input={<OutlinedInput label="Type of Check" />}
                              value={checks[index]?.type_of_check}
                              label="Type of Check"
                              onChange={(e) => onChangeChecks(e, index)}
                              defaultValue=""
                              name="type_of_check"
                              variant="outlined"
                            >
                              {allAirCraft?.aircraft_check_serializer?.map(
                                (d) => (
                                  <MenuItem key={d.id} value={d.id}>
                                    {d.check_name}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} className="basic">
                          <LocalizationProvider
                            className="form-control"
                            dateAdapter={AdapterDateFns}
                          >
                            <Stack
                              spacing={3}
                              className="datefield"
                              style={{ marginTop: "-7px" }}
                            >
                              <DesktopDatePicker
                                className="textfield"
                                input={<OutlinedInput label="Departure Date" />}
                                margin="normal"
                                fullWidth
                                label="Last Check On"
                                variant="outlined"
                                inputFormat="MM/dd/yyyy"
                                value={checksDate[index]?.last_check}
                                onChange={(val) =>
                                  checkDateChange(val, "last_check", index)
                                }
                                renderInput={(params) => (
                                  <TextField {...params} name="last_check" />
                                )}
                              />
                            </Stack>
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} className="basic">
                          <LocalizationProvider
                            className="form-control"
                            dateAdapter={AdapterDateFns}
                          >
                            <Stack
                              spacing={3}
                              className="datefield"
                              style={{ marginTop: "-7px" }}
                            >
                              <DesktopDatePicker
                                className="textfield"
                                input={<OutlinedInput label="Departure Date" />}
                                margin="normal"
                                fullWidth
                                label="Valid Till"
                                variant="outlined"
                                inputFormat="MM/dd/yyyy"
                                value={checksDate[index]?.valid_till}
                                onChange={(val) =>
                                  checkDateChange(val, "valid_till", index)
                                }
                                renderInput={(params) => (
                                  <TextField {...params} name="valid_till" />
                                )}
                              />
                            </Stack>
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} className="basic">
                          <TextField
                            className="textfield"
                            id="outlined-basic"
                            label="A/C Hours at Check"
                            inputProps={{ maxLength: 50 }}
                            margin="normal"
                            defaultValue={checks[index]?.ac_hours_at_check}
                            fullWidth
                            name="ac_hours_at_check"
                            onChange={(e) => onChangeChecks(e, index)}
                            autoComplete="ac_hours_at_check"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} className="basic">
                          <TextField
                            className="textfield"
                            id="outlined-basic"
                            label="Next Check"
                            inputProps={{ maxLength: 8 }}
                            error={Boolean(
                              formValid.errors.check_next &&
                                formValid.errors.check_next
                            )}
                            margin="normal"
                            defaultValue={checks[index]?.check_next}
                            fullWidth
                            helperText={
                              formValid.errors.check_next &&
                              formValid.errors.check_next
                            }
                            name="check_next"
                            onChange={(e) => onChangeChecks(e, index)}
                            onKeyPress={(e) => onKeyPress(e, /^[0-9.:\b]+$/)}
                            autoComplete="check_next"
                            variant="outlined"
                          />
                          {/* <LocalizationProvider
                                            className="form-control"
                                            dateAdapter={AdapterDateFns}
                                        >
                                            <Stack spacing={3} className="datefield" style={{ marginTop: "-7px" }}>
                                                <DesktopDatePicker
                                                    className="textfield"
                                                    input={<OutlinedInput label="Departure Date" />}
                                                    margin="normal"
                                                    fullWidth
                                                    label="Next Check On"
                                                    variant="outlined"
                                                    inputFormat="MM/dd/yyyy"
                                                    value={checksDate[index]?.check_next}
                                                    onChange={(val) => checkDateChange(val, 'check_next', index)}
                                                    renderInput={(params) => <TextField {...params} name='check_next' />}
                                                />
                                            </Stack>
                                        </LocalizationProvider> */}
                        </Grid>
                      </>
                    ))}
                  <Grid item xs={12} className="basic">
                    <h4>C of G</h4>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Max FWD C of G"
                      inputProps={{ maxLength: 10 }}
                      error={Boolean(
                        formValid.errors.max_fwdc_of_g &&
                          formValid.errors.max_fwdc_of_g
                      )}
                      defaultValue={state?.max_fwdc_of_g}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.max_fwdc_of_g &&
                        formValid.errors.max_fwdc_of_g
                      }
                      name="max_fwdc_of_g"
                      onBlur={formValid.handleBlur}
                      onKeyPress={(e) => onKeyPress(e, /^[0-9.:\b]+$/)}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="max_fwdc_of_g"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Max AFT C of G"
                      inputProps={{ maxLength: 10 }}
                      error={Boolean(
                        formValid.errors.max_aftc_of_g &&
                          formValid.errors.max_aftc_of_g
                      )}
                      defaultValue={state?.max_aftc_of_g}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.max_aftc_of_g &&
                        formValid.errors.max_aftc_of_g
                      }
                      name="max_aftc_of_g"
                      onKeyPress={(e) => onKeyPress(e, /^[0-9.:\b]+$/)}
                      onBlur={formValid.handleBlur}
                      onChange={formValid.handleChange}
                      onKeyUp={onChange}
                      autoComplete="max_aftc_of_g"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Comments"
                      inputProps={{ maxLength: 10 }}
                      defaultValue={state?.comments}
                      margin="normal"
                      fullWidth
                      name="comments"
                      onChange={onChange}
                      autoComplete="comments"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              )}
            </div>
          </Paper>
          <Stack
            spacing={2}
            direction="row"
            className="buttonss"
            style={{ justifyContent: "right" }}
          >
            <Link to={`/aircraft`} style={{ textDecoration: "none" }}>
              <Button variant="contained" type="button" className="save">
                Back
              </Button>
            </Link>
            <ButtonLoader
              type="submit"
              className="save"
              variant="contained"
              onClick={() => setStatus("normal")}
              loader={btnLoader}
              title="Submit"
            />
            {/* <Button
              variant="contained"
              type="submit"
              className="save"
              disabled={btnLoader}
            >
              {"Submit"}
            </Button> */}
          </Stack>
        </form>
      </Container>
    </AppLayout>
  );
}
export default withContext(AddAirCrafts);
