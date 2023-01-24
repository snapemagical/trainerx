import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AccountCircle,
  NotificationsActive,
  Dashboard,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material'
import { Link, NavLink } from 'react-router-dom'
import { React, useState } from 'react'
import { SideBarMenu } from '../../dummyData/menu'
import { withContext } from '../../context/appContext'
function Sidebar({
  open,
  DrawerHeader,
  Drawer,
  handleDrawerClose,
  theme,
  context,
}) {
  const { role } = context
  const [openDrop, setOpen] = useState({});
  const handleClick = (i) => {
    setOpen({
      ...openDrop,
      [i]:!openDrop[i]
    });
  };
  return (
    <Drawer
      variant="permanent"
      className={`sidebar-drawer ${open?'openDrawer':''}`}
      open={open}
      style={{ backgroundColor: '#253f5d' }}
    >
      <DrawerHeader className='sidebar-drawer-header'>
        {/* <div
          className="logo_img"
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: '5px 0',
          }}
        >
          <img
            src="https://static.wixstatic.com/media/83d722_1cb1e3d49a5e4297b7b9a49593d1f5ad~mv2.jpg/v1/fill/w_162,h_80,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/MAV%20Logo_Black.jpg"
            width="150px"
          />
        </div> */}
        <IconButton onClick={handleDrawerClose} className='menuBtnClose'>
          {theme.direction === 'rtl' ? (
            <MenuIcon style={{ fontSize: '26px', color: '#ffff' }} />
          ) : (
            <MenuIcon style={{ fontSize: '26px', color: '#ffff' }} />
          )}
        </IconButton>
      </DrawerHeader>
      {/* <Divider /> */}
      {SideBarMenu?.filter(
        (d) => d?.role?.includes(+role) || d?.role === 'all',
      ).map((d, i) => (
        <List key={i + d.id}>
          {
            d?.children ?
              <>
                <NavLink to={d.url} style={{ textDecoration: 'none' }}>
                  <ListItem button onClick={()=>handleClick(i)} className='sidebar-menu'>
                    <ListItemIcon className="Dicon"><img src={require('../../Page/images/'+d.ico)} width='25px'/></ListItemIcon>
                    <ListItemText primary={d.name} />
                    {/* {openDrop[i] ? <ExpandLess /> : <ExpandMore />} */}
                  </ListItem>
                </NavLink>
                <Collapse in={true} timeout="auto" unmountOnExit className='sidebar-submenu'>
                  <List component="div" disablePadding>
                    {d?.children.map((child, key) => (
                      <MenuItem key={key} d={child} iconsmall={true}/>
                    ))}
                  </List>
                </Collapse>
              </>
              :
              <MenuItem key={i} d={d} />
          }

        </List>
      ))}
    </Drawer>
  )
}
const MenuItem = ({ d,iconsmall }) => {
  return <NavLink to={d.url} key={d.id} style={{ textDecoration: 'none' }}>
    <ListItem button  className='sidebar-menu'>
      <ListItemIcon className="Dicon"><img src={require('../../Page/images/'+d.ico)} width={iconsmall?'20px':'25px'}/></ListItemIcon>
      <ListItemText
        primary={d.name}
        style={{ color: '#ffff', marginLeft: '2px' }}
      />
    </ListItem>
  </NavLink>
}
export default Sidebar
