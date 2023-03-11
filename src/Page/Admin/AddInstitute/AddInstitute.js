import { React, useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { InputLabel, TextField, Grid, Button } from '@mui/material';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import AppLayout from '../../../layout/appLayout';
const validationSchema = yup.object({
  name: yup
    .string()
    .required("Institute name is required."),
});

function AddInstitute() {
  const navigate = useNavigate(); 
  const [message, setMessage] = useState(null);  
  const [isLoading, setIsLoading] = useState(false);
  const [instituteDetails, setinstituteDetails] = useState({});
  useEffect(() => {
    document.title = "Add Institue";
  }, []);

  const handleFieldChange = (e) => {
    let fieldName = e.target.name;
    let details = {};
    details[fieldName] = formik.values[fieldName];
    console.log(details[fieldName]);
    setinstituteDetails({...details, ...instituteDetails});

    // setState({email: e.target.value});
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
      .post(baseURL + `accounts/institute/add-institute/`, formik.values, axiosConfig)
      .then((response) => {        
        setIsLoading(false);
        if(response.status) {
          console.log(response.data);
          let userId = response.data.response.id;
          console.log(userId);
          navigate("/add-user", { state : {userId} });
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
    initialValues: {
      name: "",
      company_website: "",
      brand_name: "",
      registered_address: "",
      company_pan: "",
      company_tan: "",
      company_gstin: ""
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (    
    <AppLayout>
      <h1>Add Institue</h1>
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
              md={6}
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
                    Name
                  </InputLabel>
                  <TextField
                    error={Boolean(
                      formik.touched.name && formik.errors.name
                    )}
                    fullWidth
                    helperText={
                      formik.touched.name && formik.errors.name
                    }
                    margin="normal"
                    name="name"
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    onKeyUp={handleFieldChange}
                    type="text"
                    value={formik.values.name}
                    size="small"
                    style={{ color: "#fff" }}
                  />
                  </Grid>
              <Grid
              item
              md={6}
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
                    Company website
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    name="company_website"
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    onKeyUp={handleFieldChange}
                    type="text"
                    value={formik.values.company_website}
                    style={{ color: "#fff" }}
                  />
                  </Grid>
              <Grid
              item
              md={6}
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
                    Brand name
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    name="brand_name"
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    onKeyUp={handleFieldChange}
                    type="text"
                    value={formik.values.brand_name}
                    style={{ color: "#fff" }}
                  />
                  </Grid>
              <Grid
              item
              md={6}
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
                    Address
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    name="registered_address"
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    onKeyUp={handleFieldChange}
                    type="text"
                    value={formik.values.registered_address}
                    style={{ color: "#fff" }}
                  />
                  </Grid>
              <Grid
              item
              md={6}
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
                    Company PAN
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    name="company_pan"
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    onKeyUp={handleFieldChange}
                    type="text"
                    value={formik.values.company_pan}
                    style={{ color: "#fff" }}
                  />
                  </Grid>
              <Grid
              item
              md={6}
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
                    Company TAN
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    name="company_tan"
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    onKeyUp={handleFieldChange}
                    type="text"
                    value={formik.values.company_tan}
                    style={{ color: "#fff" }}
                  />
                  </Grid>
              <Grid
              item
              md={6}
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
                    Company GSTIN
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    name="company_gstin"
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    onKeyUp={handleFieldChange}
                    type="text"
                    value={formik.values.company_gstin}
                    style={{ color: "#fff" }}
                  />
                  </Grid>
            </Grid>
            
            <Button variant="contained" type="submit">
              Add Institute
            </Button>
            
            <Button variant="contained" style={{ marginLeft: '1rem' }} onClick={()=> navigate('/dashboard')}>
              Cancel
            </Button>
          </form>          
          </Grid>
        </Grid>
    </AppLayout>
  )
}

export default AddInstitute;