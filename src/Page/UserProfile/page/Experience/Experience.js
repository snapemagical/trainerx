import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@material-ui/core/Button'
import { Delete, Edit } from '@material-ui/icons'
import { Add } from '@material-ui/icons'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import AppLayout from '../../../../layout/appLayout'
import ProfileHead from '../../ProfileHead'
import Fetch from '../../../../common/fetch'
import { DeleteModel } from '../../../../common/model'
import swal from 'sweetalert'
import CircularProgress from "@mui/material/CircularProgress";
import { withContext } from '../../../../context/appContext'


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
function CustomizedTables(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState([])
  const [id, setId] = useState('')
  useEffect(() => {
    Fetch('accounts/experience/').then(d => {
      if (d?.status) {
        setState(d?.data)
        setIsLoading(false)
        props.context.addlicense(d.data, 'experience')
      }
      else {
        setIsLoading(false);
      }
    })

  }, [])
  const deleteExp = (id) => {
    setId(id)
  }
  const confirmDelete = () => {
    Fetch(`accounts/experience/${id}`, null, { method: 'delete' }).then(d => {
      if (d?.status) {
        setId('')
        let data = state?.filter(s => s.id !== id)
        setState(data)
        swal('Deleted Successfully.', '', 'success', {
          button: 'OK',
        })
      }
    })
  }
  return (
    <AppLayout style={{ marginTop: '20px' }}>
      <ProfileHead />
      <Container maxWidth="xl">
        <div>
          <Paper className="customPaperCol" elevation={3}>
            <div style={{ marginBottom: '40px' }}>
              <Grid
                container
                spacing={3}
                style={{ margin: '0px', width: '100%', alignItems: 'center' }}
                className="cardHeadingCol"
              >
                <Grid item xs={12} sm={6} style={{ padding: '0px' }}>
                  <Link
                    to="/user-profile"
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      className="usermgbtn"
                      variant="contained"
                      type="submit"
                      style={{
                        float: 'left',
                        textTransform: 'capitalize',
                        backgroundColor: '#7564E7',
                        color: 'white',
                        fontSize: '18px',
                      }}
                    >

                      BACK
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={12} sm={6} style={{ marginTop: '30px' }}>
                  <Link
                    to="/user-profile/experienceadd/add"
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      className="usermgbtn"
                      variant="contained"
                      type="submit"
                      style={{
                        float: 'right',
                        textTransform: 'capitalize',
                        backgroundColor: '#7564E7',
                        color: 'white',
                        fontSize: '18px',
                      }}
                    >
                      <Add style={{ marginRight: '6px' }} />
                      Add Previous Flight Hours
                    </Button>
                  </Link>
                </Grid>
              </Grid>
              <Paper elevation={3}>
                <TableContainer
                  className="customNocss"
                  component={Paper}
                  style={{}}
                >
                  <Table aria-label="customized table">
                    <TableHead
                      style={{
                        backgroundColor: '#E1D9FF',
                        border: '#7070706B',
                      }}
                    >
                      <TableRow>
                        <StyledTableCell>Flight School</StyledTableCell>
                        {/* <StyledTableCell align="left">Employer</StyledTableCell> */}
                        <StyledTableCell align="left">Aircraft</StyledTableCell>
                        <StyledTableCell align="left">
                          Flight Type
                        </StyledTableCell>
                        {/* <StyledTableCell align="left">Location</StyledTableCell> */}
                        {/* <StyledTableCell align="left">Hours</StyledTableCell> */}
                        <StyledTableCell align="center">Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {state?.length ? state?.map((row) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell component="th" scope="row">
                            {row.flight_school}
                          </StyledTableCell>
                          {/* <StyledTableCell align="left">
                            {row.employer}
                          </StyledTableCell> */}
                          <StyledTableCell align="left">
                            {row.aircraft_type_name}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.fight_type_name}
                          </StyledTableCell>
                          {/* <StyledTableCell align="left">
                            {row.location}
                          </StyledTableCell> */}
                          {/* <StyledTableCell align="left">
                            {row.hours}
                          </StyledTableCell> */}
                          <StyledTableCell align="center">
                            {row.protein}

                            <Button
                              variant="contained"
                              type="button"
                              onClick={() => props.history.push(`/user-profile/experienceadd/${row.id}`)}
                              style={{
                                padding: '0',
                                boxShadow:
                                  '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 1',
                                border: 'none',
                                background: 'none',
                                borderRadius: '50%',
                                minWidth: '0px',
                              }}
                            >
                              <Edit
                                style={{ color: '#17a248', margin: '4px' }}
                              />
                            </Button>
                            <Button
                              onClick={() => deleteExp(row.id)}
                              style={{
                                padding: '0',
                                boxShadow:
                                  '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 1',
                                // border: "none",
                                // background: "none",
                                marginLeft: '10px',
                                minWidth: '0px',
                                borderRadius: '50%',
                              }}
                            >
                              {/* <Paper style={{borderRadius:"50%",}}> */}
                              <Delete style={{ color: 'red', margin: '4px' }} />
                              {/* </Paper > */}
                            </Button>
                          </StyledTableCell>
                          {/* </Link> */}
                        </StyledTableRow>
                      ))
                        :
                        <StyledTableRow>
                          {isLoading ? (
                            <StyledTableCell component="th" scope="row" className='position-relative'>
                              <div className="loader-container">
                                <CircularProgress />
                              </div>
                            </StyledTableCell>
                          ) : (
                            <StyledTableCell component="th" scope="row">
                              No Data Found
                            </StyledTableCell>
                          )}
                        </StyledTableRow>

                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
          </Paper>
        </div>
      </Container>
      <DeleteModel show={id} handleClose={() => setId('')} handleConfirm={confirmDelete} />
    </AppLayout>
  )
}
export default withContext(CustomizedTables)