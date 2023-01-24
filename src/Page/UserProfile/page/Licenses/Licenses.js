import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@material-ui/core/Button";
import { Delete, Edit } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import logo from "../../../images/edit.png";
import Container from "@material-ui/core/Container";
import AppLayout from "../../../../layout/appLayout";
import ProfileHead from "../../ProfileHead";
import Fetch from "../../../../common/fetch";
import { DeleteModel } from "../../../../common/model"
import { type } from "@testing-library/user-event/dist/type";
import { withContext } from "../../../../context/appContext";

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

function createData(
  flightschool,
  employer,
  aircraft,
  flighttype,
  location,
  hours
) {
  return { flightschool, employer, aircraft, flighttype, location, hours };
}

function CustomizedTables(props) {
  const [ids, setId] = useState({});
  const [dataAll, setDataAll] = useState({
    license: [],
    medical: [],
    elp: [],
    instrument: [],
    ratings: [],
    endorsement: [],
  })
  useEffect(() => {
    
    Fetch("accounts/license/").then((d) => {
      setDataAll((prevState) => ({
        ...prevState,
        license: d.data
      }));
      
      props.context.addlicense(d.data,'license')
    });
    Fetch("accounts/medical/").then((d) => {
      setDataAll((prevState) => ({
        ...prevState,
        medical: d.data
      }));
      props.context.addlicense(d.data,'medical')
    });
    Fetch("accounts/elp/").then((d) => {
      setDataAll((prevState) => ({
        ...prevState,
        elp: d.data
      }));
      props.context.addlicense(d.data,'elp')
    });
    Fetch("accounts/instrument/").then((d) => {
      setDataAll((prevState) => ({
        ...prevState,
        instrument: d.data
      }));
      props.context.addlicense(d.data,'instrument')
    });
    Fetch("accounts/ratings/").then((d) => {
      setDataAll((prevState) => ({
        ...prevState,
        ratings: d.data
      }));
      props.context.addlicense(d.data,'ratings')
    });
    Fetch("accounts/endorsement/").then((d) => {
      setDataAll((prevState) => ({
        ...prevState,
        endorsement: d.data
      }));
      props.context.addlicense(d.data,'endorsement')
    });
  }, []);
  const handleClickOpen = (id, type) => {
    setId({ id, type });
  };
  const deleteUser = (id) => {
    Fetch(
      `accounts/elp/${id}`,
      null,
      { method: 'delete' },
    ).then((d) => {
    })
  }
  const deleteConfirm = () => {
    Fetch(
      `accounts/${ids?.type}/${ids?.id}`,
      null,
      { method: 'delete' },
    ).then((d) => {
      if (d?.status) {
        let dataFilter = { ...dataAll }
        dataFilter[ids?.type] = dataFilter[ids?.type]?.filter(s => s.id !== +ids?.id)
        setDataAll(dataFilter)
        setId({ id: null, type: '' })
      }
    })
  }
  return (
    <AppLayout>
      <ProfileHead />
      <Container maxWidth="xl">
      <Grid item xs={12} sm={12} style={{ padding: "0px" }}>
                  <Link
                    to="/user-profile"
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      className="usermgbtn"
                      variant="contained"
                      type="submit"
                      style={{
                        // float: "right",
                        marginTop: "10px",
                        textTransform: "capitalize",
                        backgroundColor: "#7564E7",
                        color: "white",
                        fontSize: "18px",
                      }}
                    >
                      Back
                    </Button>
                  </Link>
                </Grid>
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
                    <h2 style={{ margin: "0" }}>Licenses</h2>
                  </div>
                </Grid>
                
                <Grid item xs={12} sm={6} style={{ padding: "0px" }}>
                  <Link
                    to="/user-profile/license/add"
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
                      Add More
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
                      <StyledTableCell>License No.</StyledTableCell>
                      <StyledTableCell align="left">
                        License Type
                      </StyledTableCell>
                      <StyledTableCell align="left">Category</StyledTableCell>
                      <StyledTableCell align="left">Valid From</StyledTableCell>
                      <StyledTableCell align="left">Valid Upto</StyledTableCell>
                      <StyledTableCell align="left">
                        Issuing Country
                      </StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataAll?.license?.length ? dataAll?.license?.map((row) => (
                      <StyledTableRow key={row.license_number}>
                        <StyledTableCell component="th" scope="row">
                          {row.license_number}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.license_type_name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.category_name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.valid_from}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.valid_to}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.issue_country}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.protein}

                          <Button
                            variant="contained"
                            type="button"
                            onClick={()=>props.history.push(`/user-profile/license/${row.id}`)}
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
                          <Button
                            onClick={() => handleClickOpen(row.id, "license")}
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
                          </Button>
                        </StyledTableCell>
                        {/* </Link> */}
                      </StyledTableRow>
                    )) :
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          No data found
                        </StyledTableCell>
                      </StyledTableRow>
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>
        </div>

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
                    <h2 style={{ margin: "0" }}>ELP Details</h2>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} style={{ padding: "0px" }}>
                  <Link
                    to="/user-profile/elp/add"
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
                      Add More
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
                      <StyledTableCell>Level</StyledTableCell>
                      <StyledTableCell align="left">
                        Issuance Date
                      </StyledTableCell>
                      <StyledTableCell align="left">Valid Upto</StyledTableCell>

                      <StyledTableCell align="left">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataAll?.elp?.length ? dataAll?.elp?.map((row) => (
                      <StyledTableRow key={row.level}>
                        <StyledTableCell component="th" scope="row">
                          {row.level_name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.issue_date}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.valid_date}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.protein}

                          <Button
                            variant="contained"
                            onClick={()=>props.history.push(`/user-profile/elp/${row.id}`)}
                            type="button"
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
                                style={{ marginright: "10px", marginTop: "30px" }}
                              />
                            </div>
                          </Button>
                          <Button
                            onClick={() => handleClickOpen(row.id, "elp")}
                            style={{
                              padding: "0",
                              boxShadow:
                                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 1",
                              marginLeft: "10px",
                              minWidth: "0px",
                              borderRadius: "50%",
                            }}
                          >
                            {/* <Paper style={{borderRadius:"50%",}}> */}
                            <Delete style={{ color: "red", margin: "4px" }} />
                            {/* </Paper > */}
                          </Button>
                        </StyledTableCell>
                        {/* </Link> */}
                      </StyledTableRow>
                    )) :
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          No data found
                        </StyledTableCell>
                      </StyledTableRow>

                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>
        </div>

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
                    <h2 style={{ margin: "0" }}>Aircraft Endorsement</h2>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} style={{ padding: "0px" }}>
                  <Link
                    to="/user-profile/endorsement/add"
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
                      Add More
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
                      <StyledTableCell>Aircraft Type</StyledTableCell>
                      <StyledTableCell align="left">Role</StyledTableCell>
                      <StyledTableCell align="left">
                        Aircraft Class
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Aircraft Endorsement Date
                      </StyledTableCell>

                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataAll?.endorsement?.length ? dataAll?.endorsement?.map((row) => (
                      <StyledTableRow key={row.aircraft_type_name}>
                        <StyledTableCell component="th" scope="row">
                          {row.aircraft_type_name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.role_name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.aircraft_class_name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.endorsement_date}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.protein}

                          <Button
                            variant="contained"
                            onClick={()=>props.history.push(`/user-profile/endorsement/${row.id}`)}
                            type="button"
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
                          <Button
                            onClick={() => handleClickOpen(row.id, "endorsement")}
                            style={{
                              padding: "0",
                              boxShadow:
                                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 1",
                              // border: "none",
                              // background: "none",
                              marginLeft: "10px",
                              minWidth: "0px",
                              borderRadius: "50%",
                            }}
                          >
                            {/* <Paper style={{borderRadius:"50%",}}> */}
                            <Delete style={{ color: "red", margin: "4px" }} />
                            {/* </Paper > */}
                          </Button>
                        </StyledTableCell>
                        {/* </Link> */}
                      </StyledTableRow>
                    ))
                      :
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          No data found
                        </StyledTableCell>
                      </StyledTableRow>
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>
        </div>

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
                    <h2 style={{ margin: "0" }}>Instrument Rating</h2>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} style={{ padding: "0px" }}>
                  <Link
                    to="/user-profile/instrumentrating/add"
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
                      Add More
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
                      <StyledTableCell>IR NO.</StyledTableCell>
                      <StyledTableCell align="left">
                      Aircraft Type
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Initial Issuance Date
                      </StyledTableCell>
                      <StyledTableCell align="left">Valid Upto</StyledTableCell>
                      <StyledTableCell align="left">
                        Renewal Date
                      </StyledTableCell>
                      <StyledTableCell align="left">Valid Upto</StyledTableCell>

                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataAll?.instrument?.length ? dataAll?.instrument?.map((row) => (
                      <StyledTableRow key={row.instrument_number}>
                        <StyledTableCell component="th" scope="row">
                          {row.aircraft_type_name}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.instrument_number}
                        </StyledTableCell>
                        {/* <StyledTableCell align="left">
                          {row.employer}
                        </StyledTableCell> */}
                        <StyledTableCell align="left">
                          {row.issue_date}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.valid_upto}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.renewal_date}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.valid_upto_initial}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.protein}
                          <Button
                            variant="contained"
                            onClick={()=>props.history.push(`/user-profile/instrumentrating/${row.id}`)}
                            type="button"
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
                          <Button
                            onClick={() => handleClickOpen(row.id, "instrument")}
                            style={{
                              padding: "0",
                              boxShadow:
                                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 1",
                              marginLeft: "10px",
                              minWidth: "0px",
                              borderRadius: "50%",
                            }}
                          >
                            {/* <Paper style={{borderRadius:"50%",}}> */}
                            <Delete style={{ color: "red", margin: "4px" }} />
                            {/* </Paper > */}
                          </Button>
                        </StyledTableCell>
                        {/* </Link> */}
                      </StyledTableRow>
                    ))
                      :
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          No data found
                        </StyledTableCell>
                      </StyledTableRow>
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>
        </div>

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
                    <h2 style={{ margin: "0" }}>Medical</h2>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} style={{ padding: "0px" }}>
                  <Link
                    to="/user-profile/medical/add"
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
                      Add More
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
                      <StyledTableCell>Class of Medical Examination</StyledTableCell>
                      <StyledTableCell align="left">Medical Status</StyledTableCell>
                      <StyledTableCell align="left">
                        Date of Examination
                      </StyledTableCell>
                      <StyledTableCell align="left">Valid Upto</StyledTableCell>
                      <StyledTableCell align="left">
                        Blood Group
                      </StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataAll?.medical?.length ? dataAll?.medical?.map((row) => (
                      <StyledTableRow key={row.flightschool}>
                        <StyledTableCell component="th" scope="row">
                          {row.medical_examination_name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.medical_status_name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.date_of_exam}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.valid_upto}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.blood_group_name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.protein}

                          <Button
                            variant="contained"
                            onClick={()=>props.history.push(`/user-profile/medical/${row.id}`)}
                            type="button"
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
                          <Button
                            onClick={() => handleClickOpen(row.id, 'medical')}
                            style={{
                              padding: "0",
                              boxShadow:
                                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 1",
                              // border: "none",
                              // background: "none",
                              marginLeft: "10px",
                              minWidth: "0px",
                              borderRadius: "50%",
                            }}
                          >
                            {/* <Paper style={{borderRadius:"50%",}}> */}
                            <Delete style={{ color: "red", margin: "4px" }} />
                            {/* </Paper > */}
                          </Button>
                        </StyledTableCell>
                        {/* </Link> */}
                      </StyledTableRow>
                    ))
                      :
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          No data found
                        </StyledTableCell>
                      </StyledTableRow>
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>
        </div>

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
                    <h2 style={{ margin: "0" }}>Other Ratings</h2>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} style={{ padding: "0px" }}>
                  <Link
                    to="/user-profile/otherrating/add"
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
                      Add More
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
                      <StyledTableCell>Rating</StyledTableCell>
                      <StyledTableCell align="left">Rating No.</StyledTableCell>
                      <StyledTableCell align="left">
                        Initial Issuance Date
                      </StyledTableCell>
                      <StyledTableCell align="left">Valid Upto</StyledTableCell>
                      <StyledTableCell align="left">
                        Renewal Date
                      </StyledTableCell>
                      <StyledTableCell align="left">Valid Upto</StyledTableCell>
                      <StyledTableCell align="left">
                        Issuing Country
                      </StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataAll?.ratings?.length ? dataAll?.ratings?.map((row) => (
                      <StyledTableRow key={row.flightschool}>
                        <StyledTableCell component="th" scope="row">
                          {row.rating_name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.rating_number}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.initial_issue_date}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.initial_valid_upto}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.renewal_date}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.renewal_valid_upto}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.country_name}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.protein}

                          <Button
                            variant="contained"
                            onClick={()=>props.history.push(`/user-profile/otherrating/${row.id}`)}
                            type="button"
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
                          <Button
                            onClick={() => handleClickOpen(row.id, "ratings")}
                            style={{
                              padding: "0",
                              boxShadow:
                                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 1",
                              // border: "none",
                              // background: "none",
                              marginLeft: "10px",
                              minWidth: "0px",
                              borderRadius: "50%",
                            }}
                          >
                            {/* <Paper style={{borderRadius:"50%",}}> */}
                            <Delete style={{ color: "red", margin: "4px" }} />
                            {/* </Paper > */}
                          </Button>
                        </StyledTableCell>
                        {/* </Link> */}
                      </StyledTableRow>
                    ))
                      :
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          No data found
                        </StyledTableCell>
                      </StyledTableRow>
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>
        </div>
      </Container>
      <DeleteModel show={ids?.id} handleClose={() => setId({ id: null, type: '' })} handleConfirm={deleteConfirm} />
    </AppLayout>
  );
}
export default withContext(CustomizedTables)