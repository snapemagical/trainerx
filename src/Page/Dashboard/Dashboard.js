import { React, useContext, useEffect, useState } from "react";
import Fetch from "../../common/fetch";
import InstructorDashboard from "../../component/InstructorDashboard";

import InstituteList from "../Admin/InstituteListPage";

import { AppContext } from "../../context/App";
import AppLayout from "../../layout/appLayout";
const Dashboard = () => {
  const context = useContext(AppContext);
  const { role } = context
  const [data,setData] = useState()
  
  useEffect(()=>{
    Fetch('flight/graph-api/data_count/').then(d=>{
        if(d.status){
          setData(d.data)
        }
    })
},[])
  return (
    <AppLayout>
      {
        role === 2 ?
          <InstructorDashboard />
          : role === 3 ?
            <InstituteList />
            : null
      }
    </AppLayout>
  );
}
export default Dashboard;
