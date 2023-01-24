import { React, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Container from '@material-ui/core/Container'
import { Button } from '@material-ui/core'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import * as yup from 'yup'
import { useHistory } from 'react-router'
import swal from 'sweetalert'
import Stack from '@mui/material/Stack'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Divider from '@mui/material/Divider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import AppLayout from '../../../../layout/appLayout'
import ProfileHead from '../../ProfileHead'
import Fetch from '../../../../common/fetch'
import { FormC } from '../../../../common/validation'
import { FormHelperText } from '@mui/material'
import { withContext } from '../../../../context/appContext'
import moment from 'moment'
import { Link } from "react-router-dom";
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
function AddUser(props) {
  const { history } = props
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [date, setDate] = useState({
    from_date: null,
    to_date: null
  })
  const [goNext, setGoNext] = useState(false)
  const [id, setId] = useState('')
  const [loader, setLoader] = useState(true)
  const [state, setState] = useState({
    college: '',
    university: '',
    qualification: '',
    course_type: '',
    duration_of_course: '',
    from_date: '',
    to_date: '',
  })
  useEffect(() => {
    document.title = 'Qualification'
    Fetch('accounts/user-qualification/').then(d => {
      if (d?.status) {
        const { data } = d
        setDate({
          from_date: data.from_date ? moment(data.from_date).format('llll') : null,
          to_date: data.to_date ? moment(data.to_date).format('llll') : null
        })
        setState({
          college: data.college ? data.college : '',
          university: data.university ? data.university : '',
          qualification: data.qualification ? data.qualification : '',
          duration_of_course_year: durationOfCourse(data.from_date, data.to_date),
          course_type: data.course_type ? data.course_type : '',
          duration_of_course: data.duration_of_course ? data.duration_of_course : '',
          from_date: data.from_date ? data.from_date : '',
          to_date: data.to_date ? data.to_date : '',
        })
        setLoader(false)
      } else {
        setLoader(false)
      }
    })
    setId(props.context.userProfile?.user_qualification_id)
  }, [])
  const formateDate = (date) => {
    let month = date.getMonth()
    let year = date.getUTCFullYear()
    let d = date.getDate()
    //let fulldate =d+'-'+month+"-"+year
    let fulldate = year + '-' + month + '-' + d

    return fulldate
  }

  const durationOfCourse = (from, to) => {
    let start = moment(from).format()
    let end = moment(to).format()
    let total = moment.duration(moment(end).diff(moment(start)))?._data
    const year = total?.years ? total?.years > 1 ? total?.years + ' Years' : total?.years + ' Year' : ''
    return year
  }
  const onSubmit = (e) => {
    let dState = { ...state }
    delete dState.duration_of_course
    Fetch(`accounts/user-qualification/${id}/`, dState, { method: 'patch' }).then(d => {
      if (d?.status) {
        swal("Educational Qualifications Updated.", "", "success", {
          button: "OK",
        }).then(d => {
          if (goNext) {
            history.push('/user-profile/licenses')
          }
        });;
      }
    })
  }
  const formValid = FormC({ values: state, onSubmit, removeValidValue: ['duration_of_course_year'] })
  const onChangeDate = (val, name) => {
    formValid.handleNewError({})
    const param = {
      ...state,
      [name]: moment(val).format('YYYY-MM-DD'),
    }
    let a = moment(param.from_date)
    let b = moment(param.to_date)
      if (name === 'to_date' && b.diff(a, 'year') >= 1) {
        formValid.handleNewError({})
        setDate({ ...date, [name]: val })
        setState({ ...param, duration_of_course_year: durationOfCourse(param.from_date, param.to_date) })
      } else if (name === 'from_date') {
        setDate({ ...date, [name]: val })
        setState({ ...param, duration_of_course_year: durationOfCourse(param.from_date, param.to_date) })
      } else {
      formValid.handleNewError({ from_date: 'Minimum duration of the course should be 1 year.' })
    }
  }
  const onChange = (e) => {
    setState({
      ...state,
      [e.target?.name]: e.target.value,
    })
    formValid.handleChange(e)
  }
  const classes = useStyles()
  return (
    <AppLayout>
      <ProfileHead />
      <Container maxWidth="xl">
        {!loader ? <form onSubmit={formValid.handleSubmit}>
          <Paper elevation={3} style={{ marginTop: '20px' }}>
            <div
              className={classes.root}
              style={{ padding: '20px 20px 50px', marginBottom: '65px' }}
            >
              <div className="customHeadingMar">
                <h2>Educational Qualification (Highest Degree)</h2>
                <Divider />
              </div>

              <Grid className="educ_col" container spacing={2}>
                <Grid item xs={12} sm={12} md={5}>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="College/School Name"
                      inputProps={{ maxLength: 100 }}
                      error={Boolean(formValid.errors.college)}
                      margin="normal"
                      fullWidth
                      helperText={formValid.errors.college}
                      name="college"
                      defaultValue={state.college}
                      onBlur={formValid.handleBlur}
                      onChange={onChange}
                      autoComplete="college"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="University/Board Name"
                      inputProps={{ maxLength: 100 }}
                      error={Boolean(formValid.errors.university)}
                      margin="normal"
                      defaultValue={state.university}
                      fullWidth
                      helperText={formValid.errors.university}
                      name="university"
                      onBlur={formValid.handleBlur}
                      onChange={onChange}
                      autoComplete="university"
                      variant="outlined"
                    />
                  </Grid>

                  {/* <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Qualification"
                      inputProps={{ maxLength: 100 }}
                      error={Boolean(formValid.errors.qualification)}
                      defaultValue={state.qualification}
                      margin="normal"
                      fullWidth
                      helperText={formValid.errors.qualification}
                      name="qualification"
                      onBlur={formValid.handleBlur}
                      onChange={onChange}
                      autoComplete="qualification"
                      variant="outlined"
                    />
                  </Grid> */}

                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <FormControl
                      className="form-control"
                      fullWidth
                      error={formValid.errors?.course_type?.length}
                    >
                      <InputLabel id="course-simple-select-label">
                        Course Type
                      </InputLabel>
                      <Select
                        labelId="course-simple-select-label"
                        id="course-multiple-name"
                        value={state.course_type}
                        name="course_type"
                        label="Course Type"
                        variant="outlined"
                        onChange={onChange}
                      >
                        <MenuItem value='regular'>Regular</MenuItem>
                        <MenuItem value='distant'>Distant</MenuItem>
                      </Select>
                      {formValid.errors?.course?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.course}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <FormControl
                      className="form-control"
                      fullWidth
                      error={formValid.errors?.duration_of_course?.length}
                    >
                      <InputLabel id="Degree-simple-select-label">
                        Degree
                      </InputLabel>
                      <Select
                        labelId="Degree-simple-select-label"
                        id="Degree-multiple-name"
                        value={state.duration_of_course}
                        name="duration_of_course"
                        label="Course Type"
                        // defaultValue="BBA"
                        variant="outlined"
                        onChange={onChange}
                      >
                        <MenuItem value='graduate'>Graduate</MenuItem>
                        <MenuItem value='post_graduate'>Post Graduate</MenuItem>
                        <MenuItem value='secondary'>Secondary (10th)</MenuItem>
                        <MenuItem value='senior_secondary'>Senior Secondary (12th)</MenuItem>
                      </Select>
                      {formValid.errors?.duration_of_course?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.duration_of_course}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid className="chooseDate" container spacing={2}>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                    >
                      <h3 style={{ marginBottom: '0' }}>Duration of the Course</h3>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      className="basic custom-basic"
                    >
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack className="datefield" spacing={2}>
                          <DesktopDatePicker
                            label="From"
                            fullWidth
                            variant="outlined"
                            inputFormat="MM/dd/yyyy"
                            value={date.from_date}
                            onChange={(val) => onChangeDate(val, 'from_date')}
                            renderInput={(params) => <TextField {...params} name='from_date' />}
                          />
                        </Stack>
                        {formValid.errors?.from_date?.length && (
                          <FormHelperText className="Mui-error">
                            {formValid.errors.from_date}
                          </FormHelperText>
                        )}
                      </LocalizationProvider>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      className="basic"
                    >
                      <LocalizationProvider className="form-control" dateAdapter={AdapterDateFns}>
                        <Stack className="datefield" spacing={2}>
                          <DesktopDatePicker
                            label="To"
                            fullWidth
                            variant="outlined"
                            inputFormat="MM/dd/yyyy"
                            value={date.to_date}
                            onChange={(val) => onChangeDate(val, 'to_date')}
                            renderInput={(params) => <TextField {...params} name='to_date' />}
                          />
                        </Stack>
                        {formValid.errors?.to_date?.length && (
                          <FormHelperText className="Mui-error">
                            {formValid.errors.to_date}
                          </FormHelperText>
                        )}
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className="basic custom-basic" style={{ margin: '0' }}>
                      <TextField
                        className="textfield"
                        id="outlined-basic"
                        label="Duration of course"
                        inputProps={{ maxLength: 100 }}
                        value={state.duration_of_course_year}
                        margin="normal"
                        fullWidth
                        disabled
                        autoComplete="duration_of_course_year"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className="basic custom-basic" style={{ margin: '0' }}>
                      <TextField
                        className="textfield"
                        id="outlined-basic"
                        label="Qualification"
                        inputProps={{ maxLength: 100 }}
                        error={Boolean(formValid.errors.qualification)}
                        defaultValue={state.qualification}
                        margin="normal"
                        fullWidth
                        helperText={formValid.errors.qualification}
                        name="qualification"
                        onBlur={formValid.handleBlur}
                        onChange={onChange}
                        autoComplete="qualification"
                        variant="outlined"
                      />
                    </Grid>
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
            <Link to={`/user-profile`} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                type="button"
                className="save"
                onClick={() => { }}
              >
                Back
              </Button>
            </Link>
            <Button variant="contained" type="submit" className="save" onClick={() => setGoNext(true)}>
              Save & Next
            </Button>
            <Button variant="contained" type="submit" className="save">
              Submit
            </Button>
          </Stack>
        </form> : null}
      </Container>
    </AppLayout>
  )
}
export default withContext(AddUser)