import AppLayout from "../../layout/appLayout";
import { Link } from 'react-router-dom'
import { Delete } from '@material-ui/icons'
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
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { styled } from "@mui/material/styles";
import logo from "../images/edit.png";
import { UploadFileOutlined, Visibility, Edit } from '@mui/icons-material';
import { useEffect, useState } from "react";
import Fetch from "../../common/fetch";
import swal from "sweetalert";
import { DeleteModel } from "../../common/model";
import { withContext } from "../../context/appContext";
import moment from "moment";

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
function Instructors(props) {
  const [state, setState] = useState([])
  const [deleteId,setDeleteId] = useState('')
  const { history } = props
  const [data, setData] = useState([])
  const [DownwardData, setDownwardData] = useState([])
 

  const [id, setId] = useState({ id: '', index: '' })
  useEffect(() => {
    Fetch('accounts/user-invite/instructor-list/').then(d => {
      if (d?.status) {
        props.context.addlicense(d.data, 'instructor')
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



  const Downward = (Downwardid) => {
    Fetch(`accounts/user/download-user-data/?id=${Downwardid}`,
    {
      responseType: "blob", 
    }
    )
    
    .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "file.pdf");
           document.body.appendChild(link);
          link.click();
        
    
    })

  }

  const confirmDelete = () => {
    Fetch(`accounts/user-invite/${deleteId}`, null, { method: 'delete' }).then(d => {
      if (d?.status) {
        setId('')
        let data = state?.filter(s => s.deleteId !== deleteId)
        setState(data)
        setDeleteId('')
        swal('Deleted Successfully.', '', 'success', {
          button: 'OK',
        })
      }
    })
  }


  const confirmStatus = () => {
    Fetch(`accounts/user-invite/${id.id}/user_status_change/`, { deactivate: !data[id.index]?.profile?.deactivate }, { method: 'put' }).then(d => {
      if (d.status) {
        let dataFilter = [...data]
        dataFilter = dataFilter.map((element, index) => {
          return element.id === +id.id ? { ...element, profile: { ...element.profile, deactivate: !data[id.index]?.profile?.deactivate } } : element;
        });
        setId({ id: '', index: '' })
        setData(dataFilter)
        swal("Status Change Successfully", "", "success", {
          button: "ok",
        })
      }
    })
  }
  return <AppLayout>
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
                  <h2 style={{ margin: '0' }}>Instructors</h2>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} style={{ padding: '0px' }}>
                <Link
                  to="/instructors/list/add"
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
                    Add Instructors
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
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Registration No.</StyledTableCell>
                    <StyledTableCell align="left">
                      Email ID
                    </StyledTableCell>
                    <StyledTableCell align="left">Date of Joining</StyledTableCell>
                    <StyledTableCell align="left">Status</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.length ? data.map((row, index) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row?.profile?.first_name}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row?.profile?.registration_number}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.email}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {moment(row.profile?.created_at).format('DD MMM yyyy')}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.profile?.deactivate ? 'Deactive' : 'Active'}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.protein}

                        <Button
                          variant="contained"
                          onClick={() => history.push(`/instructors/list/${row.id}`)}
                          type="button"
                          style={{
                            padding: '0',
                            border: 'none',
                            minWidth: '0px',
                          }}
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
                                padding: '0',
                                boxShadow:
                                  '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 1',
                                marginLeft: '10px',
                                minWidth: '0px',
                                borderRadius: '50%',
                              }}
                            >

                              <Delete style={{ color: 'red', margin: '4px' }} />
                             
                            </Button>

                        <Button
                          variant="contained"
                          onClick={() => history.push(`/user-profile?profileId=${row.id}`)}
                          type="button"
                          style={{
                            padding: '0',
                            border: 'none',
                            minWidth: '0px',
                          }}
                        >
                          <div className="logoo">
                            <Visibility />
                          </div>
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => Downward(row.id)}
                          type="button"
                          style={{
                            padding: '0',
                            border: 'none',
                            minWidth: '0px',
                          }}
                        >
                          <div className="logoo">
                            <ArrowDownwardIcon/>
                          </div>
                        </Button>
                        <Button
                          //  onClick={handleClickOpen}
                          onClick={() => changeStatus(row.id, index)}
                          style={{
                            // padding: '10px 10px',
                            boxShadow:
                              '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 1',
                            marginLeft: '10px',
                            minWidth: '0px',
                            // color:'#fff',
                            color: !row.profile?.deactivate ? 'red' : 'rgb(117, 100, 231)'
                          }}
                        >
                          {!row.profile?.deactivate ? 'Deactivate' : 'Active'}
                        </Button>
                        
                      </StyledTableCell>
                      {/* </Link> */}
                    </StyledTableRow>
                  ))

                    :
                    <StyledTableRow>
                      <StyledTableCell>No Data Found</StyledTableCell>
                    </StyledTableRow>}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Paper>
      </div>
    </Container>
    <DeleteModel show={deleteId} handleClose={() => setDeleteId('')} handleConfirm={confirmDelete} /> 
    <DeleteModel title={'Are you sure you want to change status for this user?'} show={id.id} handleClose={() => setId({ id: '', index: '' })} handleConfirm={confirmStatus} />
    {/* <DeleteModel title={'Are you sure you want to Downward PDF File?'} show={Downwardid} handleClose={() => setDownwardid('')} handleConfirm={Downward} /> */}
  </AppLayout>
}
export default withContext(Instructors);