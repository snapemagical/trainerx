import { Box, CssBaseline } from '@mui/material'
import Header from '../component/header'
import Sidebar from '../component/sidebar'
import MuiAppBar from '@mui/material/AppBar'
import BottomNavigation from '@mui/material/BottomNavigation';
import { React, useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
// import { makeStyles } from '@material-ui/core/styles'
import MuiDrawer from '@mui/material/Drawer'
import { withContext } from '../context/appContext'
import Footer from '../component/footer'

const drawerWidth = 250

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))
const AppBarFooter = styled(BottomNavigation, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))
// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },

//   grow: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     display: 'none',
//     [theme.breakpoints.up('sm')]: {
//       display: 'block',
//     },
//   },

//   inputRoot: {
//     color: 'inherit',
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
//   sectionDesktop: {
//     display: 'none',
//     [theme.breakpoints.up('md')]: {
//       display: 'flex',
//     },
//   },
//   sectionMobile: {
//     display: 'flex',
//     [theme.breakpoints.up('md')]: {
//       display: 'none',
//     },
//   },
// }))
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})
function AppLayout({ children, context }) {
  // const classes = useStyles()
  const theme = useTheme()

  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  useEffect(() => {
    if (context.sideBarOpen) {
      setOpen(context.sideBarOpen)
    }
  }, [context.sideBarOpen])
  const handleDrawerOpen = () => {
    setOpen(true)
    context.handleSideBarOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
    context.handleSideBarOpen(false)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header
        open={open}
        anchorEl={anchorEl}
        handleDrawerOpen={handleDrawerOpen}
        handleClose={handleClose}
        AppBar={AppBar}
        context={context}
        handleMenu={handleMenu}
      />
      <Sidebar
        DrawerHeader={DrawerHeader}
        open={open}
        context={context}
        theme={theme}
        handleDrawerClose={handleDrawerClose}
        Drawer={Drawer}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10 }} className={`mh-100 ${open ? 'sideDrawerClose' : 'sideDrawerOpen'}`}>
        {children}
      </Box>
      <Footer
        open={open}
        AppBar={AppBarFooter}
      />
    </Box>
  )
}
export default withContext(AppLayout)
