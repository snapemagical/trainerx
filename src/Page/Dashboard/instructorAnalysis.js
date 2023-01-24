import { useEffect, useState } from "react";
import Fetch from "../../common/fetch";
import InstructorAnalysis from "../../component/instructorAnalysis";
import AppLayout from "../../layout/appLayout";

export default function InstructorAnal(){
  const [data,setData] = useState()
  useEffect(()=>{
        Fetch('flight/graph-api/data_count/').then(d=>{
            if(d.status){
              setData(d.data)
            }
        })
    },[])
    return<AppLayout>
          <h3>No. of Instructor: {data?.number_of_instructor}</h3>
        <InstructorAnalysis/>
    </AppLayout>
}