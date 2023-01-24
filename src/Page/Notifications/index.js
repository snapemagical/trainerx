import AppLayout from '../../layout/appLayout'
import { Container, Paper, Grid } from '@mui/material'
import {
  DeleteOutlined,
  NotificationsActiveOutlined,
  VisibilityOutlined,
} from '@mui/icons-material'
import Fetch from '../../common/fetch'
import { useEffect, useState } from 'react'
import { DeleteModel } from '../../common/model'
import { withContext } from '../../context/appContext'
function AllNotifications(props) {
  const {context} = props
  const [data, setData] = useState([])
  const [id, setID] = useState('')
  useEffect(() => {
    Fetch('notifications/all/').then(d => {
      if (d.status) {
        setData(d.data)
      }
    })
    Fetch('notifications/mark-all-as-read/',null,{method:'patch'}).then(d=>{
      if(d.status){
        context.notifyCountUpdate(0)
      }
    })
  }, [])
  const deleteNotify = (id) => {
    setID(id)
  }
  const deleteConfirm = () => {
    Fetch(`notifications/delete/${id}`, {}, { method: 'delete' }).then(d => {
      if (d.status) {
        let dataFilter = data.filter(s => s.id !== id)
        setData(dataFilter)
        setID('')
      }
    })
  }
  return (
    <AppLayout>
      <Container maxWidth="xl">
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
                  <h2 className='flex' style={{ margin: '0' }}>
                    <NotificationsActiveOutlined
                      style={{ fontSize: '26px', color: '#7564E7' }}
                    />{' '}
                    All Notifications
                  </h2>
                </div>
              </Grid>
            </Grid>
          </div>
        </Paper>
        <ul className='notify'>
          {
            data?.length ? data?.map((d, key) => {
              return <li key={key}>
                <div className='notify-list'>
                  <p>
                    {d?.subject}
                  </p>
                  <span>{d?.timesince}</span>
                </div>
                <div className='notify-action'>
                  {/* <VisibilityOutlined
                  style={{ fontSize: '22px', color: '#90A4AE' }}
                /> */}
                  <DeleteOutlined style={{ fontSize: '22px', color: '#f23939' }} onClick={() => deleteNotify(d.id)} />
                </div>
              </li>
            })
            :'No Notifications Found'
          }
        </ul>
      </Container>
      <DeleteModel show={id} handleClose={() => setID('')} handleConfirm={deleteConfirm} />
    </AppLayout>
  )
}
export default withContext(AllNotifications)
