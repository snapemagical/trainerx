import { useEffect, useState } from "react"
import Fetch from "../common/fetch"
import { Grid, Box } from "@mui/material";
import { BarChart, LineChart } from "./chart";
import { randomRgba } from "../common/utils";
import { GraphFilter } from "./graphFilter";
export default function InstructorAnalysis() {
    const [noFlown, setNoFlown] = useState({
        data: {},
        options: {}
    })
    const [state1, setState1] = useState({
        data: {},
        options: {}
    })
    const [overTimeLine, setoverTimeLine] = useState({
        data: {},
        options: {}
    })
    const [filter,setFilter] = useState({})
    useEffect(() => {
        byFlownInstructor()
        perDayAircraft()
        flightperPosition()
        // Fetch('flight/graph-api/additional_training_req_by_instructor/').then(d => {

    }, [])
    const byFlownInstructor = (val = {}) => {
    setFilter({...filter,byFlownInstructor:val})
        Fetch('flight/graph-api/time_flown_by_instructor/', val, { method: 'post' }).then(d => {
            if (d.status) {
                const { data } = d.data
                setNoFlown({
                    data: {
                        labels: data.labels,
                        datasets: [
                            {
                                label: '',
                                data: data.values,
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            },
                        ],
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
                            display: false,
                            position: "top"
                            },
                            title: {
                                display: true,
                                text: "Time Flown by Instuctor"
                            }
                        }
                    }
                })
            }
        })
    }
    const perDayAircraft = (val = {}) => {
    setFilter({...filter,perDayAircraft:val})
        Fetch('flight/graph-api/average_of_comp_by_instructor/', val, { method: 'post' }).then(d => {
            // Fetch('flight/graph-api/average_of_comp_by_instructor/').then(d => {
            if (d.status) {
                const { data } = d.data
                const dataCha = { ...data }
                delete dataCha.users
                let dataNew = []
                Object.keys(dataCha)?.map(d => {
                    dataNew.push({
                        label: d,
                        data: data[d] ? data[d] : [],
                        backgroundColor: randomRgba(),
                        fill: false,
                    })
                })
                setoverTimeLine({
                    data: {
                        labels: data.users,
                        datasets: dataNew,
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                stacked: true,
                                grid: {
                                    display: false
                                }
                            },
                            y: {
                                stacked: true,
                                grid: {
                                    display: false
                                }
                            },
                        },
                        plugins: {
                            legend: {
                                position: "top"
                            },
                            title: {
                                display: true,
                                text: "Average Competency Grade given by Instructor"
                            }
                        }
                    }
                })
            }
        })
    }
    const flightperPosition = (val = {}) => {
    setFilter({...filter,flightperPosition:val})
        Fetch('flight/graph-api/additional_training_req_by_instructor/', val, { method: 'post' }).then(d => {
            if (d.status) {
                const { data } = d.data
                setState1({
                    data: {
                        labels: data.users.map(d => d ? d : 'demo user'),
                        datasets: [
                            {
                                label: 'Additional Training Required',
                                data: data?.additional_training_required ? data?.additional_training_required : [],
                                backgroundColor: 'rgba(37, 63, 93, 0.5)',
                            },
                            {
                                label: 'Satisfactory',
                                data: data?.satisfactory ? data?.satisfactory : [],
                                backgroundColor: 'rgba(191, 53, 13, 1)',
                            },
                            // {
                            //     label: 'SFO',
                            //     data: data?.SFO ? data?.SFO : [],
                            //     backgroundColor: 'rgba(53, 162, 25, 0.5)',
                            // },
                            // {
                            //     label: 'Capt',
                            //     data: data?.Capt ? data?.Capt : [],
                            //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            // },
                        ],
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
                                text: "Additional Training Req by Instructor"
                            }
                        }
                    }
                })
            }
        })
    }
    return <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <Box className="box-chart">
                <GraphFilter stateFilter={filter['byFlownInstructor']} changeFilter={byFlownInstructor} showList={{instructor:true,date:true}}/>
                {Object.keys(noFlown?.data).length ?
                    <BarChart chartData={noFlown.data} options={noFlown.options} />
                    : null}
            </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Box className="box-chart">
            <GraphFilter stateFilter={filter['perDayAircraft']} changeFilter={perDayAircraft} showList={{instructor:true,date:true}}/>
                {Object.keys(overTimeLine?.data).length ?
                    <BarChart chartData={overTimeLine.data} options={overTimeLine.options} />
                    : null}
            </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Box className="box-chart">
            <GraphFilter stateFilter={filter['flightperPosition']} changeFilter={flightperPosition} showList={{date:true,instructor:true}}/>
                {Object.keys(state1?.data).length ?
                    <BarChart chartData={state1.data} options={state1.options} />
                    : null}
            </Box>
        </Grid>
    </Grid>
}