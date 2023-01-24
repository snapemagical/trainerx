import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {AppBar,Button} from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import LoadingBar from 'react-top-loading-bar'
import Grid from '@material-ui/core/Grid'
import Container from '@mui/material/Container'
import './Headerbar.css'
import { NavLink } from 'react-router-dom'
import { withContext } from '../../../context/appContext'

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

function ButtonAppBar({ context }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const classes = useStyles()
  const [progress, setProgress] = useState(0)
  const { isLogin } = context
 
  return (
    <div>
      <LoadingBar
        color="#f11946"
        timeout={10000}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className={classes.root}>
        <AppBar
          position="static"
          style={{
            backgroundColor: 'transparent',
            color: 'black',
            boxShadow: 'none',
          }}
        >
          <Toolbar>
            <Container>
              <Grid
                className="navUi"
                container
                spacing={4}
                style={{ justifyContent: 'center', padding: '0 30px' }}
              >
                <Grid
                  item
                  style={{ alignSelf: 'center', justifyContent: 'right' }}
                >
                  <NavLink
                    className="activem home-active"
                    to={`/`}
                    style={{ textDecoration: 'none' }}
                  >
                    <ListItem button key={'home'} className="Buttons">
                      <ListItemText primary={'Home'} className="Hometext" />
                    </ListItem>
                  </NavLink>
                </Grid>

                <Grid item style={{ alignSelf: 'center' }}>
                  <NavLink
                    className="activem "
                    to={`/about`}
                    style={{ textDecoration: 'none' }}
                  >
                    <ListItem button key={'About'} className="Buttons">
                      <ListItemText primary={'About'} className="Hometext" />
                    </ListItem>
                  </NavLink>
                </Grid>
                <Grid item style={{ alignSelf: 'center' }}>
                  <NavLink
                    className="activem"
                    to={`/services`}
                    style={{ textDecoration: 'none' }}
                  >
                    <ListItem button key={'services'} className="Buttons">
                      <ListItemText primary={'Services'} className="Hometext" />
                    </ListItem>
                  </NavLink>
                </Grid>
                <Grid item style={{ alignSelf: 'center' }}>
                  <NavLink
                    className="activem"
                    to={`/products`}
                    style={{ textDecoration: 'none' }}
                  >
                    <ListItem button key={'products'} className="Buttons">
                      <ListItemText primary={'Products'} className="Hometext" />
                    </ListItem>
                  </NavLink>
                </Grid>
                <Grid item style={{ alignSelf: 'center' }}>
                  <NavLink
                    className="activem"
                    to={`/careers`}
                    style={{ textDecoration: 'none' }}
                  >
                    <ListItem button key={'careers'} className="Buttons">
                      <ListItemText primary={'Careers'} className="Hometext" />
                    </ListItem>
                  </NavLink>
                </Grid>
                <Grid item style={{ alignSelf: 'contact' }}>
                  <NavLink
                    className="activem"
                    to={`/contact`}
                    style={{ textDecoration: 'none' }}
                  >
                    <ListItem button key={'contact'} className="Buttons">
                      <ListItemText primary={'Contact'} className="Hometext" />
                    </ListItem>
                  </NavLink>
                </Grid>
                <Grid item style={{ alignSelf: 'center' }}>
                 <div>
                    {isLogin ? (
                      <NavLink to="/dashboard" style={{ textDecoration: 'none' }}>
                        <Button
                          className="custom-btn outline Learnmore"
                          variant="outlined"
                          style={{ fontWeight: 'bold', fontSize: '15px' }}
                        >
                          Go To Dashboard
                        </Button>
                      </NavLink>
                    ) : (
                      <NavLink to="/login" style={{ textDecoration: 'none' }}>
                        <Button
                          className="custom-btn outline Learnmore"
                          variant="outlined"
                          style={{ fontWeight: 'bold', fontSize: '15px' }}
                        >
                          Login
                        </Button>
                      </NavLink>
                    )}
                  </div>
                </Grid>
              </Grid>
            </Container>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
export default withContext(ButtonAppBar)
