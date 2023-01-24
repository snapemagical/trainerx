import AppLayout from "../../layout/appLayout";
import { Link } from "react-router-dom";
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
} from "@mui/material";

import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import logo from "../images/edit.png";
import { UploadFileOutlined, Edit } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from "react";
import Fetch from "../../common/fetch";
import moment from "moment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { withContext } from "../../context/appContext";
import { DeleteModel } from "../../common/model"
import { Delete } from "@material-ui/icons"
import swal from "sweetalert";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import TextField from "@material-ui/core/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.gainsboro,
    color: theme.palette.common.black,
    fontSize: 21,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function Roaster(props) {
  const { context } = props
  const [id, setId] = useState('');
  const [state, setState] = useState()
  const [data, setData] = useState({ prev: [], upComing: [] });
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [date, setDate] = useState({
    issue_date: null,
    valid_date: null,
  });
  const handleClickOpen = (id) => {
    setId(id);
  };

  const { role } = context
  const disabled = role >= 2;
  const confirmDelete = () => {
    Fetch(`flight/schedule/${id}`, null, { method: 'delete' }).then(d => {
      if (d?.status) {
        setId('')
        let dataFilter = data?.upComing?.filter(s => s.id !== id)
        setData({
          ...data,
          upComing: dataFilter
        })
        // setState(data)
        swal('Deleted Successfully.', '', 'success', {
          button: 'OK',
        })
      }
    })
  }


  const onChangeDate = (val, name) => {
    const d = val ? moment(val).format("YYYY-MM-DD") : val;
    setDate({
      ...date,
      [name]: val,
    });
    // setState({
    //   ...state,
    //   [name]: d
    // });
  };

  useEffect(() => {
    const name = props.context.userProfile?.profile?.first_name
    if (Object.keys(props.context.userProfile)?.length) {
      if (!name) {
        swal("Please update your profile to access the roster", "", "success", {
          button: "OK",
        }).then((d) => props.history.goBack());
      }
    }
  }, [props.context.userProfile?.profile?.first_name]);
  useEffect(() => {
    Fetch("flight/schedule/").then((d) => {
      if (d?.status) {
        props.context.addRoaster(d.data);
        let filterData = { prev: [], upComing: [] };
        d?.data?.map((c, key) => {
          if (
            !c.departure_date || moment(moment().format()).isBefore(
              moment(c.departure_date + " " + c.departure_time).format()
            )
          ) {
            filterData?.upComing.push(c);
          } else {
            filterData?.prev.push(c);
          }
        });
        setData(filterData);
      }
    });
  }, []);
  console.log(data,'data-==');
  return (
    <AppLayout>
      <Container maxWidth="xl">
        <div>
          <Paper className="customPaperCol" elevation={3}>
            <div style={{ marginBottom: "40px" }}>
              <Grid
                container
                spacing={3}
                style={{ margin: "0px", width: "100%", alignItems: "center" }}
                className="cardHeadingCol"
              >
                <Grid item xs={12} sm={6} style={{ padding: "0px" }}>
                  <div className="customHeadingCol">
                    <h2 style={{ margin: "0" }}>Upcoming Schedule</h2>
                  </div>
                </Grid>
                {/* <Grid item xs={12} sm={3} style={{ padding: "0px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Filters
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Filters"
                      onChange={handleChange}
                    > */}
                {/* <div>
                        <Container maxWidth="sm">
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <h4>Filters</h4>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Button
                                variant="outlined"
                                style={{
                                  // float: "right",
                                  textTransform: "capitalize",
                                  // backgroundColor: "#7564E7",
                                  // color: "white",
                                  // fontSize: "18px",
                                }}
                              >
                                Clear all filters
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <h2 style={{ margin: "0px" }}>Students</h2>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <h2>Course</h2>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox defaultChecked />}
                                  label="Student 1"
                                />
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Student 2"
                                />
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Student 3"
                                />
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Student 4"
                                />
                              </FormGroup>
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6}>
                                <h2 style={{ margin: "0px" }}> Aircrafts </h2>
                                <FormGroup>
                                  <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label="C 1"
                                  />
                                  <FormControlLabel
                                    control={<Checkbox />}
                                    label="C 2"
                                  />
                                  <FormControlLabel
                                    control={<Checkbox />}
                                    label="C 3"
                                  />
                                </FormGroup>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <FormGroup>
                                  <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label="AC 1"
                                  />
                                  <FormControlLabel
                                    control={<Checkbox />}
                                    label="AC 2"
                                  />
                                  <FormControlLabel
                                    control={<Checkbox />}
                                    label="AC 3"
                                  />
                                </FormGroup>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <h2 style={{ margin: "0px" }}> Duration </h2>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox defaultChecked />}
                                  label="Custom"
                                />
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Monthly"
                                />
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Quarterly"
                                />
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Yearly"
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <Stack className="datefield" spacing={2}>
                                  <DesktopDatePicker
                                    label="FROM"
                                    fullWidth
                                    variant="outlined"
                                    inputFormat="MM/dd/yyyy"
                                    value={date.issue_date}
                                    onChange={(val) =>
                                      onChangeDate(val, "issue_date")
                                    }
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                  />
                                </Stack>
                                {/* {formValid.errors?.issue_date?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.issue_date}
                        </FormHelperText>
                      )} */}
                {/* </LocalizationProvider>

                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <Stack className="datefield" spacing={2}>
                                  <DesktopDatePicker
                                    label="To"
                                    fullWidth
                                    variant="outlined"
                                    inputFormat="MM/dd/yyyy"
                                    value={date.valid_date}
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                    onChange={(val) =>
                                      onChangeDate(val, "valid_date")
                                    }
                                  />
                                </Stack> */}
                {/* {formValid.errors?.valid_date?.length && (
                        <FormHelperText className="Mui-error">
                          {formValid.errors.valid_date}
                        </FormHelperText>
                      )} */}
                {/* </LocalizationProvider>
                              <Button
                                variant="contained"
                                type="submit"
                              >
                                Done
                              </Button>
                            </Grid>
                          </Grid>
                        </Container>
                      </div>  */}

                {/* <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem> */}
                {/* </Select>
                  </FormControl>
                </Grid> */}
                <Grid item xs={12} sm={6} style={{ padding: "0px" }}>
                  <Link
                    to="/roster/add-roster/add"
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      className="usermgbtn"
                      variant="contained"
                      type="submit"
                      style={{
                        float: "right",
                        textTransform: "capitalize",
                        backgroundColor: "#7564E7",
                        color: "white",
                        fontSize: "18px",
                      }}
                    >
                      New Flight
                    </Button>
                  </Link>
                </Grid>
              </Grid>

              <TableContainer
                className="customNocss"
                component={Paper}
                style={{}}
              >
                <Table aria-label="customized table">
                  <TableHead
                    style={{ backgroundColor: "#E1D9FF", border: "#7070706B" }}
                  >
                    <TableRow>
                      <StyledTableCell align="left">Date</StyledTableCell>
                      <StyledTableCell align="left">Timeslot</StyledTableCell>
                      <StyledTableCell>Aircraft No.</StyledTableCell>
                      <StyledTableCell align="left">
                        Instructor name
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Student name
                      </StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.upComing?.length ? (
                      data?.upComing?.map((row) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell align="left">
                            {row.departure_date ? row.departure_date : null}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.departure_time ? row.departure_time : null}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row.aircraft_number}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.instructor_name}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.student_name}
                          </StyledTableCell>
                          
                          <StyledTableCell align="center">
                            <Button
                              variant="contained"
                              onClick={() =>
                                props.history.push(
                                  `/roster/add-roster/${row.id}`
                                )
                              }
                              type="submit"
                              style={{
                                padding: "0",
                                border: "none",
                                minWidth: "0px",
                              }}
                            >
                              <div className="logoo">
                                <img
                                  src={logo}
                                  width="20px"
                                  style={{ margin: "auto", marginTop: "30px" }}
                                />
                              </div>
                            </Button>

                            {disabled && <Button
                              onClick={() => handleClickOpen(row.id)}
                              style={{
                                padding: "0",
                                boxShadow:
                                  "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 1",
                                marginLeft: "10px",
                                minWidth: "0px",
                                borderRadius: "50%",
                              }}
                            >
                              <Delete style={{ color: "red", margin: "4px" }} />
                            </Button>}

                            {role <= 2 ? <Button
                              onClick={() =>
                                props.history.push(
                                  `/roster/load-sheet/?id=${row.loadsheet}`
                                )
                              }
                              //  onClick={handleClickOpen}
                              style={{
                                padding: "0",
                                boxShadow:
                                  "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 1",
                                marginLeft: "10px",
                                minWidth: "0px",
                                borderRadius: "50%",
                              }}
                            >
                              <UploadFileOutlined
                                style={{ color: "red", margin: "4px" }}
                              />
                            </Button> : null}
                          </StyledTableCell>
                              
                          {/* </Link> */}
                        </StyledTableRow>
                      ))
                    ) : (
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          No Data Found
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>
          <Paper className="customPaperCol" elevation={3}>
            <div style={{ marginBottom: "40px" }}>
              <Grid
                container
                spacing={3}
                style={{ margin: "0px", width: "100%", alignItems: "center" }}
                className="cardHeadingCol"
              >
                <Grid item xs={12} sm={6} style={{ padding: "0px" }}>
                  <div className="customHeadingCol">
                    <h2 style={{ margin: "0" }}>Previous Flights</h2>
                  </div>
                </Grid>
              </Grid>
              <TableContainer
                className="customNocss"
                component={Paper}
                style={{}}
              >
                <Table aria-label="customized table">
                  <TableHead
                    style={{ backgroundColor: "#E1D9FF", border: "#7070706B" }}
                  >
                    <TableRow>
                      <StyledTableCell align="left">Date</StyledTableCell>
                      <StyledTableCell align="left">Timeslot</StyledTableCell>
                      <StyledTableCell>Aircraft No.</StyledTableCell>
                      <StyledTableCell align="left">
                        Instructor name
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Student name
                      </StyledTableCell>
                      {/* <StyledTableCell align="left">Timeslot</StyledTableCell> */}
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.prev?.length ? (
                      data?.prev?.map((row) => (
                        <StyledTableRow
                          key={row.id}
                          className={
                            row.status === "reject"
                              ? "bgReject"
                              : row.status === "accept"
                                ? ""
                                : !moment(moment().format()).isBefore(
                                  moment(
                                    row.departure_date +
                                    " " +
                                    row.departure_time
                                  ).format()
                                )
                                  ? "bgYellow"
                                  : ""
                          }
                        >
                          <StyledTableCell align="left">
                            {row.departure_date ? row.departure_date : null}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.departure_time ? row.departure_time : null}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row.aircraft_number}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.instructor_name}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.student_name}
                          </StyledTableCell>
                          {/* <StyledTableCell align="left">
                            {row.departure_date ? row.departure_date + " " + row.departure_time : null}
                          </StyledTableCell> */}
                          <StyledTableCell align="center">
                            {
                              row.status === "accept" ?
                              <Button
                              variant="contained"
                              type="submit"
                              style={{
                                padding: "0",
                                border: "none",
                                minWidth: "0px",
                              }}
                              onClick={() => 
                                props.history.push(`/roster/add-roster/${row.id}?viewOnly=1`)
                              }
                            >
                              <div className="logoo">
                                <VisibilityIcon />
                              </div>
                            </Button> :
                                <>
                                  <Button
                                    variant="contained"
                                    type="submit"
                                    style={{
                                      padding: "0",
                                      border: "none",
                                      minWidth: "0px",
                                    }}
                                    onClick={() =>
                                      props.history.push(
                                        `/roster/add-roster/${row.id}`
                                      )
                                    }
                                  >
                                    <div className="logoo">
                                      <img
                                        src={logo}
                                        width="20px"
                                        style={{ margin: "auto", marginTop: "30px" }}
                                      />
                                    </div>
                                  </Button>

                                  {/* <Button
                            onClick={() => handleClickOpen(row.id)}
                            style={{
                              padding: "0",
                              boxShadow:
                                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 1",
                              marginLeft: "10px",
                              minWidth: "0px",
                              borderRadius: "50%",
                            }}
                          >
                            <Delete style={{ color: "red", margin: "4px" }} />
                          </Button> */}

                                  {role <= 2 ? <Button
                                    onClick={() =>
                                      props.history.push(
                                        `/roster/load-sheet/?id=${row.loadsheet}`
                                      )
                                    }
                                    //  onClick={handleClickOpen}
                                    style={{
                                      padding: "0",
                                      boxShadow:
                                        "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 1",
                                      marginLeft: "10px",
                                      minWidth: "0px",
                                      borderRadius: "50%",
                                    }}
                                  >
                                    <UploadFileOutlined
                                      style={{ color: "red", margin: "4px" }}
                                    />
                                  </Button> : null}
                                </>
                            }
                          </StyledTableCell>
                          {/* </Link> */}
                        </StyledTableRow>
                      ))
                    ) : (
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          No Data Found
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>
        </div>
      </Container>
      <DeleteModel show={id} handleClose={() => setId('')} handleConfirm={confirmDelete} />
    </AppLayout>
  );
}
export default withContext(Roaster);
