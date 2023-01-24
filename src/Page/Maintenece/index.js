import AppLayout from '../../layout/appLayout'
import { Link } from 'react-router-dom'
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from 'moment'

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
  const [status, setStatus] = useState('');
  const [data, setData] = useState([])
  const handleChange = (event,index) => {
    setStatus(event.target.value);
    Fetch(`aircraft/${data[index]?.id}/maintenence-status-change/`,{aircraft_status:event.target.value},{method:'put'}).then((d) => {
      if (d?.status) {
        let dataFilter = [...data]
        dataFilter = dataFilter?.map((ss,i)=>(index === i ? {...ss,aircraft_status:event.target.value}:ss))
        setData(dataFilter)
        swal("Updated Successfully.", "", "success", {
          button: "OK",
        })
      }
    })
  };
  useEffect(() => {
    Fetch('aircraft/maintenance-listing/').then((d) => {
      if (d?.status) {
        setData(d.data)
      }
    })
  }, [])
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
                    <h2 style={{ margin: '0' }}>Maintenance</h2>
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
                    style={{ backgroundColor: '#E1D9FF', border: '#7070706B' }}
                  >
                    <TableRow>
                      <StyledTableCell>Comment</StyledTableCell>
                      <StyledTableCell>Aircraft Registration</StyledTableCell>
                      <StyledTableCell>Date</StyledTableCell>
                      <StyledTableCell>Instructor Name</StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.length ? data.map((row,index) => (
                      <StyledTableRow key={row.ac_defects_comments}>
                        <StyledTableCell component="th" scope="row">
                          {row.ac_defects_comments}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.aircraft_registration}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {moment(row.submitted_date).format('DD MMM yyyy')}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.instructor_name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.protein}
                          <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId={`demo-simple-select-label`+index}
                        id={`demo-simple-select`+index}
                        value={row.aircraft_status}
                        label="Status"
                        fullWidth
                        variant="outlined"
                        onChange={(e)=>handleChange(e,index)}
                      >
                        <MenuItem value={'escalated'}>Escalated</MenuItem>
                        <MenuItem value={'under_maintenance'}>Under Maintenance</MenuItem>
                        <MenuItem value={'approved'}>Approved</MenuItem>
                      </Select>
                    </FormControl>
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
    </AppLayout>
  )
}
export default Aircraft
