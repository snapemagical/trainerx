/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import Fetch from "../common/fetch";
import { Grid, Box } from "@mui/material";
import { BarChart, LineChart } from "./chart";
import { randomRgba } from "../common/utils";

import { GraphFilter } from "./graphFilter";
// import moment from "moment";

export default function AdminDashboard() {
  const [overTimeLine, setoverTimeLine] = useState({
    data: {},
    options: {},
  });
  const [state1, setState1] = useState({
    data: {},
    options: {},
  });
  const [noFlown, setNoFlown] = useState({
    data: {},
    options: {},
  });
  const [filter,setFilter] = useState({})
  useEffect(() => {
    getAircraftDay()
    flightPosition()
    flownByInst()
  }, []);
  const flownByInst = (val)=>{
    setFilter({...filter,flownByInst:val})
    Fetch("flight/graph-api/time_flown_by_instructor/",val,{method:'post'}).then((d) => {
      if (d.status) {
        const { data } = d.data;
        setNoFlown({
          data: {
            labels: data.labels,
            datasets: [
              {
                label: "",
                data: data.values,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
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
                position: "top",
              },
              title: {
                display: true,
                text: "Time Flown by Instuctor",
              },
            },
          },
        });
      }
    });
  }
  const flightPosition=(val)=>{
    setFilter({...filter,flightPosition:val})
    Fetch("flight/graph-api/number_of_flight_per_position/",val,{method:'post'}).then((d) => {
      if (d.status) {
        const { data } = d.data;
        setState1({
          data: {
            labels: data.dates.map((d) => (d ? d : "data")),
            datasets: [
              {
                label: "FO",
                data: data?.FO ? data?.FO : [],
                backgroundColor: "rgba(37, 63, 93, 0.5)",
              },
              {
                label: "JFO",
                data: data?.JFO ? data?.JFO : [],
                backgroundColor: "rgba(191, 53, 13, 1)",
              },
              {
                label: "SFO",
                data: data?.SFO ? data?.SFO : [],
                backgroundColor: "rgba(53, 162, 25, 0.5)",
              },
              {
                label: "Capt",
                data: data?.Capt ? data?.Capt : [],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
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
                position: "top",
              },
              title: {
                display: true,
                text: "No. of flights as per position",
              },
            },
          },
        });
      }
    });
  }
  const getAircraftDay = (val={})=>{
    setFilter({...filter,getAircraftDay:val})
    Fetch("flight/graph-api/number_of_flight_by_day_per_aircraft/",val,{method:'post'}).then(
      (d) => {
        if (d.status) {
          const { data } = d.data;
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
          setoverTimeLine({
            data: {
              labels: data.dates,
              datasets: dataNew,
            },
            options: {
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
                  text: "Number of flight by day as per aircraft",
                },
              },
            },
          });
        }
      }
    );
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Box className="box-chart">
          <GraphFilter stateFilter={filter['flightPosition']} changeFilter={flightPosition} showList={{date:true,student:true}}/>
          {Object.keys(state1?.data).length ? (
            <BarChart chartData={state1.data} options={state1.options} />
          ) : null}
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box className="box-chart">
        <GraphFilter stateFilter={filter['getAircraftDay']} changeFilter={getAircraftDay} showList={{date:true,aircraft:true}}/>
          {Object.keys(overTimeLine?.data).length ? (
            <BarChart
              chartData={overTimeLine.data}
              options={overTimeLine.options}
            />
          ) : null}
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box className="box-chart">
        <GraphFilter stateFilter={filter['flownByInst']} changeFilter={flownByInst} showList={{instructor: true,date:true}}/>
          {Object.keys(noFlown?.data).length ? (
            <BarChart chartData={noFlown.data} options={noFlown.options} />
          ) : null}
        </Box>
      </Grid>
    </Grid>
  );
}
