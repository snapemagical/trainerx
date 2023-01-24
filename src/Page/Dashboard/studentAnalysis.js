import { useEffect, useState } from "react";
import Fetch from "../../common/fetch";
import StudentAnalysis from "../../component/studentanalysis";
import AppLayout from "../../layout/appLayout";

export default function StudentAnal() {
    const [data, setData] = useState()
    useEffect(() => {
        Fetch('flight/graph-api/data_count/').then(d => {
            if (d.status) {
                setData(d.data)
            }
        })
    }, [])
    return <AppLayout>
          <h3>No. of Student: {data?.number_of_student}</h3>
        <StudentAnalysis />
    </AppLayout>
}