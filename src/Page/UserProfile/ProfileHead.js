import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import {
  NavLink,
} from 'react-router-dom'
import { withContext } from '../../context/appContext'
import { ProfileMenu } from '../../dummyData/menu'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

function ProfileHead({context }) {
  const {role} = context
  const classes = useStyles()
  const [progress, setProgress] = useState(0)
  const [menu,setMenu] = useState([])
  useEffect(()=>{
    if(role === 2){
      setMenu(ProfileMenu?.filter(d=> role === 2 && d?.id !== 6))
    }else{
      setMenu(ProfileMenu)
    }
  },[role])
  return (
    // <Router>
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          backgroundColor: '#fff',
          color: '#3D4A68',
        }}
      >
        <Toolbar className="listTab">
          <Grid className="tab-col" container spacing={4} justify="start">
            {menu?.map((d, i) => (
              <Grid item style={{ alignSelf: 'center' }} key={d.id + i}>
                <NavLink
                  to={`/user-profile${d.url}`}
                  exact
                  style={{ textDecoration: 'none' }}
                >
                  <ListItem button key={d.name}>
                    <ListItemText
                      primary={d.name}
                      style={{
                        color: '#3D4A68',
                        fontSize: '20px',
                        marginLeft: '6px',
                      }}
                    />
                  </ListItem>
                </NavLink>
              </Grid>
            ))}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default withContext(ProfileHead)
