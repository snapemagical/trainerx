import { useEffect, useState } from "react"
import Fetch from "../common/fetch"
import { Grid,Box } from "@mui/material";
import { BarChart, LineChart } from "./chart";
import { GraphFilter } from "./graphFilter";
export default function InstructorDashboard() {
    const [overTimeLine, setoverTimeLine] = useState({
        data: {},
        options: {}
    })
    const [state1, setState1] = useState({
        data: {},
        options: {}
    })
    const [state2, setState2] = useState({
        data: {},
        options: {}
    })
    const [filter,setFilter] = useState({})
    useEffect(() => {
        studentOvertime()
        studentPositionGrade()
        studentPosition()
    }, [])
    const studentOvertime = (val={})=>{
        setFilter({...filter,studentOvertime:val})
        Fetch('flight/graph-api/avg_of_exercise_grade_by_position_of_student_overtime/', val, { method: 'post' }).then(d => {
            if (d.status) {
                const { data } = d.data
                setoverTimeLine({
                    data: {
                        labels: data.dates,
                        datasets: [
                            {
                                label: 'FO',
                                data: data?.FO ? data?.FO : [],
                                backgroundColor: 'rgba(37, 63, 93, 0.5)',
                                fill: false,
                            },
                            {
                                label: 'JFO',
                                data: data?.JFO ? data?.JFO : [],
                                backgroundColor: 'rgba(191, 53, 13, 1)',
                                fill: false,
                            },
                            {
                                label: 'SFO',
                                data: data?.SFO ? data?.SFO : [],
                                backgroundColor: 'rgba(53, 162, 25, 0.5)',
                                fill: false,
                            },
                            {
                                label: 'Capt',
                                data: data?.Capt ? data?.Capt : [],
                                backgroundColor: '#3d4a68',
                                fill: false,
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
                            title: {
                                display: true,
                                text: "Average of Exercise Grade by position of Student Over Time"
                            }
                        }
                    }
                })
            }
        })
    }
    const studentPositionGrade = (val={})=>{
        setFilter({...filter,studentPositionGrade:val})
        Fetch('flight/graph-api/avg_of_exercise_grade_by_position_of_student/', val, { method: 'post' }).then(d => {
            if (d.status) {
                const { data } = d.data
                setState1({
                    data: {
                        labels: data.labels.map(d => d ? d : 'data'),
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
                                display: false
                            },
                            title: {
                                display: true,
                                text: "Average of Exercise Grade by position of Student"
                            }
                        }
                    }
                })
            }
        })
    }
    const studentPosition = (val={})=>{
        setFilter({...filter,studentPosition:val})
        Fetch('flight/graph-api/number_of_exercise_by_position_of_student/', val, { method: 'post' }).then(d => {
            if (d.status) {
                const { data } = d.data
                setState2({
                    data: {
                        labels: data.exercises,
                        datasets: [
                            {
                                label: 'Capt',
                                data: data?.Capt ? data?.Capt : [],
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            },
                            {
                                label: 'FO',
                                data: data?.FO ? data?.FO : [],
                                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                            },
                            {
                                label: 'SFO',
                                data: data?.SFO ? data?.SFO : [],
                                backgroundColor: 'rgba(53, 162, 25, 0.5)',
                            },
                            {
                                label: 'JFO',
                                data: data?.JFO ? data?.JFO : [],
                                backgroundColor: 'rgba(53, 162, 25, 0.5)',
                            },
                        ],
                    },
                    options: {
                        indexAxis: 'y',
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
                                text: "Number of Exercise by Student Position"
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
                <GraphFilter stateFilter={filter['studentPositionGrade']} changeFilter={studentPositionGrade} showList={{student:true,date:true}}/>
                {Object.keys(state1?.data).length ?
                    <BarChart chartData={state1.data} options={state1.options} />
                    : null}
            </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Box className="box-chart">
            <GraphFilter stateFilter={filter['studentOvertime']} changeFilter={studentOvertime} showList={{student:true,date:true}} />
                {Object.keys(overTimeLine?.data).length ?
                    <LineChart chartData={overTimeLine.data} options={overTimeLine.options} />
                    : null}
            </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Box className="box-chart">
            <GraphFilter stateFilter={filter['studentPosition']} changeFilter={studentPosition} showList={{student:true,date:true}}/>
                {Object.keys(state2?.data).length ?
                    <BarChart chartData={state2.data} options={state2.options} />
                    : null}
            </Box>
        </Grid>
    </Grid>
}
