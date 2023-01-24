import AppLayout from '../../layout/appLayout'
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
  MenuItem,
} from '@material-ui/core'
import Stack from "@mui/material/Stack";
import { useEffect, useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import swal from 'sweetalert'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { makeStyles } from '@material-ui/core/styles'
import { FormC, onKeyPress } from '../../common/validation'
import { withContext } from '../../context/appContext';
import moment from 'moment'
import momentTz from 'moment-timezone'
import Fetch from '../../common/fetch';
import { FormHelperText } from '@mui/material';
import { hourMint, testRoaster } from '../../dummyData/demo';
import { Link } from "react-router-dom";
import SearchSelect from '../../component/searchselect';
import ButtonLoader from '../../component/button';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))
const nonTech = [
  {
    name: 'KNO',
    value: 'kno'
  },
  {
    name: 'APK',
    value: 'apk'
  },
  {
    name: 'COM',
    value: 'com'
  },
  {
    name: 'WLM',
    value: 'wlm'
  },
  {
    name: 'SAW',
    value: 'saw'
  },
  {
    name: 'PSD',
    value: 'psd'
  },
]
function AddRoaster(props) {
  const { role, allRoaster } = props.context
  const classes = useStyles()
  const [viewOnly, setViewOnly] = useState(props.location.search?.replace('?viewOnly=', '') ? Number(props.location.search?.replace('?viewOnly=', '')) : 0)
  const [allAirCraft, setAllAirCraft] = useState({})
  const [exercisesChoice, setExercisesChoice] = useState([])
  const [pilotFunc, setPilotFunc] = useState([])
  const [noFound, setNoFound] = useState('')
  const [dateState, setDateState] = useState({ departure_date: null, departure_time: null, arrival_date: null, arrival_time: null, day: null, night: null, simulated: null, actual: null })
  const [registrationVal, setRegistration] = useState('')
  const [studentVal, setstudentVal] = useState('')
  const [status, setStatus] = useState('')
  const [formType, setFromType] = useState('')
  const [typeOfAircraft, settypeOfAircraft] = useState('')
  const [loading, setloading] = useState(true)
  const [btnLoader, setBtnLoader] = useState(false)
  const [totalDuration, setTotalDuration] = useState('')
  const [state, setRosatParam] = useState({
    tech: [],
    nontech: [],
    student: null,
    egca_id: '',
    position_of_student: '',
    take_of_airport: '',
    departure_date: '',
    departure_time: '',
    fob_departure: '',
    route: '',
    landing_airport: '',
    arrival_date: '',
    arrival_time: '',
    total_duration: '',
    total_distance: '',
    number_of_landings: '',
    fob_on_arrival: null,
    // simulatedHours: '',
    // simulatedMint: '',
    // actualHours: '',
    // actualMint: '',
    simulated: '',
    actual: '',
    day: '',
    result: '',
    night: '',
    class_of_aircraft: null,
    instructor: null,
    type_of_aircraft: null,
    pilot_function: '',
    type_of_flight: null,
    training_comments: "",
    aircraft: '',
    accident: false,
    accident_comment: "",
    ac_defects: false,
    ac_defects_comments: "",
    any_info: false,
    any_info_comments: "",
  })
  useEffect(() => {
    Fetch('flight/schedule/get_user_list/').then(d => {
      if (d?.status) {
        setExercisesChoice(d?.data?.excercise_choice)
        setAllAirCraft(d?.data)
      }
    })
    Fetch('flight/pilot-function/').then(d => {
      if (d?.status) {
        setPilotFunc(d?.data)
      }
    })
  }, [])
  useEffect(() => {
    setFromType(props.match.params?.type)
    if (props.match.params?.type !== 'add') {
      Fetch(`flight/schedule/${props.match.params?.type}`, null,
        { method: 'get' },
      ).then(d => {
        if (d.status) {
          const { data } = d
          setTotalDuration(data.total_duration)
          settypeOfAircraft(data?.type_of_aircraft_name)
          setDateState({
            departure_date: data.departure_date ? moment(data.departure_date).format('llll') : null,
            departure_time: data.departure_time ? moment(data.departure_date + ' ' + data.departure_time).format('llll') : null,
            arrival_date: data.arrival_date ? moment(data.arrival_date).format('llll') : null,
            arrival_time: data.arrival_time ? moment(data.arrival_date + ' ' + data.arrival_time).format('llll') : null,
            day: data.day ? moment(moment().format('yyyy-MM-DD') + ' ' + data.day).format('llll') : null,
            simulated: data.simulated ? moment(moment().format('yyyy-MM-DD') + ' ' + data.simulated).format('llll') : null,
            actual: data.actual ? moment(moment().format('yyyy-MM-DD') + ' ' + data.actual).format('llll') : null,
            night: data.night ? moment(moment().format('yyyy-MM-DD') + ' ' + data.night).format('llll') : null
          })
          const studentParam = role === 1 ? data?.student : JSON.stringify({
            id: data?.student,
            name: data?.student_name?data?.student_name:'',
            egca_id: data?.egca_id?data?.egca_id:'',
            position: data?.position_of_student?data?.position_of_student:''
          })
          setstudentVal(studentParam)
          setRegistration(JSON.stringify({
            id: data?.aircraft,
            registration_number: data?.aircraft_number,
            type_of_aircraft: data?.type_of_aircraft,
            type_of_aircraft_name: data?.type_of_aircraft_name,
            class_of_aircraft: data?.class_of_aircraft,
            class_of_aircraft_name: data?.class_of_aircraft_name,
          }))
          let techFilter = []
          data?.tech?.map(d => {
            techFilter.push({
              exercise: d?.exercise,
              grade: d?.grade
            })
          })
          let techNonFilter = []
          data?.nontech?.map(d => {
            techNonFilter.push({
              name: d?.name,
              marks: d?.marks
            })
          })
          setRosatParam({
            tech: techFilter,
            nontech: techNonFilter,
            test: data?.test,
            student: data?.student,
            egca_id: data?.egca_id,
            position_of_student: data?.position_of_student,
            take_of_airport: data?.take_of_airport,
            departure_date: data?.departure_date,
            departure_time: data?.departure_time,
            fob_departure: data?.fob_departure,
            route: data.route,
            landing_airport: data.landing_airport,
            arrival_date: data.arrival_date,
            arrival_time: data.arrival_time,
            number_of_landings: data?.number_of_landings,
            total_duration: data?.total_duration,
            total_distance: data?.total_distance,
            result: data?.result,
            fob_on_arrival: data?.fob_on_arrival,
            simulated: data?.simulated ? data?.simulated : '',
            actual: data?.actual ? data?.actual : '',
            // simulatedHours: data?.simulated ? data?.simulated?.split(':')[0] + ':' + data?.simulated?.split(':')[1] : '',
            // simulatedMint: data?.simulated ? data?.simulated?.split(':')[2] : '',
            // actualHours: data?.actual ? data?.actual?.split(':')[0] + ':' + data?.actual?.split(':')[1] : '',
            // actualMint: data?.actual ? data?.actual?.split(':')[2] : '',
            day: data?.day,
            night: data?.night,
            class_of_aircraft: data?.class_of_aircraft ? data?.class_of_aircraft : null,
            instructor: data?.instructor ? data?.instructor : null,
            type_of_aircraft: data?.type_of_aircraft ? data?.type_of_aircraft : null,
            pilot_function: data?.pilot_function,
            type_of_flight: data?.type_of_flight ? data?.type_of_flight : null,
            training_comments: data?.training_comments,
            aircraft: data?.aircraft ? data?.aircraft : null,
            accident: data?.accident,
            accident_comment: data?.accident_comment,
            ac_defects: data?.ac_defects,
            ac_defects_comments: data?.ac_defects_comments,
            any_info: data?.any_info,
            any_info_comments: data?.any_info_comments,
          })
          setloading(false)
        }
      })
      // let data = allRoaster?.filter(d => d.id === +props.match.params?.type)
      // data = data?.length && data[0]

    } else {
      const { userProfile } = props.context
      if (role === 1) {
        setstudentVal(userProfile.id)
        setRosatParam({
          ...state,
          student: userProfile.id,
          egca_id: userProfile?.profile?.egca_id,
          position_of_student: userProfile?.profile?.designation
        })
      } else if (role === 2) {
        setRosatParam({
          ...state,
          instructor: userProfile.id
        })
      }
      setloading(false)
    }
  }, [props.match.params])
  const [isSubmit, setIsSubmit] = useState("Submit");
  const onSubmit = (e) => {
    e.preventDefault()
    setBtnLoader(true)
    setIsSubmit("Submitting...")
    Fetch(`flight/schedule/${formType !== 'add' ? formType + '/' : ''}`, {
      tech: state.tech,
      test: state.test,
      status: status,
      nontech: state.nontech,
      student: state.student,
      aircraft: state.aircraft,
      egca_id: state.egca_id,
      position_of_student: state.position_of_student,
      take_of_airport: state.take_of_airport,
      departure_date: state.departure_date ? state.departure_date : null,
      departure_time: state.departure_time ? state.departure_time : null,
      fob_departure: Number(state.fob_departure),
      route: state.route,
      result: state.result,
      landing_airport: state.landing_airport,
      arrival_date: state.arrival_date ? state.arrival_date : null,
      arrival_time: state.arrival_time ? state.arrival_time : null,
      number_of_landings: Number(state.number_of_landings),
      fob_on_arrival: Number(state.fob_on_arrival),
      // simulated: state.simulatedHours ? state.simulatedHours + ':' + state.simulatedMint : '',
      // actual: state.actualHours ? state.actualHours + ':' + state.actualMint : '',
      simulated: state.simulated ? state.simulated : '',
      actual: state.actual ? state.actual : '',
      day: state.day ? state.day : null,
      night: state.night ? state.night : null,
      class_of_aircraft: state.class_of_aircraft,
      instructor: state.instructor,
      type_of_aircraft: state.type_of_aircraft,
      pilot_function: state.pilot_function,
      type_of_flight: state.type_of_flight,
      total_duration: state.total_duration,
      total_distance: state.total_distance,
      training_comments: state.training_comments,
      accident: state.accident,
      accident_comment: state.accident_comment,
      ac_defects: state.ac_defects,
      ac_defects_comments: state.ac_defects_comments,
      any_info: state.any_info,
      any_info_comments: state.any_info_comments,
    },
      { method: formType !== 'add' ? 'put' : 'post' },
    ).then(d => {
      setBtnLoader(false)
      if (d?.status) {
        if (formType === 'add') {
          setRosatParam({
            tech: [],
            nontech: [],
            aircraft: '',
            egca_id: '',
            position_of_student: '',
            take_of_airport: '',
            departure_date: '',
            departure_time: '',
            fob_departure: '',
            route: '',
            landing_airport: '',
            arrival_date: '',
            arrival_time: '',
            number_of_landings: '',
            fob_on_arrival: null,
            simulated: '',
            actual: '',
            day: '',
            night: '',
            class_of_aircraft: '',
            instructor: '',
            result: '',
            type_of_aircraft: '',
            pilot_function: '',
            type_of_flight: '',
            training_comments: "",
            accident: false,
            accident_comment: "",
            ac_defects: false,
            ac_defects_comments: "",
            any_info: false,
            any_info_comments: "",
          })
        }
        swal('Submitted Successfully.', '', 'success', {
          button: 'OK',
        }).then(s =>
          // formType === 'add' ?
          role === 1 || role === 2 ? props.history.push(`/roster/load-sheet/?id=${d?.data?.loadsheet}`) : props.history.push(`/roster`)
          // : '',
        )

      } else {
        swal('Something went wrong', '', 'error', {
          button: 'ok',
        })
      }
    })
  }
  const paramValidRemove = role === 2 ? ['aircraft', 'class_of_aircraft', 'departure_date', 'departure_time', 'pilot_function', 'student', 'take_of_airport', 'type_of_aircraft'] : []
  const formValid = FormC({
    values: state, removeValidValue: [
      ...paramValidRemove,
      'instructor',
      'fob_departure',
      'position_of_student',
      'route', 'landing_airport', 'arrival_date', 'arrival_time', 'number_of_landings', 'fob_on_arrival', 'simulated', 'actual', 'day', 'night',
      "training_comments",
      'type_of_flight',
      'total_duration',
      'test',
      'total_distance',
      "accident",
      'tech',
      'egca_id',
      'nontech',
      'result',
      "simulatedHours",
      'simulatedMint',
      'actualHours',
      'actualMint',
      "accident_comment",
      "ac_defects",
      "ac_defects_comments",
      "any_info",
      "any_info_comments",
    ], onSubmit
  })
  const handlenameChange = (e) => {
    const { name, value } = e.target
    if (name === 'aircraft') {
      const data = JSON.parse(value)
      setRegistration(value)
      settypeOfAircraft(data.type_of_aircraft_name)
      setRosatParam({
        ...state,
        [name]: data?.id,
        class_of_aircraft: data.class_of_aircraft,
        type_of_aircraft: data.type_of_aircraft,
      })
    } else {
      if (name === 'pilot_function') {
        let dataState = {
          ...state,
          [name]: value,
          instructor: role === 2 ? props.context.userProfile.id : state.instructor
        }
        if (dataState?.pilot_function?.toString()?.length && pilotFunc?.filter(d => d.id === dataState?.pilot_function)[0]?.name === "Solo") {
          dataState = {
            ...dataState,
            instructor: null
          }
        }
        setRosatParam(dataState)
      } else {
        setRosatParam({
          ...state,
          [name]: value
        })
      }

    }
  }
  const handleDateChange = (val, name) => {
    const d = val ? moment(val).format('YYYY-MM-DD') : val
    if (name === 'arrival_date') {
      let dataState = {
        ...state,
        [name]: val
      }
      let fromD = moment(dataState.departure_date).format('L')
      if (!moment(dataState.departure_date).isAfter(moment(val).format())) {
        updateDateTime(val, name, d)
      } else {
        setDateState({
          ...dateState,
          [name]: null,
        })
        setRosatParam({
          ...state,
          [name]: '',
        })
      }
    } else {
      updateDateTime(val, name, d)
    }
  }
  const handleTimeChange = (val, name) => {
    if (!val) {
      return;
    }
    const d = momentTz(val).tz('Asia/Kolkata').format('HH:mm:ss')
    updateDateTime(val, name, d)
  }
  const updateDateTime = (val, name, val2) => {
    let dateSet = {
      ...state,
      [name]: val2
    }
    if (dateSet.departure_date && dateSet.departure_time && dateSet.arrival_date && dateSet.arrival_time) {
      let start = moment(dateSet.departure_date + ' ' + dateSet.departure_time).format()
      let end = moment(dateSet.arrival_date + ' ' + dateSet.arrival_time).format()
      let total = moment.duration(moment(end).diff(moment(start)))?._data
      let hours = total?.days > 0 ? (total?.days * 24) + total.hours : total.hours
      setTotalDuration(`${(hours > 1 ? hours + ' Hours ' : hours + ' Hour ')}${(total?.minutes > 1 ? total?.minutes + ' Minutes' : total?.minutes + ' Minute')}`)
      dateSet = {
        ...dateSet,
        total_duration: `${(hours ? (hours > 9 ? hours : '0' + hours) + ':' : '00:')}${(total?.minutes ? (total?.minutes > 9 ? total?.minutes : '0' + total?.minutes) + ':' : '00:')}${(total?.seconds ? (total?.seconds > 9 ? total?.seconds : '0' + total?.seconds) : '00')}`,
      }
    }
    setDateState({
      ...dateState,
      [name]: val,
    })
    setRosatParam(dateSet)
  }
  const handlestudentChange = (e) => {
    const data = JSON.parse(e.target.value)
    setstudentVal(e.target.value)
    setRosatParam({
      ...state,
      [e.target.name]: data?.id,
      egca_id: data.egca_id,
      position_of_student: data?.position ? data?.position : null
    })
  }
  const addExercises = (e, i, name = '') => {
    const { value } = e.target
    let data = [...state.nontech]
    if (data?.length > 0) {
      data?.map((d, index) => {
        if (d['name'] === name) {
          data[index]['marks'] = +value
        } else {
          data.push(
            {
              name: name,
              marks: +value
            }
          )
        }
      })
    } else {
      data.push(
        {
          name: name,
          marks: +value
        }
      )
    }
    data = data.filter((d, index) => d?.marks)
    data = data.filter((value, index) => {
      const _value = JSON.stringify(value);
      return (index === data.findIndex(obj => {
        return JSON.stringify(obj) === _value;
      }));
    })
    setRosatParam({
      ...state,
      nontech: data
    })
  }
  const techChange = (e, i) => {
    let data = [...state.tech]
    data[i] = {
      ...data[i],
      [e.target.name]: +e.target.value
    }
    setRosatParam({
      ...state,
      tech: data
    })
  }
  const testChange = (e) => {
    setRosatParam({
      ...state,
      test: { ...state.test, [e.target.name]: e.target.value }
    })
  }
  const acNameChnage = (e) => {
    const { value } = e.target
    let data = allAirCraft?.excercise_choice?.filter((d) => d.exercise_name.toLowerCase().includes(value.toLowerCase()))
    if (data?.length) {
      setExercisesChoice(data)
      setNoFound('')
    } else {
      setNoFound('No Data Found')
    }
  }
  const onSelect = (obj, i) => {
    techChange({ target: { value: obj.id, name: 'exercise' } }, i)
    setExercisesChoice(allAirCraft?.excercise_choice)
  }
  console.log(studentVal,allAirCraft?.student,'student===');
  return (
    <AppLayout>
      <Container maxWidth="xl">
        {loading ? (
          ''
        ) : (
          <form
            className="roster_form"
            method="POST"
            noValidate
            onSubmit={formValid.handleSubmit}
          >
            <Paper elevation={3} style={{ marginTop: '20px' }}>
              <div
                className={classes.root}
                style={{ padding: '20px 20px 50px', marginBottom: '30px' }}
              >
                <div className="customHeadingMar">
                  <h2>{formType === 'add' ? 'Add' : 'Edit'} Roster</h2>
                  <Divider />
                </div>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6} className="basic field-mb">
                    <FormControl
                      className="form-control"
                      fullWidth
                      error={formValid.errors.student?.length}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Name Of Student
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-controlled-open-select"
                        input={<OutlinedInput label="Name Of Student" />}
                        value={studentVal}
                        disabled={viewOnly}
                        label="Name Of Student"
                        onChange={(e) => handlestudentChange(e)}
                        defaultValue=""
                        name="student"
                        variant="outlined"
                      >
                        {allAirCraft?.student?.map((d, i) => (
                          <MenuItem
                            key={i + d.id}
                            value={
                              role === 1
                                ? d.id
                                : JSON.stringify(d)
                            }
                          >
                            {d?.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {formValid.errors?.student?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.student}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic field-mb">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="eGCA Id"
                      inputProps={{ maxLength: 50 }}
                      error={Boolean(
                        formValid.errors.egca_id && formValid.errors.egca_id,
                      )}
                      margin="normal"
                      disabled
                      value={state.egca_id || ''}
                      fullWidth
                      helperText={
                        formValid.errors.egca_id && formValid.errors.egca_id
                      }
                      name="egca_id"
                      onBlur={formValid.handleBlur}
                      onChange={formValid.handleChange}
                      onKeyUp={handlenameChange}
                      autoComplete="egca_id"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic field-mb">
                    <FormControl
                      className="form-control"
                      fullWidth
                      error={formValid.errors.aircraft?.length}
                    >
                      <InputLabel id="demo-simple-select-label">
                        A/C Registration
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-controlled-open-select"
                        input={<OutlinedInput label="A/C Registration" />}
                        disabled={viewOnly}
                        value={registrationVal}
                        label="A/C Registration"
                        onChange={(e) => handlenameChange(e)}
                        defaultValue=""
                        name="aircraft"
                        variant="outlined"
                      >
                        {allAirCraft?.aircraft?.map((d, i) => (
                          <MenuItem key={i + d.id} value={JSON.stringify(d)}>
                            {d?.registration_number}
                          </MenuItem>
                        ))}
                      </Select>
                      {formValid.errors?.aircraft?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.aircraft}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic field-mb">
                    <FormControl
                      className="form-control"
                      fullWidth
                      error={formValid.errors.position_of_student?.length}
                    >
                      <InputLabel id="demo-simple-select-label">
                        {role == 1 ? 'Position' : 'Designation'}
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        disabled
                        id="demo-controlled-open-select"
                        input={<OutlinedInput label={role == 1 ? 'Position' : 'Designation'} />}
                        value={state.position_of_student}
                        label={role == 1 ? 'Position' : 'Designation'}
                        onChange={(e) => handlenameChange(e)}
                        defaultValue=""
                        name="position_of_student"
                        variant="outlined"
                      >
                        {allAirCraft?.position?.map((d, i) => (
                          <MenuItem key={i + d.id} value={d.id}>
                            {d?.designation_name}
                          </MenuItem>
                        ))}
                      </Select>
                      {formValid.errors?.position_of_student?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.position_of_student}
                        </FormHelperText>
                      )}
                    </FormControl>
                    {/* <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Position of student"
                      inputProps={{ maxLength: 100 }}
                      error={Boolean(
                        formValid.errors.position_of_student &&
                        formValid.errors.position_of_student,
                      )}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.position_of_student &&
                        formValid.errors.position_of_student
                      }
                      name="position_of_student"
                      // value={state.position_of_student}
                      defaultValue={state.position_of_student}
                      onBlur={formValid.handleBlur}
                      onChange={formValid.handleChange}
                      onKeyUp={handlenameChange}
                      autoComplete="position_of_student"
                      variant="outlined"
                    /> */}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic field-mb">
                    <FormControl
                      className="form-control"
                      fullWidth
                      error={formValid.errors.class_of_aircraft?.length}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Class of A/c
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-controlled-open-select"
                        input={<OutlinedInput label="Class of A/c" />}
                        value={state.class_of_aircraft}
                        disabled
                        label="Class of A/c"
                        onChange={handlenameChange}
                        defaultValue=""
                        name="class_of_aircraft"
                        variant="outlined"
                      >
                        {allAirCraft?.class_of_aircraft?.map((d, i) => (
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
                  <Grid item xs={12} sm={6} md={6} className="basic field-mb">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Type Of Aircraft"
                      inputProps={{ maxLength: 100 }}
                      margin="normal"
                      fullWidth
                      name="type_of_aircraft"
                      disabled
                      value={typeOfAircraft || ''}
                      autoComplete="type_of_aircraft"
                      variant="outlined"
                    />
                    {/* <FormControl
                      className="form-control"
                      fullWidth
                      error={formValid.errors.type_of_aircraft?.length}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Type Of Aircraft
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        disabled
                        id="demo-controlled-open-select"
                        input={<OutlinedInput label="Type Of Aircraft" />}
                        value={state.type_of_aircraft}
                        label="Type Of Aircraft"
                        onChange={handlenameChange}
                        defaultValue=""
                        name="type_of_aircraft"
                        variant="outlined"
                      >
                        {allAirCraft?.type_of_aircraft?.map((d, i) => (
                          <MenuItem key={i + d.id} value={d?.id}>
                            {d?.aircraft_type}
                          </MenuItem>
                        ))}
                      </Select>
                      {formValid.errors?.type_of_aircraft?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.type_of_aircraft}
                        </FormHelperText>
                      )}
                    </FormControl> */}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic field-mb">
                    <FormControl
                      className="form-control"
                      fullWidth
                      error={formValid.errors.pilot_function?.length}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Pilot Function
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-controlled-open-select"
                        input={<OutlinedInput label="Pilot Function" />}
                        value={state?.pilot_function}
                        label="Pilot Function"
                        disabled={viewOnly}
                        name="pilot_function"
                        onChange={handlenameChange}
                        defaultValue=""
                        variant="outlined"
                      >
                        {pilotFunc?.map((d, i) => (
                          <MenuItem key={i + d.id} value={d.id}>
                            {d.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {formValid.errors?.pilot_function?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.pilot_function}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic field-mb">
                    {
                      state?.pilot_function?.toString()?.length && pilotFunc?.filter(d => d.id === state?.pilot_function)[0]?.name === "Solo" ?
                        null
                        :
                        <FormControl
                          className="form-control"
                          fullWidth
                          error={formValid.errors.instructor?.length}
                        >
                          <InputLabel id="demo-simple-select-label">
                            Name of Instructor
                          </InputLabel>
                          <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-controlled-open-select"
                            input={<OutlinedInput label="Name of Instructor" />}
                            value={state?.instructor}
                            label="Name of Instructor"
                            onChange={handlenameChange}
                            disabled={viewOnly}
                            defaultValue=""
                            // disabled={role === 2}
                            name="instructor"
                            variant="outlined"
                          >
                            {allAirCraft?.instructor?.map((d, i) => (
                              <MenuItem key={i + d.id} value={d?.id}>
                                {d?.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {formValid.errors?.instructor?.length && (
                            <FormHelperText className="Mui-error">
                              {formValid.errors.instructor}
                            </FormHelperText>
                          )}
                        </FormControl>
                    }
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="basic field-mb">
                    <h3>Take Off</h3>
                    <Grid item xs={12} className="basic field-mb">
                      <TextField
                        className="textfield"
                        id="outlined-basic"
                        label="Take Off Airport"
                        inputProps={{ maxLength: 100 }}
                        error={Boolean(
                          formValid.errors.take_of_airport &&
                          formValid.errors.take_of_airport,
                        )}
                        disabled={viewOnly}
                        margin="normal"
                        fullWidth
                        helperText={
                          formValid.errors.take_of_airport &&
                          formValid.errors.take_of_airport
                        }
                        name="take_of_airport"
                        defaultValue={state.take_of_airport}
                        onBlur={formValid.handleBlur}
                        onChange={formValid.handleChange}
                        onKeyUp={handlenameChange}
                        autoComplete="take_of_airport"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} className="basic date_time">
                      <LocalizationProvider
                        className="form-control"
                        dateAdapter={AdapterDateFns}
                      >
                        <Stack spacing={3} className="datefield">
                          <DesktopDatePicker
                            className="textfield"
                            input={<OutlinedInput label="Departure Date" />}
                            margin="normal"
                            fullWidth
                            label="Departure Date"
                            variant="outlined"
                            inputFormat="MM/dd/yyyy"
                            disabled={viewOnly}
                            value={dateState.departure_date}
                            onChange={(val) =>
                              handleDateChange(val, 'departure_date')
                            }
                            renderInput={(params) => <TextField {...params} name='departure_date' />}
                          />
                        </Stack>
                        {formValid.errors?.departure_date?.length && (
                          <FormHelperText className="Mui-error">
                            {formValid.errors.departure_date}
                          </FormHelperText>
                        )}
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} className="basic field-mb date_time">
                      <LocalizationProvider
                        className="form-control"
                        dateAdapter={AdapterDateFns}
                      >
                        <Stack spacing={3} className="datefield">
                          <TimePicker
                            input={<OutlinedInput label="Departure Time" />}
                            className="textfield"
                            margin="normal"
                            variant="outlined"
                            disabled={viewOnly}
                            ampm={false}
                            label="Departure Time"
                            value={dateState.departure_time}
                            onChange={(val) =>
                              handleTimeChange(val, 'departure_time')
                            }
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                        {formValid.errors?.departure_time?.length && (
                          <FormHelperText className="Mui-error">
                            {formValid.errors.departure_time}
                          </FormHelperText>
                        )}
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} className="basic datefield date_time fob_dep">
                      <TextField
                        className="textfield"
                        id="outlined-basic"
                        label="FOB on departure"
                        inputProps={{ maxLength: 100 }}
                        error={Boolean(
                          formValid.errors.fob_departure &&
                          formValid.errors.fob_departure,
                        )}
                        margin="normal"
                        fullWidth
                        helperText={
                          formValid.errors.fob_departure &&
                          formValid.errors.fob_departure
                        }
                        name="fob_departure"
                        defaultValue={state.fob_departure}
                        onBlur={formValid.handleBlur}
                        disabled={viewOnly}
                        onChange={formValid.handleChange}
                        onKeyUp={handlenameChange}
                        autoComplete="fob_departure"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    className={`basic datefield 
                    `
                    }
                  >
                    {/* ${formType === 'add' ? role === 1 ? 'disableDiv' : '' : ''} */}
                    <h3>Landing</h3>
                    <Grid item xs={12} className="basic field-mb">
                      <TextField
                        className="textfield"
                        id="outlined-basic"
                        label="Route/Overfly"
                        inputProps={{ maxLength: 100 }}
                        error={Boolean(
                          formValid.errors.route && formValid.errors.route,
                        )}
                        margin="normal"
                        fullWidth
                        defaultValue={state.route}
                        helperText={
                          formValid.errors.route && formValid.errors.route
                        }
                        name="route"
                        onBlur={formValid.handleBlur}
                        disabled={viewOnly}
                        onChange={formValid.handleChange}
                        onKeyUp={handlenameChange}
                        autoComplete="route"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} className="basic field-mb">
                      <TextField
                        className="textfield"
                        id="outlined-basic"
                        label="Landing Airport"
                        inputProps={{ maxLength: 100 }}
                        error={Boolean(
                          formValid.errors.landing_airport &&
                          formValid.errors.landing_airport,
                        )}
                        margin="normal"
                        disabled={viewOnly}
                        defaultValue={state.landing_airport}
                        fullWidth
                        helperText={
                          formValid.errors.landing_airport &&
                          formValid.errors.landing_airport
                        }
                        name="landing_airport"
                        onBlur={formValid.handleBlur}
                        onChange={formValid.handleChange}
                        onKeyUp={handlenameChange}
                        autoComplete="landing_airport"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} className="basic field-mb date_time">
                      <LocalizationProvider
                        className="form-control"
                        dateAdapter={AdapterDateFns}
                      >
                        <Stack spacing={3} className="">
                          <DesktopDatePicker
                            className="textfield"
                            input={<OutlinedInput label="Arrival Date" />}
                            margin="normal"
                            fullWidth
                            disabled={viewOnly}
                            label="Arrival Date"
                            variant="outlined"
                            inputFormat="MM/dd/yyyy"
                            value={dateState.arrival_date}
                            onChange={(val) =>
                              handleDateChange(val, 'arrival_date')
                            }
                            renderInput={(params) => <TextField {...params} name='arrival_date' />}
                          />
                        </Stack>
                        {formValid.errors?.arrival_date?.length && (
                          <FormHelperText className="Mui-error">
                            {formValid.errors.arrival_date}
                          </FormHelperText>
                        )}
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} className="basic field-mb date_time">
                      <LocalizationProvider
                        className="form-control"
                        dateAdapter={AdapterDateFns}
                      >
                        <Stack spacing={3} className="datefield">
                          <TimePicker
                            input={<OutlinedInput label="Arrival Time" />}
                            className="textfield"
                            ampm={false}
                            margin="normal"
                            disabled={viewOnly}
                            variant="outlined"
                            label="Arrival Time"
                            value={dateState.arrival_time}
                            onChange={(val) =>
                              handleTimeChange(val, 'arrival_time')
                            }
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                        {formValid.errors?.arrival_time?.length && (
                          <FormHelperText className="Mui-error">
                            {formValid.errors.arrival_time}
                          </FormHelperText>
                        )}
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} className="basic field-mb field-mt">
                      <TextField
                        className="textfield"
                        id="outlined-basic"
                        label="Number of Landings"
                        inputProps={{ maxLength: 100 }}
                        error={Boolean(
                          formValid.errors.number_of_landings &&
                          formValid.errors.number_of_landings,
                        )}
                        margin="normal"
                        fullWidth
                        helperText={
                          formValid.errors.number_of_landings &&
                          formValid.errors.number_of_landings
                        }
                        name="number_of_landings"
                        defaultValue={state.number_of_landings}
                        onBlur={formValid.handleBlur}
                        disabled={viewOnly}
                        onChange={formValid.handleChange}
                        onKeyUp={handlenameChange}
                        autoComplete="number_of_landings"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} className="basic datefield field-mt">
                      <TextField
                        className="textfield"
                        id="outlined-basic"
                        label="FOB on arrival"
                        inputProps={{ maxLength: 100 }}
                        error={Boolean(
                          formValid.errors.fob_on_arrival &&
                          formValid.errors.fob_on_arrival,
                        )}
                        margin="normal"
                        fullWidth
                        helperText={
                          formValid.errors.fob_on_arrival &&
                          formValid.errors.fob_on_arrival
                        }
                        name="fob_on_arrival"
                        defaultValue={state.fob_on_arrival}
                        onBlur={formValid.handleBlur}
                        onChange={formValid.handleChange}
                        disabled={viewOnly}
                        onKeyPress={onKeyPress}
                        onKeyUp={handlenameChange}
                        autoComplete="fob_on_arrival"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    className={`basic instrument datefield`}
                  >
                    <h3>Instrument Time</h3>
                    <Grid item xs={12} className="basic field-mb">
                      <LocalizationProvider
                        className="form-control"
                        dateAdapter={AdapterDateFns}
                      >
                        <Stack spacing={3} className="datefield">
                          <TimePicker
                            input={<OutlinedInput label="Departure Time" />}
                            className="textfield"
                            ampm={false}
                            margin="normal"
                            variant="outlined"
                            disabled={viewOnly}
                            inputProps={{ maxLength: 7 }}
                            label="Simulated"
                            value={dateState.simulated}
                            onChange={(val) => handleTimeChange(val, 'simulated')}
                            renderInput={(params) => <TextField {...params} />}
                          />


                        </Stack>
                        {formValid.errors?.simulated?.length && (
                          <FormHelperText className="Mui-error">
                            {formValid.errors.simulated}
                          </FormHelperText>
                        )}
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} className="basic field-mb">
                      <LocalizationProvider
                        className="form-control"
                        dateAdapter={AdapterDateFns}
                      >
                        <Stack spacing={3} className="datefield">
                          <TimePicker
                            input={<OutlinedInput label="Departure Time" />}
                            className="textfield"
                            ampm={false}
                            margin="normal"
                            variant="outlined"
                            label="Actual"
                            disabled={viewOnly}
                            value={dateState.actual}
                            onChange={(val) => handleTimeChange(val, 'actual')}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                        {formValid.errors?.actual?.length && (
                          <FormHelperText className="Mui-error">
                            {formValid.errors.actual}
                          </FormHelperText>
                        )}
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} className="basic field-mb">
                      <TextField
                        className="textfield"
                        id="outlined-basic"
                        label="Total Distance"
                        inputProps={{ maxLength: 100 }}
                        error={Boolean(
                          formValid.errors.total_distance &&
                          formValid.errors.total_distance,
                        )}
                        margin="normal"
                        fullWidth
                        helperText={
                          formValid.errors.total_distance &&
                          formValid.errors.total_distance
                        }
                        name="total_distance"
                        defaultValue={state.total_distance}
                        disabled={viewOnly}
                        onBlur={formValid.handleBlur}
                        onChange={formValid.handleChange}
                        onKeyUp={handlenameChange}
                        autoComplete="total_distance"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    className={`basic`}
                  >
                    <h3>Shift Time</h3>
                    <Grid item xs={12} className="basic field-mb">
                      <LocalizationProvider
                        className="form-control"
                        dateAdapter={AdapterDateFns}
                      >
                        <Stack spacing={3} className="datefield">
                          <TimePicker
                            input={<OutlinedInput label="Departure Time" />}
                            className="textfield"
                            margin="normal"
                            variant="outlined"
                            disabled={viewOnly}
                            ampm={false}
                            label="Day"
                            value={dateState.day}
                            onChange={(val) => handleTimeChange(val, 'day')}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                        {formValid.errors?.day?.length && (
                          <FormHelperText className="Mui-error">
                            {formValid.errors.day}
                          </FormHelperText>
                        )}
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} className="basic field-mb">
                      <LocalizationProvider
                        className="form-control"
                        dateAdapter={AdapterDateFns}
                      >
                        <Stack spacing={3} className="datefield field-mb">
                          <TimePicker
                            input={<OutlinedInput label="Departure Time" />}
                            className="textfield"
                            margin="normal"
                            ampm={false}
                            variant="outlined"
                            disabled={viewOnly}
                            label="Night"
                            value={dateState.night}
                            onChange={(val) => handleTimeChange(val, 'night')}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                        {formValid.errors?.night?.length && (
                          <FormHelperText className="Mui-error">
                            {formValid.errors.night}
                          </FormHelperText>
                        )}
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} className="basic datefield">
                      <TextField
                        className="textfield"
                        id="outlined-basic"
                        label="Total Duration of Flight"
                        inputProps={{ maxLength: 100 }}
                        error={Boolean(
                          formValid.errors.total_duration &&
                          formValid.errors.total_duration,
                        )}
                        margin="normal"
                        disabled
                        fullWidth
                        helperText={
                          formValid.errors.total_duration &&
                          formValid.errors.total_duration
                        }
                        name="total_duration"
                        value={totalDuration}
                        onBlur={formValid.handleBlur}
                        onChange={formValid.handleChange}
                        onKeyUp={handlenameChange}
                        autoComplete="total_duration"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {role > 1 ? (
                  <div className="type_Of_flight">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={12}>
                        <FormControl className="form-control" fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Type Of Flight
                          </InputLabel>
                          <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-controlled-open-select"
                            value={state.type_of_flight}
                            onChange={(e) => handlenameChange(e)}
                            defaultValue=""
                            disabled={viewOnly}
                            name="type_of_flight"
                            variant="outlined"
                          >
                            {allAirCraft?.type_of_flight?.map((d, i) => (
                              <MenuItem key={i} value={d.id}>
                                {d.flight_type}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <h3>Test</h3>
                        {/* <p>GFT by Night</p> */}
                        {[...Array(1)]?.map((s, i) => (
                          <FormControl className="form-control" fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Test
                            </InputLabel>
                            <Select
                              fullWidth
                              labelId="demo-simple-select-label"
                              id="demo-controlled-open-select"
                              value={
                                state?.test && state?.test[`question${i + 1}`]
                                  ? state?.test[`question${i + 1}`]
                                  : ''
                              }
                              disabled={viewOnly}
                              onChange={testChange}
                              defaultValue=""
                              name={`question${i + 1}`}
                              variant="outlined"
                            >
                              {testRoaster?.map((d, i) => (
                                <MenuItem key={i} value={d}>
                                  {d}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        ))}
                      </Grid>
                      <Grid className="tech_col" item xs={12} sm={4} md={4}>
                        <h3>Tech</h3>
                        <Grid
                          className="m-cus"
                          container
                          spacing={0}
                          alignItems="center"
                        >
                          <Grid className="m-0" item xs={12} sm={6} md={6}>
                            <p className="m-0">Exercises</p>
                          </Grid>
                          <Grid className="m-0" item xs={12} sm={6} md={6}>
                            <p className="m-0">Grade</p>
                          </Grid>
                        </Grid>
                        {[...Array(5)]?.map((s, i) => (
                          <Grid container spacing={0} alignItems="center">
                            <Grid item xs={12} sm={6} md={6}>
                              <SearchSelect
                                className="textfield"
                                id="outlined-basic"
                                label=""
                                noFound={noFound}
                                disabled={viewOnly}
                                name="exercise"
                                onInputChange={acNameChnage}
                                value={state.tech[i]?.exercise}
                                onSelect={(val) => onSelect(val, i)}
                                list={exercisesChoice}
                                variant="outlined"
                                showValue={{ value: 'id', name: 'exercise_name' }}
                              />
                              {/* <FormControl className="form-control" fullWidth>
                                <Select
                                  fullWidth
                                  labelId="demo-simple-select-label"
                                  id="demo-controlled-open-select"
                                  input={<OutlinedInput label="" />}
                                  value={state.tech[i]?.exercise}
                                  label=""
                                  onChange={(e) => techChange(e, i)}
                                  defaultValue=""
                                  name="exercise"
                                  variant="outlined"
                                >
                                  {allAirCraft?.excercise_choice?.map(
                                    (d, i) => (
                                      <MenuItem key={i} value={d.id}>
                                        {d.exercise_name}
                                      </MenuItem>
                                    ),
                                  )}
                                </Select>
                              </FormControl> */}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                              <TextField
                                key={i}
                                className="textfield"
                                id="outlined-basic"
                                label=""
                                inputProps={{ maxLength: 1 }}
                                margin="normal"
                                defaultValue={state.tech[i]?.grade}
                                disabled={viewOnly}
                                fullWidth
                                onKeyPress={(e) => onKeyPress(e, /^[0-5\b]+$/)}
                                name="grade"
                                autoComplete="training_comments"
                                variant="outlined"
                                onChange={(e) => techChange(e, i)}
                              />
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <h3>Non Tech</h3>
                        {nonTech?.map((s, i) => (
                          <Grid
                            container
                            spacing={0}
                            alignItems="center"
                            key={i}
                          >
                            <Grid item xs={12} sm={6} md={6}>
                              <span key={i} className="d-block">
                                {s.name}
                              </span>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                              <TextField
                                className="textfield"
                                id="outlined-basic"
                                label=""
                                inputProps={{ maxLength: 1 }}
                                margin="normal"
                                onKeyPress={(e) => onKeyPress(e, /^[0-5\b]+$/)}
                                disabled={viewOnly}
                                fullWidth
                                defaultValue={
                                  state?.nontech && state?.nontech[i]?.marks
                                }
                                autoComplete="training_comments"
                                variant="outlined"
                                onChange={(e) => addExercises(e, i, s.value)}
                              />
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className="basic field-mb">
                      <FormControl className="form-control" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Result
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-label"
                          id="demo-controlled-open-select"
                          input={<OutlinedInput label="" />}
                          value={state.result}
                          disabled={viewOnly}
                          label=""
                          onChange={handlenameChange}
                          defaultValue=""
                          name="result"
                          variant="outlined"
                        >
                          <MenuItem value=""></MenuItem>
                          <MenuItem value="satisfactory">Satisfactory</MenuItem>
                          <MenuItem value="additional_training_required">Additional Training Required</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} className="basic field-mb">
                      <TextField
                        className="textfield"
                        id="outlined-basic"
                        label="Training Comments"
                        inputProps={{ maxLength: 50 }}
                        error={Boolean(
                          formValid.errors.training_comments &&
                          formValid.errors.training_comments,
                        )}
                        margin="normal"
                        fullWidth
                        helperText={
                          formValid.errors.training_comments &&
                          formValid.errors.training_comments
                        }
                        name="training_comments"
                        onBlur={formValid.handleBlur}
                        disabled={viewOnly}
                        onChange={formValid.handleChange}
                        defaultValue={state.training_comments}
                        onKeyUp={handlenameChange}
                        autoComplete="training_comments"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} className="basic field-mb">
                      <FormControl
                        className="form-control"
                        fullWidth
                        error={formValid.errors.accident?.length}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Accident/Incident
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-label"
                          id="demo-controlled-open-select"
                          input={<OutlinedInput label="accident" />}
                          value={state.accident}
                          disabled={viewOnly}
                          label="accident"
                          onChange={(e) => handlenameChange(e)}
                          defaultValue=""
                          name="accident"
                          variant="outlined"
                        >
                          <MenuItem value={true}>yes</MenuItem>
                          <MenuItem value={false}>No</MenuItem>
                        </Select>
                        {formValid.errors?.accident?.length && (
                          <FormHelperText className="Mui-error">
                            {formValid.errors.accident}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    {state.accident ? (
                      <Grid item xs={12} className="basic field-mb">
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          label="Accident/Incident Comments"
                          disabled={viewOnly}
                          inputProps={{ maxLength: 50 }}
                          error={Boolean(
                            formValid.errors.accident_comment &&
                            formValid.errors.accident_comment,
                          )}
                          margin="normal"
                          fullWidth
                          helperText={
                            formValid.errors.accident_comment &&
                            formValid.errors.accident_comment
                          }
                          name="accident_comment"
                          defaultValue={state.accident_comment}
                          onBlur={formValid.handleBlur}
                          onChange={formValid.handleChange}
                          onKeyUp={handlenameChange}
                          autoComplete="accident_comment"
                          variant="outlined"
                        />
                      </Grid>
                    ) : null}
                    <Grid item xs={12} className="basic field-mb">
                      <FormControl
                        className="form-control"
                        fullWidth
                        error={formValid.errors.ac_defects?.length}
                      >
                        <InputLabel id="demo-simple-select-label">
                          A/c Defects
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-label"
                          id="demo-controlled-open-select"
                          disabled={viewOnly}
                          input={<OutlinedInput label="A/c Defects" />}
                          value={state.ac_defects}
                          label="ac_defects"
                          onChange={(e) => handlenameChange(e)}
                          defaultValue=""
                          name="ac_defects"
                          variant="outlined"
                        >
                          <MenuItem value={true}>yes</MenuItem>
                          <MenuItem value={false}>No</MenuItem>
                        </Select>
                        {formValid.errors?.ac_defects?.length && (
                          <FormHelperText className="Mui-error">
                            {formValid.errors.ac_defects}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    {state.ac_defects ? (
                      <Grid item xs={12} className="basic field-mb">
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          label="A/c Defects"
                          disabled={viewOnly}
                          inputProps={{ maxLength: 50 }}
                          error={Boolean(
                            formValid.errors.ac_defects_comments &&
                            formValid.errors.ac_defects_comments,
                          )}
                          margin="normal"
                          fullWidth
                          helperText={
                            formValid.errors.ac_defects_comments &&
                            formValid.errors.ac_defects_comments
                          }
                          name="ac_defects_comments"
                          defaultValue={state.ac_defects_comments}
                          onBlur={formValid.handleBlur}
                          onChange={formValid.handleChange}
                          onKeyUp={handlenameChange}
                          autoComplete="ac_defects_comments"
                          variant="outlined"
                        />
                      </Grid>
                    ) : null}
                    <Grid item xs={12} className="basic field-mb">
                      <FormControl
                        className="form-control"
                        fullWidth
                        error={formValid.errors.any_info?.length}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Any Other Information
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-label"
                          id="demo-controlled-open-select"
                          input={<OutlinedInput label="A/c Defects" />}
                          disabled={viewOnly}
                          value={state.any_info}
                          label="any_info"
                          onChange={(e) => handlenameChange(e)}
                          defaultValue=""
                          name="any_info"
                          variant="outlined"
                        >
                          <MenuItem value={true}>yes</MenuItem>
                          <MenuItem value={false}>No</MenuItem>
                        </Select>
                        {formValid.errors?.any_info?.length && (
                          <FormHelperText className="Mui-error">
                            {formValid.errors.any_info}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    {state.any_info ? (
                      <Grid item xs={12} className="basic field-mb">
                        <TextField
                          className="textfield"
                          id="outlined-basic"
                          label="Any Other Information Comment"
                          inputProps={{ maxLength: 50 }}
                          error={Boolean(
                            formValid.errors.any_info_comments &&
                            formValid.errors.any_info_comments,
                          )}
                          disabled={viewOnly}
                          margin="normal"
                          fullWidth
                          helperText={
                            formValid.errors.any_info_comments &&
                            formValid.errors.any_info_comments
                          }
                          defaultValue={state.any_info_comments}
                          name="any_info_comments"
                          onBlur={formValid.handleBlur}
                          onChange={formValid.handleChange}
                          onKeyUp={handlenameChange}
                          autoComplete="any_info_comments"
                          variant="outlined"
                        />
                      </Grid>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </Paper>
            <Stack
              spacing={2}
              direction="row"
              className="buttonss"
              style={{ justifyContent: 'right' }}
            >
              <Button
                variant="contained"
                type="button"
                className="save"
                onClick={() => props.history.goBack()}
              >
                Back
              </Button>
              {
                viewOnly ?
                  null
                  :
                  formType !== 'add' ? (
                    <>
                      {
                        role > 1 ?
                          <>

                            <Button
                              variant="contained"
                              type="submit"
                              className="save"
                              disabled={btnLoader}
                              onClick={() => setStatus('accept')}
                            >
                              {'Accept'}
                            </Button>
                            <Button
                              variant="contained"
                              type="submit"
                              className="save"
                              disabled={btnLoader}
                              onClick={() => setStatus('reject')}
                            >
                              {'Reject'}
                            </Button>
                          </>
                          : null
                      }
                      <Button
                        variant="contained"
                        type="submit"
                        className="save"
                        disabled={btnLoader}
                        onClick={() => setStatus('normal')}
                      >
                        {'Update'}
                      </Button>
                    </>
                  ) : (
                    <ButtonLoader
                      type="submit"
                      className="save"
                      variant="contained"
                      onClick={() => setStatus('normal')}
                      loader={btnLoader}
                      title='Submit'
                    />
                    // <Button
                    //   variant="contained"
                    //   type="submit"
                    //   className="save"
                    //   disabled={btnLoader}
                    // >
                    //   {'Submit'}
                    // </Button>
                  )

              }
              {/* <Button variant="contained" type="submit" className="save" disabled={btnLoader}>
              { 'Submit'}
            </Button>} */}
            </Stack>
          </form>
        )}
      </Container>
    </AppLayout>
  );
}
export default withContext(AddRoaster)
