import { Toolbar, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { Settings, AccountCircle, NotificationsNone, Help } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { withContext } from '../../context/appContext';
import { useHistory } from 'react-router-dom';
import logo from '../../Page/images/trainerX_logo_Blue.png'
import setting from "../../Page/images/settings.png";
import helpDesk from "../../Page/images/help-desk.png";
import notification from "../../Page/images/notification.png";
function Header({
  handleDrawerOpen,
  open,
  handleClose,
  handleMenu,
  anchorEl,
  AppBar,
  context,
}) {
  const history = useHistory()
  const { role, notificationsCount, userProfile } = context
  const disabled = role > 2
  return (
    <AppBar
      className={`${open ? 'mainHeaderOpen' : 'mainHeader'}`}
      position="fixed"
      open={open}
      style={{
        backgroundColor: '#FFFFFF',
        color: 'black',
        paddingBottom: '11px',
        paddingTop: '13px',
      }}
    >
      <Toolbar className="betweenheaderCol">
        <IconButton
          color="inherit"
          className={`btnSidebar ${open ? 'd-none' : ''}`}
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          style={{
            fontSize: '23px',
            color: '#444758',
            fontWeight: 'bold',
            display:'flex',
            paddingLeft: '65px',
          }}
        >
          <img src={logo} height='45px'/>
          {/* TRAINING MANAGEMENT SYSTEM */}
        </Typography>
        <div className="rightCols">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => history.push('/notifications')}
            color="inherit"
            className='position-relative'
          >
            {/* <img src={notification}/> */}
            <NotificationsNone />
            {
              notificationsCount ?
                <div className='notify-count'>{notificationsCount}</div>
                :
                null
            }
          </IconButton>
          {disabled ? null : <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => history.push('/user-profile')}
            color="inherit"
          >
            {
              userProfile?.profile?.profile_image ?
                <img src={userProfile?.profile?.profile_image} className='profile-img'/>
                :
                <AccountCircle />
            }
          </IconButton>}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => history.push('/ticket-raising')}
            color="inherit"
          >
            {/* <Help /> */}
            <img src={helpDesk}/>
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <img src={setting}/>
          </IconButton>
          {/* <span>Ryan Jason</span> */}
        </div>
        <Menu
          className="dropdown_menu_ui"
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {/* <MenuItem onClick={handleClose}>Help</MenuItem> */}
          {/* <MenuItem>
          <Link
            to={`${match.path}/passwordchange`}
            style={{ textDecoration: 'none', color: '#3D4A68' }}
          >
            <span onClick={handleClose}>Change Password</span>
          </Link>
        </MenuItem> */}
          <MenuItem className='setting-menu'>
            <button onClick={() => { history.push('/change-password'); }} style={{ textDecoration: 'none', color: '#3D4A68', backgroundColor: 'transparent', border: '0px' }}>
              <span>Change Password</span>
            </button>
          </MenuItem>
          <MenuItem className='setting-menu'>
            <button onClick={()=>{localStorage.clear();context.logOut()}}style={{ textDecoration: 'none', color: '#3D4A68', backgroundColor: 'transparent', border: '0px' }}>
              <span >Logout</span>
            </button>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
export default Header