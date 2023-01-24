import AppLayout from '../layout/appLayout'
import {
  Container,
  Paper,
  Grid,
  Button,
  TableContainer,
  TableCell,
  Table,
  TableHead,
  TableBody,
  TableRow,
} from '@mui/material'
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import logo from "../Page/images/edit.png";
import { UploadFileOutlined, Edit } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Fetch from '../common/fetch';
import { getTime } from 'date-fns';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.gainsboro,
    color: theme.palette.common.black,
    fontSize: 21,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))
function createData(
  flightschool,
  employer,
  aircraft,
  flighttype,
  location,
  hours,
) {
  return { flightschool, employer, aircraft, flighttype, location, hours }
}

const rows = [

]
function Hours() {
  const [state, setState] = useState([])
  useEffect(() => {
    Fetch('accounts/experience/user-table-data/').then(d => {
      if (d?.status) {
        setState(d?.data)
        let datFormat = []

        // d?.data?.map(d=> {
        //   datFormat.push([dgetTime()])
        // })
      }
    })
  }, [])
  const getTime = (d, type, timeChoice, role) => {
    let time = '00:00'
    if (d.flight_type_name === type) {
      d.flight_experience_data?.map(d => {
        if (d.time_choice === timeChoice) {
          if (d.pilot_role === role) {
            time = d.total_hours_data ? d.total_hours_data : '00:00'
          }
        }
      })
    }

    return time
  }
  const getTotalTimearr = () => {
    let totalPrice = {
      Singledaydual: [],
      Singledaypic: [],
      Singledaycopilot: [],
      Singledayp1us: [],
      // Singledayinstructional: [],
      Singlenightdual: [],
      Singlenightpic: [],
      Singlenightcopilot: [],
      Singlenightp1us: [],
      // Singlenightinstructional: [],
      Multidaydual: [],
      Multidaypic: [],
      Multidaycopilot: [],
      Multidayp1us: [],
      // Multidayinstructional: [],
      Multinightdual: [],
      Multinightpic: [],
      Multinightcopilot: [],
      Multinightp1us: [],
      // Multinightinstructional: [],
      instrumentTimeSimHour: [],
      instrumentTimeActHour: [],
      instructional: [],
    }
    state.forEach(function (value, index, arry) {
      totalPrice['Singledaydual']?.push(getTime(value, "Single Engine", "day", "dual"));
      totalPrice['Singledaypic']?.push(getTime(value, "Single Engine", "day", "pic"));
      totalPrice['Singledaycopilot']?.push(getTime(value, "Single Engine", "day", "co_pilot"));
      totalPrice['Singledayp1us']?.push(getTime(value, "Single Engine", "day", "p1_us"));
      // totalPrice['Singledayinstructional']?.push(getTime(value, "Single Engine", "day", "instructional"));
      totalPrice['Singlenightdual']?.push(getTime(value, "Single Engine", "night", "dual"));
      totalPrice['Singlenightpic']?.push(getTime(value, "Single Engine", "night", "pic"));
      totalPrice['Singlenightcopilot']?.push(getTime(value, "Single Engine", "night", "co_pilot"));
      totalPrice['Singlenightp1us']?.push(getTime(value, "Single Engine", "night", "p1_us"));
      // totalPrice['Singlenightinstructional']?.push(getTime(value, "Single Engine", "night", "instructional"));
      totalPrice['Multidaydual']?.push(getTime(value, "Multi Engine", "day", "dual"));
      totalPrice['Multidaypic']?.push(getTime(value, "Multi Engine", "day", "pic"));
      totalPrice['Multidaycopilot']?.push(getTime(value, "Multi Engine", "day", "co_pilot"));
      totalPrice['Multidayp1us']?.push(getTime(value, "Multi Engine", "day", "p1_us"));
      // totalPrice['Multidayinstructional']?.push(getTime(value, "Multi Engine", "day", "instructional"));
      totalPrice['Multinightdual']?.push(getTime(value, "Multi Engine", "night", "dual"));
      totalPrice['Multinightpic']?.push(getTime(value, "Multi Engine", "night", "pic"));
      totalPrice['Multinightcopilot']?.push(getTime(value, "Multi Engine", "night", "co_pilot"));
      totalPrice['Multinightp1us']?.push(getTime(value, "Multi Engine", "night", "p1_us"));
      // totalPrice['Multinightinstructional']?.push(getTime(value, "Multi Engine", "night", "instructional"));
      totalPrice['instrumentTimeSimHour']?.push(value.instrument_simulated_hours ? value.instrument_simulated_hours : '00:00:00');
      totalPrice['instrumentTimeActHour']?.push(value.instrument_actual_hours ? value.instrument_actual_hours : '00:00:00');
      totalPrice['instructional']?.push(value.instructional_hours ? value.instructional_hours : '00:00:00');
    });
    return totalPrice
  }
  const getTotalTime = (arr, number) => {
    if (!arr?.length) {
      return 0;
    }
    let h = 0, m = 0, s = 0;
    arr?.map((value, i) => {
      h = h + +value.split(":")[0];
      m = m + +value.split(":")[1];
      // s = s + +value.split(":")[2];
    })
    h = h + timeConvert(m).hour
    return (h > 9 ? h : '0' + h) + ":" + (m > 9 ? timeConvert(m).mint : '0' + m)
  }
  function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return { hour: rhours, mint: rminutes };
  }
  return (
    <Paper className="customPaperCol" elevation={3}>
      <div style={{ marginBottom: '40px' }}>
        <Grid
          container
          spacing={3}
          style={{ margin: '0px', width: '100%', alignItems: 'center' }}
          className="cardHeadingCol"
        >
          <Grid item xs={12} sm={6} style={{ padding: '0px' }}>
            <div className="">
              <h2 style={{ margin: '0' }}>Total Hours {
                getTotalTime([...getTotalTimearr().Singledaydual, ...getTotalTimearr().Singledaypic,
                ...getTotalTimearr().Singledaycopilot,
                ...getTotalTimearr().Singledayp1us,
                ...getTotalTimearr().Singlenightdual,
                ...getTotalTimearr().Singlenightpic,
                ...getTotalTimearr().Singlenightcopilot,
                ...getTotalTimearr().Singlenightp1us,
                ...getTotalTimearr().Multidaydual,
                ...getTotalTimearr().Multidaypic,
                ...getTotalTimearr().Multidaycopilot,
                ...getTotalTimearr().Multidayp1us,
                ...getTotalTimearr().Multinightdual,
                ...getTotalTimearr().Multinightpic,
                ...getTotalTimearr().Multinightcopilot,
                ...getTotalTimearr().Multinightp1us], true)
              }</h2>
            </div>
          </Grid>
        </Grid>
        <TableContainer
          className="customNocss hoursTable table-responsive"
          component={Paper}
          style={{}}
        >
          <Table aria-label="customized table">
            <TableHead
              style={{ backgroundColor: '#C9C6FF', color: '#7564E7' }}
            >
              <TableRow>
                <StyledTableCell align="center" colSpan={20}>Hours</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableHead style={{ backgroundColor: '#E1D9FF', color: '#7564E7' }}>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="center" colSpan={8}>
                  Single Engine
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={8}>Multi Engine</StyledTableCell>
                <StyledTableCell align="center" colSpan={2} rowSpan={4}>Instrument Flight</StyledTableCell>
                <StyledTableCell align="center" rowSpan={4}>Instructional</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableHead
              style={{ backgroundColor: '#EBE7F9', color: '#253F5D' }}
            >
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="center" colSpan={4}>
                  Day
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={4}>Night</StyledTableCell>
                <StyledTableCell align="center" colSpan={4}>
                  Day
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={4}>Night</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableHead
            >
              <TableRow>
                <StyledTableCell>Aircraft</StyledTableCell>
                <StyledTableCell align="left">
                  Dual
                </StyledTableCell>
                <StyledTableCell align="left">PIC</StyledTableCell>
                <StyledTableCell align="center">Co-Pilot</StyledTableCell>
                <StyledTableCell align="center">PI(US)</StyledTableCell>
                {/* <StyledTableCell align="center">Instructional</StyledTableCell> */}
                <StyledTableCell align="left">
                  Dual
                </StyledTableCell>
                <StyledTableCell align="left">PIC</StyledTableCell>
                <StyledTableCell align="center">Co-Pilot</StyledTableCell>
                <StyledTableCell align="center">PI(US)</StyledTableCell>
                {/* <StyledTableCell align="center">Instructional</StyledTableCell> */}
                <StyledTableCell align="left">
                  Dual
                </StyledTableCell>
                <StyledTableCell align="left">PIC</StyledTableCell>
                <StyledTableCell align="center">Co-Pilot</StyledTableCell>
                <StyledTableCell align="center">PI(US)</StyledTableCell>
                {/* <StyledTableCell align="center">Instructional</StyledTableCell> */}
                <StyledTableCell align="left">
                  Dual
                </StyledTableCell>
                <StyledTableCell align="left">PIC</StyledTableCell>
                <StyledTableCell align="center">Co-Pilot</StyledTableCell>
                <StyledTableCell align="center">PI(US)</StyledTableCell>
                {/* <StyledTableCell align="center">Instructional</StyledTableCell> */}
                <StyledTableCell align="center">Simulated</StyledTableCell>
                <StyledTableCell align="center">Actual</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* <StyledTableCell>Current A/c Ratings (auto next line)</StyledTableCell> */}
              {
                state.map((row) => (
                  <StyledTableRow key={row.aircraft_type_name}>
                    <StyledTableCell component="th" scope="row" width="10%">
                      {row.aircraft_type_name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {getTime(row, "Single Engine", "day", "dual")}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {getTime(row, "Single Engine", "day", "pic")}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {getTime(row, "Single Engine", "day", "co_pilot")}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {getTime(row, "Single Engine", "day", "p1_us")}
                    </StyledTableCell>
                    {/* <StyledTableCell align="left">
                      {getTime(row, "Single Engine", "day", "instructional")}
                    </StyledTableCell> */}
                    <StyledTableCell align="left">
                      {getTime(row, "Single Engine", "night", "dual")}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {getTime(row, "Single Engine", "night", "pic")}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {getTime(row, "Single Engine", "night", "co_pilot")}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {getTime(row, "Single Engine", "night", "p1_us")}
                    </StyledTableCell>
                    {/* <StyledTableCell align="left">
                      {getTime(row, "Single Engine", "night", "instructional")}
                    </StyledTableCell> */}
                    <StyledTableCell align="left">
                      {getTime(row, "Multi Engine", "day", "dual")}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {getTime(row, "Multi Engine", "day", "pic")}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {getTime(row, "Multi Engine", "day", "co_pilot")}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {getTime(row, "Multi Engine", "day", "p1_us")}
                    </StyledTableCell>
                    {/* <StyledTableCell align="left">
                      {getTime(row, "Multi Engine", "day", "instructional")}
                    </StyledTableCell> */}
                    <StyledTableCell align="left">
                      {getTime(row, "Multi Engine", "night", "dual")}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {getTime(row, "Multi Engine", "night", "pic")}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {getTime(row, "Multi Engine", "night", "co_pilot")}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {getTime(row, "Multi Engine", "night", "p1_us")}
                    </StyledTableCell>
                    {/* <StyledTableCell align="left">
                      {getTime(row, "Multi Engine", "night", "instructional")}
                    </StyledTableCell> */}
                    <StyledTableCell align="left">
                      {row.instrument_simulated_hours ? row.instrument_simulated_hours : 0}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.instrument_actual_hours ? row.instrument_actual_hours : 0}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.instructional_hours ? row.instructional_hours : 0}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              {state?.length ? <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  <b>Total Hours</b>
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().Singledaydual)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().Singledaypic)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().Singledaycopilot)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().Singledayp1us)}
                </StyledTableCell>
                {/* <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().Singledayinstructional)}
                </StyledTableCell> */}
                <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().Singlenightdual)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().Singlenightpic)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().Singlenightcopilot)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().Singlenightp1us)}
                </StyledTableCell>
                {/* <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().Singlenightinstructional)}
                </StyledTableCell> */}
                <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().Multidaydual)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().Multidaypic)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().Multidaycopilot)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().Multidayp1us)}
                </StyledTableCell>
                {/* <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().Multidayinstructional)}
                </StyledTableCell> */}
                <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().Multinightdual)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().Multinightpic)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().Multinightcopilot)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().Multinightp1us)}
                </StyledTableCell>
                {/* <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().Multinightinstructional)}
                </StyledTableCell> */}
                <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().instrumentTimeSimHour)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().instrumentTimeActHour)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {getTotalTime(getTotalTimearr().instructional)}
                </StyledTableCell>
              </StyledTableRow> : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  )
}
export default Hours
