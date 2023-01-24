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
  FormHelperText,
  Button,
  makeStyles,
  OutlinedInput,
  MenuItem,
} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import React, { useEffect, useRef, useState } from "react";
import { FormC, onKeyPress, validation } from "../../common/validation";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import momentTz from "moment-timezone";
import moment from "moment";
import Fetch from "../../common/fetch";
import { useReactToPrint } from "react-to-print";
import swal from 'sweetalert'
import { DeleteModel } from "../../common/model";
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
const LoadSheet = (props) => {
  const classes = useStyles();
  const componentRef = useRef();
  const [allAirCraft, setAllAirCraft] = useState({});
  const [dateState, setDateState] = useState({
    date: null,
    departure_from: null,
    departure_to: null,
  });
  const [state, setState] = useState({
    date: "",
    departure_from: "",
    departure_to: "",
    basic_empty_weight: "",
    basic_empty_arm: "",
    basic_moment_arm: "",
    front_row_weight: "",
    front_row_arm: "",
    front_row_moment_arm: "",
    rear_row_weight: "",
    rear_row_arm: "",
    rear_row_moment_arm: "",
    baggage: "",
    baggae_arm: "",
    baggage_moment: "",
    usable_fuel_weight: '',
    usable_fuel_arm: '',
    usable_fuel_moment: '',
    total_weight: "",
    total_moment: "",
    c_of_g: "",
    name_of_pic: "",
    // sign_of_pic: "",
    schedule: "",
    aircraft_registration: "",
  });
  const [loader, setloading] = useState(true);
  const [ids, setId] = useState('');
  const [showPrint, setShowPrint] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    Fetch(`flight/loadsheet/${ids}/`, state, { method: "put" }).then((d) => {
      if (d?.status) {
        setShowPrint(true);
        swal("Load Sheet Add Successfully", "", "success", {
          button: "OK",
        }).then(d => {
          props.history.push('/roster')
        });
      }
    });
  };
  const formValid = FormC({
    values: state,
    onSubmit,
    removeValidValue: ['name_of_pic', 'total_weight', 'total_moment', 'c_of_g']
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    let param = {
      ...state,
      [name]: value,
    };

    if (name === 'basic_empty_weight' || name === 'front_row_weight' || name === 'rear_row_weight' || name === 'baggage' || name === 'usable_fuel_weight') {
      let totalWeight = Number(param.basic_empty_weight) + Number(param.front_row_weight) + Number(param.rear_row_weight) + Number(param.baggage) + Number(param.usable_fuel_weight)
      param = {
        ...param,
        total_weight: totalWeight,
      };
    }
    if (name == 'basic_moment_arm' || name == 'front_row_moment_arm' || name == 'rear_row_moment_arm' || name == 'baggage_moment' || name == 'usable_fuel_moment') {
      let totalMoment = Number(param.basic_moment_arm) + Number(param.front_row_moment_arm) + Number(param.rear_row_moment_arm) + Number(param.baggage_moment) + Number(param.usable_fuel_moment)
      param = {
        ...param,
        total_moment: totalMoment,
      };
    }
    if (param["total_moment"] || param["total_weight"]) {
      let countTotal = (param?.total_moment ? +param?.total_moment : 0) /
        (param?.total_weight ? +param?.total_weight : 0)
      param = {
        ...param,
        c_of_g: countTotal?.toFixed(2),
      };
    }
    formValid?.handleChange(e);
    setState(param);
  };
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
  const handleTimeChange = (val, name) => {
    const d = momentTz(val).tz("Asia/Kolkata").format("HH:mm");
    setDateState({
      ...dateState,
      [name]: val,
    });
    setState({
      ...state,
      [name]: d,
    });
  };
  useEffect(() => {
    const id = props?.location?.search?.replace("?id=", "");
    setId(id)
    // Fetch(`aircraft/${id}`,null,{method:'put'}).then((d) => {
    // })
    Fetch("flight/schedule/get_user_list/").then((d) => {
      if (d?.status) {
        setAllAirCraft(d?.data);
      }
    });
    Fetch(`flight/loadsheet/${props?.location?.search}`).then((d) => {
      if (d?.status) {
        const { data } = d;
        setDateState({
          date: moment(data.date).format("llll"),
          departure_from: moment(data.date + " " + data.departure_from).format(
            "llll"
          ),
          departure_to: moment(data.date + " " + data.departure_to).format(
            "llll"
          ),

        });
        setState({
          date: data.date,
          student_name: data.student_name,
          departure_from: data.departure_from,
          departure_to: data.departure_to,
          basic_empty_weight: data.basic_empty_weight,
          basic_empty_arm: data.basic_empty_arm,
          basic_moment_arm: data.basic_moment_arm,
          front_row_weight: data.front_row_weight,
          front_row_arm: data.front_row_arm,
          front_row_moment_arm: data.front_row_moment_arm,
          rear_row_weight: data.rear_row_weight,
          rear_row_arm: data.rear_row_arm,
          rear_row_moment_arm: data.rear_row_moment_arm,
          baggage: data.baggage,
          usable_fuel_weight: data.usable_fuel_weight,
          usable_fuel_arm: data.usable_fuel_arm,
          usable_fuel_moment: data.usable_fuel_moment,
          total_weight: data.total_weight,
          total_moment: data.total_moment,
          c_of_g: data.c_of_g?.toFixed(2),
          name_of_pic: data.name_of_pic,
          // sign_of_pic: data.sign_of_pic,
          baggae_arm: data.baggae_arm,
          baggage_moment: data.baggage_moment,
          schedule: data.schedule,
          aircraft_registration: data.aircraft_registration,
        });

        setloading(false);
        const error = validation(data);
        if (!Object?.keys(error)?.length) {
          setShowPrint(true);
        }
      } else {
        setloading(false)
      }
    });
  }, [props?.location?.search]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <AppLayout>
      <Container className="load_sheet">
        {!loader ? (
          <form method="POST" noValidate onSubmit={formValid.handleSubmit}>
            <Paper elevation={3} style={{ marginTop: "20px" }}>
              <div
                className={classes.root}
                style={{ padding: "20px 20px 50px", marginBottom: "30px" }}
              >
                <div className="customHeadingMar">
                  <h2>Load Sheet</h2>
                  <Divider />
                </div>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <FormControl
                      className="form-control"
                      fullWidth
                      error={formValid.errors.aircraft_registration?.length}
                    >
                      <InputLabel id="demo-simple-select-label">
                        A/C Registration
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-controlled-open-select"
                        input={<OutlinedInput label="A/C Registration" />}
                        label="A/C Registration"
                        disabled
                        onChange={(e) => onChange(e)}
                        value={state.aircraft_registration}
                        name="aircraft_registration"
                        variant="outlined"
                      >
                        {allAirCraft?.aircraft?.map((d, i) => (
                          <MenuItem key={i + d.id} value={d.id}>
                            {d?.registration_number}
                          </MenuItem>
                        ))}
                      </Select>
                      {formValid.errors?.aircraft_registration?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.aircraft_registration}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Filed By"
                      inputProps={{ maxLength: 50 }}
                      margin="normal"
                      disabled
                      fullWidth
                      value={state.student_name}
                      name="student_name"
                      onChange={onChange}
                      autoComplete=""
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <LocalizationProvider
                      className="form-control"
                      dateAdapter={AdapterDateFns}
                    >
                      <Stack spacing={3} className="datefield">
                        <DesktopDatePicker
                          className="textfield"
                          input={<OutlinedInput label="Date" />}
                          margin="normal"
                          fullWidth
                          label="Date"
                          variant="outlined"
                          inputFormat="MM/dd/yyyy"
                          value={dateState.date}
                          onChange={(val) => handleDateChange(val, "date")}
                          renderInput={(params) => <TextField {...params} name='date' />}
                        />
                      </Stack>
                      {formValid.errors?.date?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.date}
                        </FormHelperText>
                      )}
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Departure From"
                      inputProps={{ maxLength: 50 }}
                      margin="normal"
                      fullWidth
                      value={state.departure_from}
                      name="departure_from"
                      onChange={onChange}
                      autoComplete=""
                      variant="outlined"
                    />
                    {/* <LocalizationProvider
                      className="form-control"
                      dateAdapter={AdapterDateFns}
                    >
                      <Stack spacing={3} className="datefield">
                        <TimePicker
                          input={<OutlinedInput label="Departure From" />}
                          className="textfield"
                          margin="normal"
                          ampm={false}
                          variant="outlined"
                          label="Departure From"
                          value={dateState.departure_from}
                          onChange={(val) =>
                            handleTimeChange(val, "departure_from")
                          }
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                      {formValid.errors?.departure_from?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.departure_from}
                        </FormHelperText>
                      )}
                    </LocalizationProvider> */}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Arrival To"
                      inputProps={{ maxLength: 50 }}
                      margin="normal"
                      fullWidth
                      value={state.departure_to}
                      name="departure_to"
                      onChange={onChange}
                      autoComplete=""
                      variant="outlined"
                    />
                    {/* <LocalizationProvider
                      className="form-control"
                      dateAdapter={AdapterDateFns}
                    >
                      <Stack spacing={3} className="datefield">
                        <TimePicker
                          input={<OutlinedInput label="Departure To" />}
                          className="textfield"
                          margin="normal"
                          variant="outlined"
                          ampm={false}
                          label="Arrival To"
                          value={dateState.departure_to}
                          onChange={(val) =>
                            handleTimeChange(val, "departure_to")
                          }
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                      {formValid.errors?.departure_to?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.departure_to}
                        </FormHelperText>
                      )}
                    </LocalizationProvider> */}
                  </Grid>
                </Grid>

                <span class="line">
                  <h2>
                    <span>C of G Computation Chart</span>
                  </h2>
                </span>
                <div className="table-responsive">
                  <table width={'100%'}>
                    <tr>
                      <th style={{ border: "1px solid #dddddd", padding: "10px" }} colSpan={2}>Item</th>
                      <th style={{ border: "1px solid #dddddd", padding: "10px" }}>Weight</th>
                      <th style={{ border: "1px solid #dddddd", padding: "10px" }}>ARM (m)</th>
                      <th style={{ border: "1px solid #dddddd", padding: "10px" }}>Moment Weight x Arm</th>
                    </tr>
                    <tr>
                      <td
                        style={{ border: "1px solid #dddddd", padding: "10px" }}
                        colSpan={2}
                      >
                        Basic Empty Weight
                      </td>
                      <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          label=""
                          inputProps={{ maxLength: 20 }}
                          margin="normal"
                          fullWidth
                          error={Boolean(
                            formValid.errors.basic_empty_weight &&
                            formValid.errors.basic_empty_weight
                          )}
                          helperText={
                            formValid.errors.basic_empty_weight &&
                            formValid.errors.basic_empty_weight
                          }
                          name="basic_empty_weight"
                          defaultValue={state.basic_empty_weight}
                          onChange={onChange}
                          onKeyPress={(e) => onKeyPress(e, /^[0-9.\b]+$/)}
                          autoComplete="basic_empty_weight"
                          variant="outlined"
                        />
                      </td>
                      <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          label=""
                          inputProps={{ maxLength: 50 }}
                          margin="normal"
                          fullWidth
                          error={Boolean(
                            formValid.errors.basic_empty_arm &&
                            formValid.errors.basic_empty_arm
                          )}
                          helperText={
                            formValid.errors.basic_empty_arm &&
                            formValid.errors.basic_empty_arm
                          }
                          onKeyPress={(e) => onKeyPress(e, /^[0-9.\b]+$/)}
                          defaultValue={state.basic_empty_arm}
                          name="basic_empty_arm"
                          onChange={onChange}
                          autoComplete="basic_empty_arm"
                          variant="outlined"
                        />
                      </td>
                      <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
                        {/* {data?.basic_moment_arm} */}
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          label=""
                          inputProps={{ maxLength: 50 }}
                          margin="normal"
                          onKeyPress={(e) => onKeyPress(e, /^[0-9.\b]+$/)}
                          // onKeyPress={onKeyPress}
                          fullWidth
                          error={Boolean(
                            formValid.errors.basic_moment_arm &&
                            formValid.errors.basic_moment_arm
                          )}
                          helperText={
                            formValid.errors.basic_moment_arm &&
                            formValid.errors.basic_moment_arm
                          }
                          defaultValue={state.basic_moment_arm}
                          name="basic_moment_arm"
                          onChange={onChange}
                          autoComplete="basic_moment_arm"
                          variant="outlined"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
                        Front Row
                      </td>
                      <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
                        Pilot/Co-Pilot
                      </td>
                      <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
                        {/* {data?.front_row_weight} */}
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          onKeyPress={(e) => onKeyPress(e, /^[0-9.\b]+$/)}
                          // onKeyPress={onKeyPress}
                          label=""
                          inputProps={{ maxLength: 50 }}
                          margin="normal"
                          fullWidth
                          error={Boolean(
                            formValid.errors.front_row_weight &&
                            formValid.errors.front_row_weight
                          )}
                          helperText={
                            formValid.errors.front_row_weight &&
                            formValid.errors.front_row_weight
                          }
                          defaultValue={state.front_row_weight}
                          name="front_row_weight"
                          onChange={onChange}
                          autoComplete="front_row_weight"
                          variant="outlined"
                        />
                      </td>
                      <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
                        {/* {data?.front_row_arm} */}
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          label=""
                          inputProps={{ maxLength: 50 }}
                          onKeyPress={(e) => onKeyPress(e, /^[0-9.\b]+$/)}
                          // onKeyPress={onKeyPress}
                          margin="normal"
                          fullWidth
                          error={Boolean(
                            formValid.errors.front_row_arm &&
                            formValid.errors.front_row_arm
                          )}
                          helperText={
                            formValid.errors.front_row_arm &&
                            formValid.errors.front_row_arm
                          }
                          defaultValue={state.front_row_arm}
                          name="front_row_arm"
                          onChange={onChange}
                          autoComplete="front_row_arm"
                          variant="outlined"
                        />
                      </td>
                      <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
                        {/* {data?.front_row_moment_arm} */}
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          label=""
                          inputProps={{ maxLength: 50 }}
                          margin="normal"
                          onKeyPress={(e) => onKeyPress(e, /^[0-9.\b]+$/)}
                          // onKeyPress={onKeyPress}
                          fullWidth
                          error={Boolean(
                            formValid.errors.front_row_moment_arm &&
                            formValid.errors.front_row_moment_arm
                          )}
                          helperText={
                            formValid.errors.front_row_moment_arm &&
                            formValid.errors.front_row_moment_arm
                          }
                          defaultValue={state.front_row_moment_arm}
                          name="front_row_moment_arm"
                          onChange={onChange}
                          autoComplete="front_row_moment_arm"
                          variant="outlined"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
                        Rear Row
                      </td>
                      <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
                        Passenger
                      </td>
                      <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
                        {/* {data?.rear_row_weight} */}
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          label=""
                          inputProps={{ maxLength: 50 }}
                          margin="normal"
                          onKeyPress={(e) => onKeyPress(e, /^[0-9.\b]+$/)}
                          // onKeyPress={onKeyPress}
                          fullWidth
                          error={Boolean(
                            formValid.errors.rear_row_weight &&
                            formValid.errors.rear_row_weight
                          )}
                          helperText={
                            formValid.errors.rear_row_weight &&
                            formValid.errors.rear_row_weight
                          }
                          defaultValue={state.rear_row_weight}
                          name="rear_row_weight"
                          onChange={onChange}
                          autoComplete="rear_row_weight"
                          variant="outlined"
                        />
                      </td>
                      <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
                        {/* {data?.rear_row_arm} */}
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          label=""
                          inputProps={{ maxLength: 50 }}
                          margin="normal"
                          onKeyPress={(e) => onKeyPress(e, /^[0-9.\b]+$/)}
                          // onKeyPress={onKeyPress}
                          fullWidth
                          defaultValue={state.rear_row_arm}
                          name="rear_row_arm"
                          error={Boolean(
                            formValid.errors.rear_row_arm &&
                            formValid.errors.rear_row_arm
                          )}
                          helperText={
                            formValid.errors.rear_row_arm &&
                            formValid.errors.rear_row_arm
                          }
                          onChange={onChange}
                          autoComplete="rear_row_arm"
                          variant="outlined"
                        />
                      </td>
                      <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
                        {/* {data?.rear_row_moment_arm} */}
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          label=""
                          inputProps={{ maxLength: 50 }}
                          onKeyPress={(e) => onKeyPress(e, /^[0-9.\b]+$/)}
                          // onKeyPress={onKeyPress}
                          margin="normal"
                          fullWidth
                          error={Boolean(
                            formValid.errors.rear_row_moment_arm &&
                            formValid.errors.rear_row_moment_arm
                          )}
                          helperText={
                            formValid.errors.rear_row_moment_arm &&
                            formValid.errors.rear_row_moment_arm
                          }
                          defaultValue={state.rear_row_moment_arm}
                          name="rear_row_moment_arm"
                          onChange={onChange}
                          autoComplete="rear_row_moment_arm"
                          variant="outlined"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ border: "1px solid #dddddd", padding: "10px" }}
                        colSpan={2}
                      >
                        Baggage (max weight = 80 kg)
                      </td>
                      <td
                        style={{ border: "1px solid #dddddd", padding: "10px" }}
                      >
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          label=""
                          inputProps={{ maxLength: 50 }}
                          onKeyPress={(e) => onKeyPress(e, /^[0-9.\b]+$/)}
                          // onKeyPress={onKeyPress}
                          margin="normal"
                          fullWidth
                          error={Boolean(
                            formValid.errors.baggage && formValid.errors.baggage
                          )}
                          helperText={
                            formValid.errors.baggage && formValid.errors.baggage
                          }
                          defaultValue={state.baggage}
                          name="baggage"
                          onChange={onChange}
                          autoComplete="baggage"
                          variant="outlined"
                        />
                        {/* {data?.baggage} */}
                      </td>
                      <td
                        style={{ border: "1px solid #dddddd", padding: "10px" }}
                      >
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          label=""
                          inputProps={{ maxLength: 50 }}
                          onKeyPress={(e) => onKeyPress(e, /^[0-9.\b]+$/)}
                          // onKeyPress={onKeyPress}
                          margin="normal"
                          fullWidth
                          error={Boolean(
                            formValid.errors.baggae_arm && formValid.errors.baggae_arm
                          )}
                          helperText={
                            formValid.errors.baggae_arm && formValid.errors.baggae_arm
                          }
                          defaultValue={state.baggae_arm}
                          name="baggae_arm"
                          onChange={onChange}
                          autoComplete="baggae_arm"
                          variant="outlined"
                        />
                        {/* {data?.baggage} */}
                      </td>
                      <td
                        style={{ border: "1px solid #dddddd", padding: "10px" }}
                      >
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          label=""
                          inputProps={{ maxLength: 50 }}
                          onKeyPress={(e) => onKeyPress(e, /^[0-9.\b]+$/)}
                          // onKeyPress={onKeyPress}
                          margin="normal"
                          fullWidth
                          error={Boolean(
                            formValid.errors.baggage_moment && formValid.errors.baggage_moment
                          )}
                          helperText={
                            formValid.errors.baggage_moment && formValid.errors.baggage_moment
                          }
                          defaultValue={state.baggage_moment}
                          name="baggage_moment"
                          onChange={onChange}
                          autoComplete="baggage_moment"
                          variant="outlined"
                        />
                        {/* {data?.baggage} */}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ border: "1px solid #dddddd", padding: "10px" }}
                        colSpan={2}
                      >
                        Usable Fuel (___ltr X 0.72=___kg)
                      </td>
                      <td>
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          label=""
                          inputProps={{ maxLength: 50 }}
                          margin="normal"
                          fullWidth
                          error={Boolean(
                            formValid.errors.usable_fuel_weight &&
                            formValid.errors.usable_fuel_weight
                          )}
                          helperText={
                            formValid.errors.usable_fuel_weight &&
                            formValid.errors.usable_fuel_weight
                          }
                          defaultValue={state.usable_fuel_weight}
                          name="usable_fuel_weight"
                          onKeyPress={(e) => onKeyPress(e, /^[0-9.\b]+$/)}
                          onChange={onChange}
                          autoComplete="usable_fuel_weight"
                          variant="outlined"
                        />
                      </td>
                      <td>
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          label=""
                          inputProps={{ maxLength: 50 }}
                          margin="normal"
                          fullWidth
                          error={Boolean(
                            formValid.errors.usable_fuel_arm &&
                            formValid.errors.usable_fuel_arm
                          )}
                          helperText={
                            formValid.errors.usable_fuel_arm &&
                            formValid.errors.usable_fuel_arm
                          }
                          defaultValue={state.usable_fuel_arm}
                          name="usable_fuel_arm"
                          onKeyPress={(e) => onKeyPress(e, /^[0-9.\b]+$/)}
                          onChange={onChange}
                          autoComplete="usable_fuel_arm"
                          variant="outlined"
                        />
                      </td>
                      <td>
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          label=""
                          inputProps={{ maxLength: 50 }}
                          margin="normal"
                          fullWidth
                          error={Boolean(
                            formValid.errors.usable_fuel_moment &&
                            formValid.errors.usable_fuel_moment
                          )}
                          helperText={
                            formValid.errors.usable_fuel_moment &&
                            formValid.errors.usable_fuel_moment
                          }
                          defaultValue={state.usable_fuel_moment}
                          name="usable_fuel_moment"
                          onKeyPress={(e) => onKeyPress(e, /^[0-9.\b]+$/)}
                          onChange={onChange}
                          autoComplete="usable_fuel_moment"
                          variant="outlined"
                        />
                      </td>
                      {/* <td
                        style={{ border: "1px solid #dddddd", padding: "10px" }}
                        colSpan={3}
                      >
                        {data?.usable_fuel}
                      </td> */}
                    </tr>
                    <tr>
                      <td
                        style={{ border: "1px solid #dddddd", padding: "10px" }}
                        colSpan={2}
                      >
                        Total Weight
                      </td>
                      <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          label=""
                          inputProps={{ maxLength: 50 }}
                          onKeyPress={onKeyPress}
                          disabled
                          margin="normal"
                          error={Boolean(
                            formValid.errors.total_weight &&
                            formValid.errors.total_weight
                          )}
                          helperText={
                            formValid.errors.total_weight &&
                            formValid.errors.total_weight
                          }
                          fullWidth
                          value={state.total_weight || ''}
                          defaultValue={state.total_weight}
                          name="total_weight"
                          onChange={onChange}
                          autoComplete="total_weight"
                          variant="outlined"
                        />
                        {/* {state?.total_weight} */}
                      </td>
                      <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
                        Total Moment
                      </td>
                      <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          label=""
                          disabled
                          inputProps={{ maxLength: 50 }}
                          onKeyPress={onKeyPress}
                          margin="normal"
                          error={Boolean(
                            formValid.errors.total_moment &&
                            formValid.errors.total_moment
                          )}
                          helperText={
                            formValid.errors.total_moment &&
                            formValid.errors.total_moment
                          }
                          fullWidth
                          defaultValue={state.total_moment}
                          value={state.total_moment || ''}
                          name="total_moment"
                          onChange={onChange}
                          autoComplete="total_moment"
                          variant="outlined"
                        />
                        {/* {state?.total_moment} */}
                      </td>
                    </tr>
                  </table>
                </div>

                {/* <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Basic Empty Weight"
                      inputProps={{ maxLength: 50 }}
                      margin="normal"
                      fullWidth
                      error={Boolean(
                        formValid.errors.basic_empty_weight &&
                        formValid.errors.basic_empty_weight
                      )}
                      helperText={
                        formValid.errors.basic_empty_weight &&
                        formValid.errors.basic_empty_weight
                      }
                      name="basic_empty_weight"
                      defaultValue={state.basic_empty_weight}
                      onChange={onChange}
                      onKeyPress={onKeyPress}
                      autoComplete="basic_empty_weight"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Basic Empty ARM"
                      inputProps={{ maxLength: 50 }}
                      margin="normal"
                      fullWidth
                      error={Boolean(
                        formValid.errors.basic_empty_arm &&
                        formValid.errors.basic_empty_arm
                      )}
                      helperText={
                        formValid.errors.basic_empty_arm &&
                        formValid.errors.basic_empty_arm
                      }
                      onKeyPress={onKeyPress}
                      defaultValue={state.basic_empty_arm}
                      name="basic_empty_arm"
                      onChange={onChange}
                      autoComplete="basic_empty_arm"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Basic Moment ARM"
                      inputProps={{ maxLength: 50 }}
                      margin="normal"
                      onKeyPress={onKeyPress}
                      fullWidth
                      error={Boolean(
                        formValid.errors.basic_moment_arm &&
                        formValid.errors.basic_moment_arm
                      )}
                      helperText={
                        formValid.errors.basic_moment_arm &&
                        formValid.errors.basic_moment_arm
                      }
                      defaultValue={state.basic_moment_arm}
                      name="basic_moment_arm"
                      onChange={onChange}
                      autoComplete="basic_moment_arm"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      onKeyPress={onKeyPress}
                      label="Front Row Weight"
                      inputProps={{ maxLength: 50 }}
                      margin="normal"
                      fullWidth
                      error={Boolean(
                        formValid.errors.front_row_weight &&
                        formValid.errors.front_row_weight
                      )}
                      helperText={
                        formValid.errors.front_row_weight &&
                        formValid.errors.front_row_weight
                      }
                      defaultValue={state.front_row_weight}
                      name="front_row_weight"
                      onChange={onChange}
                      autoComplete="front_row_weight"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Front Row ARM"
                      inputProps={{ maxLength: 50 }}
                      onKeyPress={onKeyPress}
                      margin="normal"
                      fullWidth
                      error={Boolean(
                        formValid.errors.front_row_arm &&
                        formValid.errors.front_row_arm
                      )}
                      helperText={
                        formValid.errors.front_row_arm &&
                        formValid.errors.front_row_arm
                      }
                      defaultValue={state.front_row_arm}
                      name="front_row_arm"
                      onChange={onChange}
                      autoComplete="front_row_arm"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Front Row Moment ARM"
                      inputProps={{ maxLength: 50 }}
                      margin="normal"
                      onKeyPress={onKeyPress}
                      fullWidth
                      error={Boolean(
                        formValid.errors.front_row_moment_arm &&
                        formValid.errors.front_row_moment_arm
                      )}
                      helperText={
                        formValid.errors.front_row_moment_arm &&
                        formValid.errors.front_row_moment_arm
                      }
                      defaultValue={state.front_row_moment_arm}
                      name="front_row_moment_arm"
                      onChange={onChange}
                      autoComplete="front_row_moment_arm"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Rear Row Weight"
                      inputProps={{ maxLength: 50 }}
                      margin="normal"
                      onKeyPress={onKeyPress}
                      fullWidth
                      error={Boolean(
                        formValid.errors.rear_row_weight &&
                        formValid.errors.rear_row_weight
                      )}
                      helperText={
                        formValid.errors.rear_row_weight &&
                        formValid.errors.rear_row_weight
                      }
                      defaultValue={state.rear_row_weight}
                      name="rear_row_weight"
                      onChange={onChange}
                      autoComplete="rear_row_weight"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Rear Row ARM"
                      inputProps={{ maxLength: 50 }}
                      margin="normal"
                      onKeyPress={onKeyPress}
                      fullWidth
                      defaultValue={state.rear_row_arm}
                      name="rear_row_arm"
                      error={Boolean(
                        formValid.errors.rear_row_arm &&
                        formValid.errors.rear_row_arm
                      )}
                      helperText={
                        formValid.errors.rear_row_arm &&
                        formValid.errors.rear_row_arm
                      }
                      onChange={onChange}
                      autoComplete="rear_row_arm"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Rear Row Moment ARM"
                      inputProps={{ maxLength: 50 }}
                      onKeyPress={onKeyPress}
                      margin="normal"
                      fullWidth
                      error={Boolean(
                        formValid.errors.rear_row_moment_arm &&
                        formValid.errors.rear_row_moment_arm
                      )}
                      helperText={
                        formValid.errors.rear_row_moment_arm &&
                        formValid.errors.rear_row_moment_arm
                      }
                      defaultValue={state.rear_row_moment_arm}
                      name="rear_row_moment_arm"
                      onChange={onChange}
                      autoComplete="rear_row_moment_arm"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Baggage"
                      inputProps={{ maxLength: 50 }}
                      onKeyPress={onKeyPress}
                      margin="normal"
                      fullWidth
                      error={Boolean(
                        formValid.errors.baggage && formValid.errors.baggage
                      )}
                      helperText={
                        formValid.errors.baggage && formValid.errors.baggage
                      }
                      defaultValue={state.baggage}
                      name="baggage"
                      onChange={onChange}
                      autoComplete="baggage"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Usable Fuel"
                      inputProps={{ maxLength: 50 }}
                      margin="normal"
                      fullWidth
                      error={Boolean(
                        formValid.errors.usable_fuel &&
                        formValid.errors.usable_fuel
                      )}
                      helperText={
                        formValid.errors.usable_fuel &&
                        formValid.errors.usable_fuel
                      }
                      defaultValue={state.usable_fuel}
                      name="usable_fuel"
                      onChange={onChange}
                      autoComplete="usable_fuel"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Total Weight"
                      inputProps={{ maxLength: 50 }}
                      onKeyPress={onKeyPress}
                      margin="normal"
                      error={Boolean(
                        formValid.errors.total_weight &&
                        formValid.errors.total_weight
                      )}
                      helperText={
                        formValid.errors.total_weight &&
                        formValid.errors.total_weight
                      }
                      fullWidth
                      defaultValue={state.total_weight}
                      name="total_weight"
                      onChange={onChange}
                      autoComplete="total_weight"
                      variant="outlined"
                    />
                  </Grid>
                </Grid> */}

                <span class="line">
                  <h2></h2>
                </span>
                <Grid container spacing={2}>
                  {/* <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      onKeyPress={onKeyPress}
                      label="Total Moment"
                      inputProps={{ maxLength: 50 }}
                      margin="normal"
                      fullWidth
                      name="total_moment"
                      error={Boolean(
                        formValid.errors.total_moment &&
                        formValid.errors.total_moment
                      )}
                      helperText={
                        formValid.errors.total_moment &&
                        formValid.errors.total_moment
                      }
                      onChange={onChange}
                      defaultValue={state.total_moment}
                      autoComplete="total_moment"
                      variant="outlined"
                    />
                  </Grid> */}
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="C of G (Aft of Datum) = Total Moment(M)/Total Weight (W)"
                      inputProps={{ maxLength: 50 }}
                      margin="normal"
                      fullWidth
                      disabled
                      name="c_of_g"
                      value={state.c_of_g || ''}
                      error={Boolean(
                        formValid.errors.c_of_g && formValid.errors.c_of_g
                      )}
                      helperText={
                        formValid.errors.c_of_g && formValid.errors.c_of_g
                      }
                      onChange={onChange}
                      defaultValue={state.c_of_g}
                      autoComplete=""
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Name of PIC"
                      inputProps={{ maxLength: 50 }}
                      margin="normal"
                      fullWidth
                      name="name_of_pic"
                      onChange={onChange}
                      defaultValue={state.name_of_pic}
                      autoComplete="name_of_pic"
                      variant="outlined"
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={6} md={6} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Sign of PIC"
                      inputProps={{ maxLength: 50 }}
                      margin="normal"
                      fullWidth
                      name="sign_of_pic"
                      onChange={onChange}
                      error={Boolean(
                        formValid.errors.sign_of_pic &&
                        formValid.errors.sign_of_pic
                      )}
                      helperText={
                        formValid.errors.sign_of_pic &&
                        formValid.errors.sign_of_pic
                      }
                      defaultValue={state.sign_of_pic}
                      autoComplete="sign_of_pic"
                      variant="outlined"
                    />
                  </Grid> */}
                </Grid>
                {/* </div> */}
              </div>
            </Paper>
            <Stack
              spacing={2}
              direction="row"
              className="buttonss"
              style={{ justifyContent: "right" }}
            >
              <Button variant="contained" type="submit" className="save">
                Submit
              </Button>
              {/* {showPrint ? ( */}
              <Button
                variant="contained"
                className="save"
                type="button"
                onClick={handlePrint}
              >
                Print
              </Button>
              {/* ) : null} */}
            </Stack>
          </form>
        ) : null}
        <LoadSheetPrint data={state} ref={componentRef} />
      </Container>
    </AppLayout>
  );
};
const LoadSheetPrint = React.forwardRef((props, ref) => {
  const { data } = props;
  return (
    <div className="table-responsive">
    <table
      style={{
        width: "100%",
        padding: '20px',
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: "-1",
      }}
      ref={ref}
    >
      <tbody>
        <tr>
          <td
            style={{
              border: "1px solid #dddddd",
              textAlign: "center",
              padding: "10px",
            }}
            colSpan={5}
          >
            Loadsheet
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            AC Regn
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            {data?.aircraft_registration}
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            Filled By
          </td>
          <td
            style={{ border: "1px solid #dddddd", padding: "10px" }}
            colSpan={2}
          >
            {data?.student_name}
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>Date</td>
          <td
            style={{ border: "1px solid #dddddd", padding: "10px" }}
            colSpan={4}
          >
            {data?.date}
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            Departure
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            {data?.departure_from}
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>to</td>
          <td
            style={{ border: "1px solid #dddddd", padding: "10px" }}
            colSpan={2}
          >
            {data?.departure_to}
          </td>
        </tr>
        <tr>
          <td
            style={{ border: "1px solid #dddddd", padding: "10px" }}
            colSpan={5}
          >
            C of G Computation Chart
          </td>
        </tr>
        <tr>
          <td
            style={{ border: "1px solid #dddddd", padding: "10px" }}
            colSpan={2}
          >
            Item
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            Weight (kg)
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            Arm (m)
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            Moment Weight x Arm(kg x m)
          </td>
        </tr>
        <tr>
          <td
            style={{ border: "1px solid #dddddd", padding: "10px" }}
            colSpan={2}
          >
            Basic Empty Weight
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            {data?.basic_empty_weight}
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            {data?.basic_empty_arm}
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            {data?.basic_moment_arm}
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            Front Row
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            Pilot/Co-Pilot
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            {data?.front_row_weight}
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            {data?.front_row_arm}
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            {data?.front_row_moment_arm}
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            Rear Row
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            Passenger
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            {data?.rear_row_weight}
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            {data?.rear_row_arm}
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            {data?.rear_row_moment_arm}
          </td>
        </tr>
        <tr>
          <td
            style={{ border: "1px solid #dddddd", padding: "10px" }}
            colSpan={2}
          >
            Baggage (max weight = 80 kg)
          </td>
          <td
            style={{ border: "1px solid #dddddd", padding: "10px" }}
            colSpan={3}
          >
            {data?.baggage}
          </td>
        </tr>
        <tr>
          <td
            style={{ border: "1px solid #dddddd", padding: "10px" }}
            colSpan={2}
          >
            Usable Fuel (___ltr X 0.72=___kg)
          </td>
          <td
            style={{ border: "1px solid #dddddd", padding: "10px" }}
            colSpan={3}
          >
            {data?.usable_fuel}
          </td>
        </tr>
        <tr>
          <td
            style={{ border: "1px solid #dddddd", padding: "10px" }}
            colSpan={2}
          >
            Total Weight
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            {data?.total_weight}
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            Total Moment
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            {data?.total_moment}
          </td>
        </tr>
        <tr>
          <td
            style={{ border: "1px solid #dddddd", padding: "10px" }}
            colSpan={2}
          >
            C of G (Aft of Datum) = Total Moment(M)/Total Weight (W)
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            {data?.c_of_g}
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            Name of PIC
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            {data?.name_of_pic}
          </td>
          <td style={{ border: "1px solid #dddddd", padding: "10px" }}>
            Sign of PIC
          </td>
          <td
            style={{ border: "1px solid #dddddd", padding: "10px" }}
            colSpan={2}
          >
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  );
});
export default LoadSheet;
