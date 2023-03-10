import { React, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Fetch from "../../common/fetch";
import { styled } from '@mui/system';
import { Box, Grid, Paper, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import "../Admin/InstituteListPage.css";

const InstituteList = () => {
  const navigate = useNavigate();
  const [instituteList, setInstituteList] = useState([]);
  useEffect(()=>{
    Fetch('accounts/institute/institute-list').then(response => {
        const { results } = response.data;
        setInstituteList(results);
    });
},[])

  return (
      <Box sx={{ flexGrow: 1 }} >
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>          
          <Grid item xs={2} sm={4} md={8}>
            <h2>Institute List:</h2>
          </Grid>          
          <Grid item className="top-action-col" xs={2} sm={4} md={4}>
            <Button variant="contained" onClick={() => navigate('/add-institute')}>Add Institute</Button>
          </Grid>
        </Grid>
        <Grid container className="grid-container" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {instituteList.map((institute, index) => (
            <Grid item xs={2} sm={4} md={3} key={index}>
                <Paper className="paper">
                  <div className="institue-name">
                    <span>Institue Name:</span><br/>
                    { institute.name }
                  </div>
                </Paper>
                <div className="action-wrapper">
                  <Button variant="text"><EditIcon className="icon"/> Edit</Button>
                </div>
            </Grid>
          ))}
        </Grid>
      </Box>
  )
}

export default InstituteList;