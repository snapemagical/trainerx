import { React, useState } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Divider from '@mui/material/Divider'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import Stack from '@mui/material/Stack'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import * as yup from 'yup'
import swal from 'sweetalert'
import { useHistory, useParams } from 'react-router-dom'
import AppLayout from '../../../../layout/appLayout'
import ProfileHead from '../../ProfileHead'
import Fetch from '../../../../common/fetch'
import { FormC } from '../../../../common/validation'
import { Link } from "react-router-dom";
import {withContext} from '../../../../context/appContext'
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

function BasicSelect({history,context}) {
  useEffect(() => {
    document.title = 'Emergency'
    loadUser()
  }, [])
  const { id } = useParams()
  const [goNext,setGoNext] = useState(false)
  const [user, setUser] = useState('')
  const [state, setState] = useState({
    relation: '',
    full_name: '',
    contact: '',
  })
  const formValid = FormC({values:state,removeValidValue:['relation']})
  useEffect(()=>{
    setUser(context?.userProfile.user_emergency_id)
  },[context?.userProfile])
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
    formValid.handleChange(e)
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    Fetch(`accounts/user_emergency/${user}/`, state, {
      method: 'patch',
    }).then((d) => {
      if (d.status) {
        swal('Emergency Details Edited Successfully.', '', 'success', {
          button: 'OK',
        }).then(d=>{
          if(goNext){
            history.push('/user-profile/qualification')
          }
        });
      }
    })
  }
  const loadUser = async () => {
    Fetch('accounts/user_emergency/').then((d) => {
      if (d?.status) {
        const {data} = d
        setState({
          relation: data.relation?data.relation:'',
          full_name: data.full_name?data.full_name:'',
          contact: data.contact?data.contact:'',
        })
      }
    })
  }
  const classes = useStyles()
  return (
    <AppLayout>
      <ProfileHead />
      <Container maxWidth="xl">
        <form method="POST" noValidate onSubmit={onSubmit}>
          <Paper elevation={3} style={{ marginTop: '20px' }}>
            <div
              className={classes.root}
              style={{ padding: '20px 20px 50px', marginBottom: '65px' }}
            >
              
              <div className="customHeadingMar">
                <h2>Emergency Details</h2>
                <Divider />
              </div>
              <Grid className="form-mt" container spacing={2}>
                <Grid item xs={12} sm={12} md={5}>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      className="textfield"
                      id="outlined-basic"
                      label="Full Name"
                      inputProps={{ maxLength: 50 }}
                      error={Boolean(
                        formValid.errors.full_name && formValid.errors.full_name,
                      )}
                      margin="normal"
                      fullWidth
                      helperText={
                        formValid.errors.full_name && formValid.errors.full_name
                      }
                      name="full_name"
                      onBlur={formValid.handleBlur}
                      onChange={onChange}
                      // onKeyUp={onChange}
                      autoComplete="full_name"
                      variant="outlined"
                      value={state?.full_name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Relation
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={state?.relation.toLowerCase()}
                          label="Relation"
                          
                          name="relation"
                          onChange={onChange}
                          //value={user.relation?.length > 1 && user.relation || 'none'}
                        >
                          <MenuItem value="father" className='form-control-select'>Father</MenuItem>
                          <MenuItem value="mother" className='form-control-select'>Mother</MenuItem>{' '}
                          <MenuItem value="sister" className='form-control-select'>Sister</MenuItem>
                          <MenuItem value="brother" className='form-control-select'>Brother</MenuItem>
                          <MenuItem value="spouse" className='form-control-select'>Spouse</MenuItem>
                          <MenuItem value="guardian" className='form-control-select'>Guardian</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} className="basic">
                    <TextField
                      inputProps={{ maxLength: 10 }}
                      error={Boolean(
                        formValid.errors.contact && formValid.errors.contact,
                      )}
                      margin="normal"
                      className="textfield"
                      id="outlined-basic"
                      label="Contact No"
                      fullWidth
                      helperText={formValid.errors.contact && formValid.errors.contact}
                      onBlur={formValid.handleBlur}
                      onChange={onChange}
                      // onKeyUp={onChange}
                      name="contact"
                      autoComplete="number"
                      variant="outlined"
                      value={state?.contact}
                    />
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
                onClick={() => {}}
              >
                Back
              </Button>
            </Link>
            <Button variant="contained" type="submit" className="save" onClick={()=>setGoNext(true)}>
              Save & Next
            </Button>
            <Button variant="contained" type="submit" className="save">
            Submit
            </Button>
          </Stack>
        </form>
      </Container>
    </AppLayout>
  )
}
export default withContext(BasicSelect)