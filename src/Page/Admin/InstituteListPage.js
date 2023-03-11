import { React, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Fetch from "../../common/fetch";
import { Box, Grid, Paper, Button, IconButton } from '@mui/material';
import { Edit, ArrowForwardIos, ArrowBackIosNew } from '@mui/icons-material';
import "../Admin/InstituteListPage.css";

const InstituteList = () => {
  const navigate = useNavigate();
  const [instituteListDetails, setinstituteListDetails] = useState({});
  const [instituteList, setInstituteList] = useState([]);
  useEffect(()=>{
    Fetch('accounts/institute/institute-list').then(response => {
        const { data } = response;
        setinstituteListDetails({...data});
        setInstituteList(data.results);
    });
    
},[]);

const pagination = (dir) => {
  const { next, previous } = instituteListDetails; 
  const url = dir === 'next' ? next : previous; 
  Fetch('','',{url}).then(response => {
    const { data } = response;
    setinstituteListDetails(data);
    setInstituteList(data.results);
  });
}

const addUser = (userId) => {
 navigate('/add-user', { state : {userId} }) 
}
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
                  <Button variant="text" onClick={()=> addUser(institute.id)}><Edit className="icon"/> Add</Button>
                </div>
            </Grid>
          ))}
        </Grid>
        <div className="pagination rounded-icon-btn">                   
                <IconButton onClick={() => pagination('prev')} disabled={!instituteListDetails.previous} variant="outline"><ArrowBackIosNew size="small" /></IconButton>
                <IconButton onClick={() => pagination('next')} disabled={!instituteListDetails.next} variant="outline"><ArrowForwardIos /></IconButton>                
        </div>
      </Box>
  )
}

export default InstituteList;