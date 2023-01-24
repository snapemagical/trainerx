import { useEffect, useState } from "react"
import Fetch from "../common/fetch"
import { Grid, Box } from "@mui/material";
import { BarChart, LineChart } from "./chart";
import { randomRgba } from "../common/utils";
import { GraphFilter } from "./graphFilter";
export default function AirCraftAnalysis() {
    const [state1, setState1] = useState({
        data: {},
        options: {}
    })
  const [filter,setFilter] = useState({})
    useEffect(() => (
        utilization()
    ), [])
    const utilization = (val = {}) => {
    setFilter({...filter,utilization:val})
        // Fetch('flight/graph-api/aircraft_utilization /').then(d => {
        Fetch('flight/graph-api/aircraft_utilization/', val, { method: 'post' }).then(d => {
            if (d.status) {
                const { data } = d.data
                const dataCha = { ...data };
                delete dataCha.dates;
                let dataNew = [];
                Object.keys(dataCha)?.map((d) => {
                  dataNew.push({
                    label: d,
                    data: data[d] ? data[d] : [],
                    backgroundColor: randomRgba(),
                    fill: false,
                  });
                });
                setState1({
                    data: {
                        labels: data.dates.map(d => d ? d : 'data'),
                        datasets: dataNew,
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                grid: {
                                    display: false
                                }
                            },
                            y: {
                                grid: {
                                    display: false
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                position: "top"
                            },
                            title: {
                                display: true,
                                text: "Aircraft Utilisation"
                            }
                        }
                    }
                })
            }
        })
    }
    return <Grid container>
        <Grid item xs={12} sm={6}>
            <Box className="box-chart">
                <GraphFilter stateFilter={filter['utilization']} changeFilter={utilization} showList={{date:true,aircraft:true}}/>
                {Object.keys(state1?.data).length ?
                    <BarChart chartData={state1.data} options={state1.options} />
                    : null}
            </Box>
        </Grid>
    </Grid>
}