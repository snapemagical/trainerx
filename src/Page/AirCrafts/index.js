import AppLayout from '../../layout/appLayout'
import { Link } from 'react-router-dom'
import { Delete} from "@material-ui/icons";
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
import { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'
import logo from '../images/edit.png'
import { UploadFileOutlined, Edit } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import Fetch from '../../common/fetch'
import { DeleteModel } from '../../common/model'
import swal from 'sweetalert'
import { withContext } from '../../context/appContext'
import moment from 'moment';
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
function Aircraft(props) {
  const [state, setState] = useState([])
  const [deleteId,setDeleteId] = useState('')
  const [id, setId] = useState({ id: '', index: '' })
  const [data, setData] = useState([])
  useEffect(() => {
    Fetch('aircraft/').then((d) => {
      if (d?.status) {
        props.context.addlicense(d.data,'airCraft')
        setData(d.data)
      }
    })
  }, [])
  const changeStatus = (id, index) => {
    setId({ id: id, index: index })
  }

  const deleteExp = (id) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    Fetch(`aircraft/${deleteId}`, null, { method: 'delete' }).then(d => {
      if (d?.status) {
        setId('')
        let data = state?.filter(s => s.deleteId !== deleteId)
        setDeleteId('')
        setState(data)
        swal('Deleted Successfully.', '', 'success', {
          button: 'OK',
        })
      }
    })
  }

  const confirmStatus = () => {
    Fetch(`aircraft/${id.id}/aircraft_status_change/`, { status: !data[id.index]?.status },{method:'put'}).then(d => {
      if (d.status) {
        let dataFilter = [...data]
        dataFilter = dataFilter.map((element, index) => {
          return element.id === +id.id ?{...element,status:!data[id.index]?.status}:element;
        });
        setId({id: '', index: '' })
        setData(dataFilter)
        swal("Status Change Successfully", "", "success", {
          button: "ok",
        })
      }
    })
  }
  return (
    <AppLayout>
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
                  <div className="customHeadingCol">
                    <h2 style={{ margin: '0' }}>Aircrafts</h2>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} style={{ padding: '0px' }}>
                  <Link
                    to="/aircraft/aircrafts/add"
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
                      Add Aircraft
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
                    style={{ backgroundColor: '#E1D9FF', border: '#7070706B' }}
                  >
                    <TableRow>
                      <StyledTableCell>Aircraft Type</StyledTableCell>
                      <StyledTableCell align="left">
                        Registration No.
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Date of Joining
                      </StyledTableCell>
                      <StyledTableCell align="left">Status</StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.length ? data.map((row,index) => (
                      <StyledTableRow key={row.aircraft_type_name}>
                        <StyledTableCell component="th" scope="row">
                          {row.aircraft_type_name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.registration_number}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                        {moment(row.date_of_registration).format('DD MMM yyyy')}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.status ? 'Active' : 'Deactive'}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.protein}

                          <Button
                            variant="contained"
                            type="submit"
                            style={{
                              padding: '0',
                              border: 'none',
                              minWidth: '0px',
                            }}
                            onClick={()=>props?.history.push(`/aircraft/aircrafts/${row.id}`)}
                          >
                            <div className="logoo">
                              <img
                                src={logo}
                                width="20px"
                                style={{ margin: 'auto', marginTop: '30px' }}
                              />
                            </div>
                          </Button>
                          <Button
                        onClick={() => deleteExp(row.id)}
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
                          <Button
                          onClick={() => changeStatus(row.id,index)}
                            style={{
                              padding: '0',
                              boxShadow:
                                '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 1',
                              marginLeft: '10px',
                              minWidth: '0px',
                              borderRadius: '50%',
                            color: row.status ? 'red' : 'rgb(117, 100, 231)'
                            }}
                          >
                            {row.status ? 'Deactivate' : 'Active'}

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
        <DeleteModel show={deleteId} handleClose={() => setDeleteId('')} handleConfirm={confirmDelete} />
        <DeleteModel title={'Are you sure you want to change status for this Aircraft?'} show={id.id} handleClose={() => setId({id:'',index:''})} handleConfirm={confirmStatus} />
      </Container>
    </AppLayout>
  )
}
export default withContext(Aircraft)
