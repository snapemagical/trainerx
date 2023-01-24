import { useEffect, useState } from "react";
import Fetch from "../common/fetch";
import { Grid, Box } from "@mui/material";
import { BarChart, LineChart, PieChart } from "./chart";
import { randomRgba } from "../common/utils";
import { GraphFilter } from "./graphFilter";
export default function StudentAnalysis() {
  const [state1, setState1] = useState({
    data: {},
    options: {},
  });
  const [state3, setState3] = useState({
    data: {},
    options: {},
  });
  const [state2, setState2] = useState({
    data: {},
    options: {},
  });
  const [state4, setState4] = useState({
    data: {},
    options: {},
  });
  const [filter,setFilter] = useState({})
  useEffect(() => {
    satisfactoryTrain();
    gradePosition();
    exercise();
    positionOfStudent()
  }, []);
  const satisfactoryTrain = (val = {}) => {
    setFilter({...filter,satisfactoryTrain:val})
    Fetch("flight/graph-api/no_of_satisfactory_trainings/", val, {
      method: "post",
    }).then((d) => {
      if (d.status) {
        const { data } = d.data;
        let color = [];
        data?.data?.map((d) => {
          color.push(randomRgba());
        });
        setState1({
          data: {
            labels: data?.labels,
            datasets: [
              {
                label: "",
                data: data?.data,
                backgroundColor: [...color],
                borderColor: [...color],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                display: false,
                grid: {
                  display: false,
                },
              },
              y: {
                display: false,
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                display:false,
                position: "top",
              },
              title: {
                display: true,
                text: "No. Of Satisfactory Trainings",
              },
            },
          },
        });
      }
    });
  };
  const gradePosition = (val = {}) => {
    setFilter({...filter,gradePosition:val})
    Fetch(
      "flight/graph-api/avg_of_exercise_grade_by_position_of_student/",
      val,
      { method: "post" }
    ).then((d) => {
      if (d.status) {
        const { data } = d.data;
        setState3({
          data: {
            labels: data?.labels.map((d) => (d ? d : "data")),
            datasets: [
              {
                label: "",
                data: data?.values,
                backgroundColor: "rgb(24 118 210)",
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
            },
              title: {
                display: true,
                text: "Average of Exercise Grade by position of Student",
              },
            },
          },
        });
      }
    });
  };
  const exercise = (val = {}) => {
    setFilter({...filter,exercise:val})
    Fetch("flight/graph-api/number_of_exercise_by_position_of_student/", val, {
      method: "post",
    }).then((d) => {
      if (d.status) {
        const { data } = d.data;
        const dataCha = { ...data };
        setState2({
          data: {
            labels: data?.exercises ? data.exercises : [],
            datasets: data?.exercises ? data.exercises : [],
            backgroundColor: randomRgba(),
          },
          data: {
            labels: data?.exercises ? data?.exercises : [],
            datasets: [
              {
                label: 'Capt',
                data: data?.Capt ? data?.Capt : [],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
              {
                label: 'FO',
                data: data?.FO ? data?.FO : [],
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
              {
                label: "SFO",
                data: data?.SFO ? data?.SFO : [],
                backgroundColor: "rgba(53, 162, 25, 0.5)",
              },
              {
                label: "JFO",
                data: data?.JFO ? data?.JFO : [],
                backgroundColor: "rgba(53, 162, 25, 0.5)",
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
                  display: false,
                },
              },
              y: {
                stacked: true,
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Number of Exercises by position of student",
              },
            },
          },
        });
      }
    });
  };
  const positionOfStudent = (val = {}) =>{
    setFilter({...filter,positionOfStudent:val})
    Fetch("flight/graph-api/competency_average_by_position_of_student/", val, {
      method: "post",
    }).then((d) => {
      if(d.status){
        const { data } = d.data;
        const dataCha = { ...data };
        setState4({
          data: {
            labels: data?.names ? data.names : [],
            datasets: data?.names ? data.names : [],
            backgroundColor: randomRgba(),
          },
          data: {
            labels: data?.names ? data?.names : [],
            datasets: [
              {
                label: 'Capt',
                data: data?.Capt ? data?.Capt : [],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
              {
                label: 'FO',
                data: data?.FO ? data?.FO : [],
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
              {
                label: "SFO",
                data: data?.SFO ? data?.SFO : [],
                backgroundColor: "rgba(53, 162, 25, 0.5)",
              },
              {
                label: "JFO",
                data: data?.JFO ? data?.JFO : [],
                backgroundColor: "rgba(53, 162, 25, 0.5)",
              },
            ],
          },
          options: {
            // indexAxis: 'y',
            responsive: true,
            scales: {
              x: {
                stacked: true,
                grid: {
                  display: false,
                },
              },
              y: {
                stacked: true,
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Comptency Avg by Position of Student",
              },
            },
          },
        });
      }
    })
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Box className="box-chart">
          <GraphFilter
            changeFilter={gradePosition}
            showList={{ student: true,date:true }}
            stateFilter={filter['gradePosition']}
          />
          {Object.keys(state3?.data).length ? (
            <BarChart chartData={state3.data} options={state3.options} />
          ) : null}
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box className="box-chart">
          <GraphFilter stateFilter={filter['exercise']} changeFilter={exercise} showList={{ student: true,date:true,aircraft:true }} />
          {Object.keys(state2?.data).length ? (
            <BarChart chartData={state2.data} options={state2.options} />
          ) : null}
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box className="box-chart ">
          <GraphFilter
            stateFilter={filter['satisfactoryTrain']} changeFilter={satisfactoryTrain}
            showList={{ student: true,date:true,instructor:true }}
          />
          {Object.keys(state1?.data).length ? (
            <div className="chart-small"><PieChart chartData={state1.data} options={state1.options}/></div>
          ) : null}
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box className="box-chart">
          <GraphFilter stateFilter={filter['positionOfStudent']} changeFilter={positionOfStudent} showList={{ student: true,date:true,aircraft:true }} />
          {Object.keys(state4?.data).length ? (
            <BarChart chartData={state4.data} options={state4.options} />
          ) : null}
        </Box>
      </Grid>
    </Grid>
  );
}
