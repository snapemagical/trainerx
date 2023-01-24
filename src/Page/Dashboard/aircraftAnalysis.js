import { useEffect, useState } from "react";
import Fetch from "../../common/fetch";
import AirCraftAnalysis from "../../component/aircraftAnalysis";
import StudentAnalysis from "../../component/studentanalysis";
import AppLayout from "../../layout/appLayout";

export default function AircraftAnal() {
    const [data, setData] = useState()
    useEffect(() => {
        Fetch('flight/graph-api/data_count/').then(d => {
            if (d.status) {
                setData(d.data)
            }
        })
    }, [])
    return <AppLayout>
        <h3>Number of Aircraft: {data?.number_of_aircraft}</h3>
        <AirCraftAnalysis />
    </AppLayout>
}