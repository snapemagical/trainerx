import react, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { InputLabel, TextField, Grid, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import AppLayout from '../../../layout/appLayout';
const validationSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email.")
      .required("Email is required."),
    password: yup.string().required("Password is required."),
    username: yup.string().required("Username is required.")
  });

const AddEditUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);  
    const [isLoading, setIsLoading] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    useEffect(()=>{
        console.log(location.state.userId);
        setUserDetails({institute_id: location.state.userId, ...userDetails});        
        console.log(userDetails);
    },[]);

    const handleFieldChange = (e) => {
        let fieldval = e.target.value;
        let fieldName = e.target.name;
        let details = {};
        details[fieldName] = fieldval;
        if(fieldval) {
            setUserDetails({...details, ...userDetails});
        }
        console.log(userDetails);
      };  
      const baseURL = process.env.REACT_APP_API_ENDPOINT;
      const token = localStorage.getItem('token');
      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      };
      
      const onSubmit = (e) => {
        setIsLoading(true);
        axios
          .post(baseURL + `accounts/admin-signup/`, userDetails, axiosConfig)
          .then((response) => {        
            setIsLoading(false);
            if(response.status) {
              console.log(response);
              navigate("/dashboard");
              swal("User successfully added.", "", "success", {
                button: "OK",
              });
            }
          })
          .catch((error) => {
            if (error.response) {
              setMessage(error.response.data.email[0], "hello11111");
              // Request made and server responded
            }
          });
      };
      
    const formik = useFormik({
      initialValues: { email: "", password: "", username: "" },
      validateOnBlur: true,
      onSubmit,
      validationSchema: validationSchema,
    });
    return (  
        <AppLayout>
          <h1>Add User</h1>
          <Grid container>       
            <Grid
             item
             md={6}
              style={{ marginTop: "auto", marginBottom: "auto", width: "100%" }}
            >   
              <form
                className="form"
                method="POST"
                noValidate
                onSubmit={formik.handleSubmit}
              >                
              <Grid container spacing={{ xs: 2, md: 3 }}>
                  <Grid
                  item
                    style={{ marginTop: "auto", marginBottom: "auto", width: "100%" }}
                  >   
                      <InputLabel
                        className="InputLabel"
                        style={{
                          display: "flex",
                          fontSize: "1rem",
                          letterSpacing: "1px",
                          marginTop: "10px",
                          marginBottom: '-1rem',
                          textTransform: 'capitalize'
                        }}
                      >
                        Email
                      </InputLabel>
                      <TextField
                        error={Boolean(
                          formik.touched.email && formik.errors.email
                        )}
                        fullWidth
                        helperText={
                          formik.touched.email && formik.errors.email
                        }
                        margin="normal"
                        name="email"
                        variant="outlined"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        onKeyUp={handleFieldChange}
                        type="text"
                        value={formik.values.email}
                        size="small"
                        style={{ color: "#fff" }}
                      />
                      </Grid>
                  <Grid
                  item
                    style={{ marginTop: "auto", marginBottom: "auto", width: "100%" }}
                  >   
                    <InputLabel
                    className="InputLabel"                    
                    style={{
                        display: "flex",
                        fontSize: "1rem",
                        letterSpacing: "1px",
                        marginTop: "10px",
                        marginBottom: '-1rem',
                        textTransform: 'capitalize'
                      }}
                    >
                    Username
                    </InputLabel>
                    <TextField
                    // inputProps={{ maxLength: 30 }}
                    error={Boolean(
                        formik.touched.username && formik.errors.username
                    )}
                    fullWidth
                    helperText={
                        formik.touched.username && formik.errors.username
                    }
                    margin="normal"
                    name="username"
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    onKeyUp={handleFieldChange}
                    type="text"
                    value={formik.values.username}
                    size="small"
                    />
                      </Grid>
                  <Grid
                  item
                    style={{ marginTop: "auto", marginBottom: "auto", width: "100%" }}
                  >   
                      <InputLabel
                        className="InputLabel"
                        style={{
                          display: "flex",
                          fontSize: "1rem",
                          letterSpacing: "1px",
                          marginTop: "10px",
                          marginBottom: '-1rem',
                          textTransform: 'capitalize'
                        }}
                      >
                        Password
                      </InputLabel>
                      <TextField
                          inputProps={{ maxLength: 30 }}
                          error={Boolean(
                            formik.touched.password && formik.errors.password
                          )}
                          fullWidth
                          helperText={
                            formik.touched.password && formik.errors.password
                          }
                          margin="normal"
                          name="password"
                          variant="outlined"
                          className="form-control"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          onKeyUp={handleFieldChange}
                          type={showPassword ? "text" : "password"}
                          value={formik.values.password}
                          style={{ color: "#fff" }}
                          size="small"
                          InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                </Grid>
                <Grid container>
                    <Grid item>
                        <Button variant="contained" type="submit">
                            Add User
                        </Button>
                    </Grid>
                </Grid>
              </form>          
              </Grid>
            </Grid>
        </AppLayout>
    )
}
export default AddEditUser;