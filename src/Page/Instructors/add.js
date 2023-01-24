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
import ButtonLoader from '../../component/button'
import { makeStyles } from '@material-ui/core/styles'
import { FormC } from '../../common/validation'
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import { useEffect, useState } from 'react'
import NewProfileAdd from '../../component/newProfileAdd'
import Fetch from '../../common/fetch';
import swal from 'sweetalert';
import { withContext } from '../../context/appContext';
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
function AddInstructors(props) {
  const {context,match} = props
  const classes = useStyles()
  const [btnLoader, setbtnLoader] = useState(false)
  const [formType,setFromType]=useState('')
  const [loader,setLoader] = useState(true)
  const [state, setState] = useState({
    first_name: '',
    last_name: "",
    email: "",
    phone_no: "",
    password: "",
    designation:'',
    secret_token: "",
    confirm_password:''
  })
  const [status, setStatus] = useState('')

  useEffect(()=>{
    const {params} = match
    const instructor = context?.license?.instructor
    setFromType(params?.id)
    if(params?.id !== 'add'){
      let data = instructor?.filter(d=>d.id === +params?.id)[0]
      setState({
        ...state,
        first_name: data?.profile?.first_name,
        last_name: data?.profile?.last_name,
        email: data?.email,
        phone_no: data?.phone_no,
        designation:data?.profile.designation
      })
      setLoader(false)
    }else{
      setLoader(false)
    Fetch('accounts/get-roles').then(d=>{
      if(d?.status){
        let token= ''
        d.data.map(d=>{
          if(d.label === 'instructor'){
            token=d.encrypted
          }
        })
        setState({
          ...state,
          secret_token:token
        })
      }
    })
  }
  },[context.license])
  const onSubmit = () => {
    setbtnLoader(true)
    Fetch(`accounts/user-invite/${formType === 'add'?'':formType+'/'}`,{
      profile:{
        first_name: state.first_name,
        last_name: state.last_name,
        designation:state.designation
      },
      email: state.email,
      phone_no: state.phone_no,
      password: state.password,
      secret_token: state.secret_token
    },{method:formType === 'add'?'post':'put'}).then(d=>{
      if(d.status){
        swal(`${formType === 'add' ? 'New Instructors Add':'Instructors Update'} Successfully`, "", "success", {
          button: "ok",
        }).then(d=>{
          props.history.goBack()
        });
      }
    })
  }
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  const value = formType==='add'?[]:['password','confirm_password','secret_token']
  const formValid = FormC({ values: state, onSubmit,removeValidValue:value })
  return (
    <AppLayout>
      <Container maxWidth="xl">
        <form method="POST" noValidate onSubmit={formValid.handleSubmit}>
          <Paper elevation={3} style={{ marginTop: '20px' }}>
            <div
              className={classes.root}
              style={{ padding: '20px 20px 50px', marginBottom: '30px' }}
            >
              <div className="customHeadingMar">
                <h2>{formType === 'add' ?'Add':'Edit'} Instructors</h2>
                <Divider />
              </div>
              {!loader?<NewProfileAdd instructor={true} formType={formType} formValid={formValid} state={state} onChange={onChange} />:null}
            </div>
          </Paper>
          <Stack
            spacing={2}
            direction="row"
            className="buttonss"
            style={{ justifyContent: "right" }}
          >
              <Button
                variant="contained"
                type="button"
                className="save"
                onClick={()=>props.history.goBack()}
              >
                Back
              </Button>
              <ButtonLoader
                  type="submit"
                  className="save"
                  variant="contained"
                  onClick={() => setStatus('normal')}
                  loader={btnLoader}
                  title='Submit'
                />
            {/* <Button variant="contained" type="submit" className="save" disabled={btnLoader}>
              {'Submit'}
            </Button> */}
          </Stack>
        </form>
      </Container>
    </AppLayout>
  )
}
export default withContext(AddInstructors)
