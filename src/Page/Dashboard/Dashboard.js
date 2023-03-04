import { Grid } from "@mui/material";
import { React, useEffect, useState } from "react";
import Fetch from "../../common/fetch";
import AdminDashboard from "../../component/adminDashboard";
import { BarChart, LineChart } from "../../component/chart";
import Hours from "../../component/hour";
import InstructorDashboard from "../../component/InstructorDashboard";
import StudentAnalysis from "../../component/studentanalysis";
// import { withContext } from "../../context/appContext";
import AppLayout from "../../layout/appLayout";
function Dashboard({ context }) {
  const { role } = context
  const [data,setData] = useState()
  useEffect(()=>{
    Fetch('flight/graph-api/data_count/').then(d=>{
        if(d.status){
          setData(d.data)
        }
    })
    console.log(role);
},[])
  return (
    <AppLayout>
      {
        role === 2 ?
          <InstructorDashboard />
          : role === 3 ?
          <>
          <h3>Total Hours: {data?.today_flight_hours}</h3>
            <AdminDashboard />
            </>
            : null
      }
      {
        role === 3 ? null : <Hours />
      }
    </AppLayout>
  );
}
export default Dashboard;
